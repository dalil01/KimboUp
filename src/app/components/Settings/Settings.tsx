"use client";

import styles from "./Settings.module.css";

import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Link from "next/link";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { Routes } from "@/app/vars/Routes";

export default function Settings() {

	const {
		musicEnabled, toggleMusicEnabled ,
		soundEffectsEnabled, toggleSoundEffectEnabled ,
		playSoundEffect
	} = useAudioManager();

	return (
		<div className={ styles.container }>
			<div className={ styles.content }>
				<button
					className={ styles.item }
					onClick={ () => {
						toggleMusicEnabled();
					} }
					onMouseEnter={ playSoundEffect }
				>
					<Icon name={ musicEnabled ? Icons.IconVolumeUp : Icons.IconVolumeOff } />
					<span>MUSIC</span>
				</button>
				<button
					className={ styles.item }
					onClick={ () => {
						toggleSoundEffectEnabled();
					} }
					onMouseEnter={ playSoundEffect }
				>
					<Icon name={ soundEffectsEnabled ? Icons.IconVolumeUp : Icons.IconVolumeOff } />
					<span>SOUND EFFECTS</span>
				</button>
				<Link className={ styles.item } href={ Routes.HOW_TO_PLAY + window.location.hash } onMouseEnter={ playSoundEffect }>
					<Icon name={ Icons.IconInfo } />
					<span>HOW TO PLAY</span>
				</Link>
				<Link className={ styles.item } href={ Routes.CREDITS + window.location.hash } onMouseEnter={ playSoundEffect }>
					<Icon name={ Icons.IconMedia } />
					<span>CREDITS</span>
				</Link>
			</div>
		</div>
	);
}