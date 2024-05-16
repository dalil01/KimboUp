"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioManagerContext = createContext<undefined | {
	playAudio: (file: string, force: boolean) => void,
	playClickAudio: () => void,
	audioEnabled: boolean,
	setAudioEnabled: Function
	autoEnableAudio: Function
}>(undefined);

const AUDIO_ENABLE_LOCAL_STORAGE_KEY = "audioEnable";

export const AudioManagerProvider = ({ children }: any) => {

	const lastAudioPlayed = useRef(new Date().getTime());
	const [bgAudio, setBgAudio] = useState<HTMLAudioElement>();

	const [audioEnabled, setAudioEnabled] = useState((localStorage.getItem(AUDIO_ENABLE_LOCAL_STORAGE_KEY) !== "false"));

	useEffect(() => {
		let audio = bgAudio as any;
		if (!bgAudio) {
			audio = new Audio("/audios/background.mp3");
			setBgAudio(audio);
		}

		if (audioEnabled) {
			audio.play();
			audio.loop = true;
			localStorage.setItem(AUDIO_ENABLE_LOCAL_STORAGE_KEY, String(true));
		} else {
			audio.pause();
			localStorage.setItem(AUDIO_ENABLE_LOCAL_STORAGE_KEY, String(false));
		}
	}, [audioEnabled]);

	const playAudio = (file: any, force = false) => {
		if (!audioEnabled) {
			return;
		}

		if (!force && new Date().getTime() - lastAudioPlayed.current < 100) {
			return;
		}

		lastAudioPlayed.current = new Date().getTime();

		const audio = new Audio(`/audios/${ file }.mp3`);
		audio.play();
	};

	const playClickAudio = () => {
		playAudio("click", true);
	}

	const autoEnableAudio = () => {
		if (localStorage.getItem(AUDIO_ENABLE_LOCAL_STORAGE_KEY) === "false") {
			return;
		}

		setAudioEnabled(true);
	}

	return (
		<AudioManagerContext.Provider
			value={ { playAudio, playClickAudio, audioEnabled, setAudioEnabled, autoEnableAudio } }
		>
			{ children }
		</AudioManagerContext.Provider>
	);
}

export const useAudioManager = () => {
	const audioManager = useContext(AudioManagerContext);
	if (!audioManager) {
		throw new Error(
			"useAudioManager must be used within a AudioManagerProvider"
		);
	}

	return audioManager;
};

