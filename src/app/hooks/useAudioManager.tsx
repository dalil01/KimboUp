"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Files } from "@/app/vars/Files";

const AudioManagerContext = createContext<undefined | {
	playSoundEffect: () => void,
	musicEnabled: boolean,
	toggleMusicEnabled: Function,
	soundEffectsEnabled: boolean,
	toggleSoundEffectEnabled: Function
	autoEnableAudio: Function
}>(undefined);

const MUSIC_ENABLE_LOCAL_STORAGE_KEY = "musicEnable";
const SOUND_EFFECTS_ENABLE_LOCAL_STORAGE_KEY = "soundEffectsEnable";

export const AudioManagerProvider = ({ children }: any) => {

	const lastAudioPlayed = useRef(new Date().getTime());
	const [bgAudio, setBgAudio] = useState<HTMLAudioElement>();

	const [musicEnabled, setMusicEnabled] = useState(false);
	const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(false);

	const controlMusic = (enable: boolean = true) => {
		let audio = bgAudio as any;
		if (!bgAudio) {
			audio = new Audio(Files.AUDIOS.BACKGROUND);
			setBgAudio(audio);
		}

		if (enable) {
			audio.play();
			audio.loop = true;
		} else {
			audio.pause();
		}

		if (localStorage.getItem(MUSIC_ENABLE_LOCAL_STORAGE_KEY)) {
			localStorage.setItem(MUSIC_ENABLE_LOCAL_STORAGE_KEY, String(enable));
		}
	}


	const toggleMusicEnabled = () => {
		const me = !musicEnabled;
		setMusicEnabled(me);
		controlMusic(me);
	};

	const playSoundEffect = () => {
		if (!soundEffectsEnabled) {
			return;
		}

		playAudio(Files.AUDIOS.HOVER_BUTTON, true);
	}

	const toggleSoundEffectEnabled = () => {
		const se = !soundEffectsEnabled;
		setSoundEffectsEnabled(se);
		if (localStorage.getItem(SOUND_EFFECTS_ENABLE_LOCAL_STORAGE_KEY)) {
			localStorage.setItem(SOUND_EFFECTS_ENABLE_LOCAL_STORAGE_KEY, String(se));
		}
	}

	const autoEnableAudio = () => {
		autoEnableMusic();
		autoEnableSoundEffects();
	}

	function playAudio(file: string, force = false) {
		if (!musicEnabled && !soundEffectsEnabled) {
			return;
		}

		if (!force && new Date().getTime() - lastAudioPlayed.current < 100) {
			return;
		}

		lastAudioPlayed.current = new Date().getTime();

		const audio = new Audio(file);
		audio.play();
	}

	function autoEnableMusic() {
		if ((localStorage.getItem(MUSIC_ENABLE_LOCAL_STORAGE_KEY) || '')?.length === 0) {
			localStorage.setItem(MUSIC_ENABLE_LOCAL_STORAGE_KEY, "true");
			setMusicEnabled(true);
			controlMusic();
			return;
		}

		if (localStorage.getItem(MUSIC_ENABLE_LOCAL_STORAGE_KEY) === "false") {
			controlMusic(false);
			return;
		}

		setMusicEnabled(true);
		controlMusic(true);
	}

	function autoEnableSoundEffects() {
		if ((localStorage.getItem(SOUND_EFFECTS_ENABLE_LOCAL_STORAGE_KEY) || '')?.length === 0) {
			localStorage.setItem(SOUND_EFFECTS_ENABLE_LOCAL_STORAGE_KEY, "true");
			setSoundEffectsEnabled(true);
			return;
		}

		if (localStorage.getItem(SOUND_EFFECTS_ENABLE_LOCAL_STORAGE_KEY) === "false") {
			return;
		}

		setSoundEffectsEnabled(true);
	}

	return (
		<AudioManagerContext.Provider
			value={
				{
					playSoundEffect,
					musicEnabled, toggleMusicEnabled,
					soundEffectsEnabled, toggleSoundEffectEnabled,
					autoEnableAudio
				}
			}
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

