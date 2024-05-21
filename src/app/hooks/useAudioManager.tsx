"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Files } from "@/app/vars/Files";

const AudioManagerContext = createContext<undefined | {
	playAudio: (file: string, force: boolean) => void,
	playHoverButtonAudio: () => void,
	audioEnabled: boolean,
	setAudioEnabled: Function
	autoEnableAudio: Function
}>(undefined);

const AUDIO_LOCAL_STORAGE_KEY = "audio";
const AUDIO_ENABLE_LOCAL_STORAGE_KEY = "audioEnable";

export const AudioManagerProvider = ({ children }: any) => {

	const lastAudioPlayed = useRef(new Date().getTime());
	const [bgAudio, setBgAudio] = useState<HTMLAudioElement>();

	const [audioEnabled, setAudioEnabled] = useState(false);

	useEffect(() => {
		let audio = bgAudio as any;
		if (!bgAudio) {
			audio = new Audio(Files.AUDIOS.BACKGROUND);
			setBgAudio(audio);
			return;
		}

		if (audioEnabled) {
			audio.play();
			audio.loop = true;
		} else {
			audio.pause();
		}

		if (localStorage.getItem(AUDIO_LOCAL_STORAGE_KEY)) {
			localStorage.setItem(AUDIO_ENABLE_LOCAL_STORAGE_KEY, String(audioEnabled));
		}
	}, [audioEnabled]);

	const playAudio = (file: string, force = false) => {
		if (!audioEnabled) {
			return;
		}

		if (!force && new Date().getTime() - lastAudioPlayed.current < 100) {
			return;
		}

		lastAudioPlayed.current = new Date().getTime();

		const audio = new Audio(file);
		audio.play();
	};

	const playHoverButtonAudio = () => {
		playAudio(Files.AUDIOS.HOVER_BUTTON, true);
	}

	const autoEnableAudio = () => {
		if (!localStorage.getItem(AUDIO_LOCAL_STORAGE_KEY)) {
			localStorage.setItem(AUDIO_LOCAL_STORAGE_KEY, "true");
			setAudioEnabled(true);
			return;
		}

		if (localStorage.getItem(AUDIO_ENABLE_LOCAL_STORAGE_KEY) === "false") {
			return;
		}

		setAudioEnabled(true);
	}

	return (
		<AudioManagerContext.Provider
			value={ { playAudio, playHoverButtonAudio, audioEnabled, setAudioEnabled, autoEnableAudio } }
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

