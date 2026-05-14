import fetchJsonp from "fetch-jsonp";
import s from "./Artist.module.scss";
import { useEffect, useState } from "react";
import { Howl, Howler } from 'howler';
import { useAudioStore } from "../../store/store";

const Artist = ({ data }) => {

    const limitTracklist = 3;
    const [artistTracklist, setArtistTracklist] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);

    const trackList = useAudioStore((state) => state.trackList);
    const updateTrackListForArtist = useAudioStore((state) => state.updateTrackListForArtist);
    const setPlayingNow = useAudioStore((state) => state.setPlayingNow);
    const currentPlaying = useAudioStore((state) => state.currentPlaying);

    const fetchDataArtistTracklist = async () => {

        const cleanUrl = artistInfo.tracklist.replace('?limit=50', '');

        let response = await fetchJsonp(`${cleanUrl}?limit=${limitTracklist}&output=jsonp`, {
            mode: 'no-cors',
        })

        if (response.ok) {
            let dataFetch = await response.json();
            const tracklist = dataFetch.data.map((track) => ({
                title: track.title,
                preview: track.preview,
                artist: data.name,
                audio: new Howl({
                    src: [track.preview],
                    html5: true,
                }),
                cover: track.album.cover_medium,
            }));
            setArtistTracklist(true);
            updateTrackListForArtist(data.name, tracklist);
        } else {
            console.error('Error:', response.error);
        }

    };

    const fetchDataArtists = async () => {

        let response = await fetchJsonp(`https://api.deezer.com/search/artist?q=${data.name}&output=jsonp`, {
            mode: 'no-cors',
        })

        if (response.ok) {
            let dataFetch = await response.json();
            setArtistInfo(dataFetch.data[0]);
        } else {
            console.error('Error:', response.error);
        }

    };

    useEffect(() => {
        if (artistInfo) {
            fetchDataArtistTracklist();
        }
    }, [artistInfo]);

    useEffect(() => {
        if (artistTracklist && trackList[data.name] && trackList[data.name].length > 0) {
            // Play the first track by default
            setPlayingNow(trackList[data.name][0]);
        }
    }, [artistTracklist]);

    const handleClick = () => {
        if (trackList[data.name] && trackList[data.name].length > 0) {
            setPlayingNow(trackList[data.name][0]);
        } else if (trackList[data.name] && trackList[data.name].length === 0) {
            fetchDataArtists();
        }
    };

    return (
        <div className={s.Artist} onClick={handleClick}>
            {(currentPlaying && currentPlaying.artist === data.name) &&
                <div
                    className={s.Artist__playingIndicator}
                    style={{ backgroundImage: `url(${currentPlaying.cover})` }}
                >
                    <span className="sr-only">Now Playing</span>
                </div>
            }
            <p className={`${s.Artist__name} ${currentPlaying && currentPlaying.artist === data.name ? s.current : ''}`}>
                {data.name}
            </p>
        </div>
    );
};

export default Artist;