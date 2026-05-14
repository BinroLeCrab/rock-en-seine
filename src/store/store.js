import { create } from "zustand";

export const useAudioStore = create((set) => ({
	trackList: {},
	setTrackList: (programmation) =>
		set((state) => {
			const newTrackList = {};
			programmation.forEach((day) => {
				day.artists.forEach((artist) => {
					newTrackList[artist.name] = [];
				});
			});
			return { trackList: newTrackList };
		}),

	updateTrackListForArtist: (artist, tracks) =>
		set((state) => {
			const newTrackList = { ...state.trackList, [artist]: tracks };
			return { trackList: newTrackList };
		}),

    currentPlaying: null,
    setCurrentPlaying: (track) =>
        set((state) => ({ currentPlaying: track })),
}));
