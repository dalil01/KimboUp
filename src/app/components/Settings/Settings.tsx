"use client";

import styles from "./Settings.module.css";

import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Link from "next/link";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { Routes } from "@/app/vars/Routes";

export default function Settings() {

	const { audioEnabled, setAudioEnabled , playClickAudio } = useAudioManager();

	return (
		<div className={ styles.container }>
			<div className={ styles.content }>
				<button
					className={ styles.item }
					onClick={ () => {
						setAudioEnabled(!audioEnabled);
					} }
					onMouseEnter={ playClickAudio }
				>
					<Icon name={ audioEnabled ? Icons.IconVolumeUp : Icons.IconVolumeOff } />
					<span>AUDIO</span>
				</button>
				<Link className={ styles.item } href={ Routes.HOW_TO_PLAY } onMouseEnter={ playClickAudio }>
					<Icon name={ Icons.IconInfo } />
					<span>HOW TO PLAY</span>
				</Link>
				<Link className={ styles.item } href={ Routes.CREDITS } onMouseEnter={ playClickAudio }>
					<Icon name={ Icons.IconMedia } />
					<span>CREDITS</span>
				</Link>
			</div>
		</div>
	);
}