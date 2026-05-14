import { useEffect, useState } from "react";
import { Howl, Howler } from 'howler';
import s from "./AudioControler.module.scss";
import { useAudioStore } from "../../store/store";

const AudioControler = () => {

    const { trackList, currentPlaying, setCurrentPlaying, playingNow, setPlayingNow } = useAudioStore();

    const [isPaused, setIsPaused] = useState(false);

    const togglePlayPause = () => {
        if (!currentPlaying) return;
        if (isPaused) {
            currentPlaying.audio.play();
        } else {
            currentPlaying.audio.pause();
        }
        setIsPaused(!isPaused);
    }

    const nextTrack = () => {
        if (!currentPlaying) return;

        const artistTracks = trackList[currentPlaying.artist];
        if (!artistTracks || artistTracks.length === 0) return;
        const currentIndex = artistTracks.findIndex(track => track.title === currentPlaying.title);
        const nextIndex = (currentIndex + 1) % artistTracks.length;
        setPlayingNow(artistTracks[nextIndex]);
    }

    const previousTrack = () => {
        if (!currentPlaying) return;
        const artistTracks = trackList[currentPlaying.artist];
        if (!artistTracks || artistTracks.length === 0) return;
        const currentIndex = artistTracks.findIndex(track => track.title === currentPlaying.title);
        const previousIndex = (currentIndex - 1 + artistTracks.length) % artistTracks.length;
        setPlayingNow(artistTracks[previousIndex]);
    }

    useEffect(() => {
        if (!playingNow) return;

        if (currentPlaying && currentPlaying.audio) {
            currentPlaying.audio.stop();
        }
        setCurrentPlaying(playingNow);
        setPlayingNow(null);
    }, [playingNow, setPlayingNow]);

    useEffect(() => {
        if (currentPlaying && currentPlaying.audio) {
            let artistName = currentPlaying.artist;
            console.log("Playing:", currentPlaying.title);
            setIsPaused(false);
            currentPlaying.audio.play();

            // Event lorsque la musique se termine
            const handleEnd = () => {
                console.log("Track ended:", currentPlaying.title);
                const artistTracks = trackList[currentPlaying.artist];
                if (!artistTracks || artistTracks.length === 0) return;
                const currentIndex = artistTracks.findIndex(track => track.title === currentPlaying.title);
                if (currentIndex === artistTracks.length - 1) {
                    console.log("End of artist tracks for:", artistName);
                    setCurrentPlaying(null);
                } else {
                    nextTrack();

                }
            };

            currentPlaying.audio.on('end', handleEnd);

            // Nettoyer l'event listener
            return () => {
                currentPlaying.audio.off('end', handleEnd);
            };
        }
    }, [currentPlaying]); // Cette dépendance est correcte

    return currentPlaying && (
        <div className={s.AudioControler}>
            <button onClick={previousTrack}>Previous</button>
            <div className={s.AudioControler__info}>
                <img src={currentPlaying.cover} alt={`${currentPlaying.artist} cover`} className={s.AudioControler__cover} />
                <p className={s.AudioControler__title}>{currentPlaying.title}</p>
                <p className={s.AudioControler__artist}>{currentPlaying.artist}</p>
            </div>
            <button onClick={togglePlayPause}>
                {isPaused ? 'Play' : 'Pause'}
            </button>
            <button onClick={nextTrack}>Next</button>
            <button onClick={() => {
                if (currentPlaying && currentPlaying.audio) {
                    currentPlaying.audio.stop();
                }
                setCurrentPlaying(null);
            }}>Stop</button>
        </div>
    );
};

export default AudioControler;