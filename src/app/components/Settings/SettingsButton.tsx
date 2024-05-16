import styles from "./Settings.module.css";

import { Routes } from "@/app/vars/Routes";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Link from "next/link";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { MouseEventHandler } from "react";

type SettingsButtonProps = {
	right?: string;
}

export default function SettingsButton(props: SettingsButtonProps) {

	const {
		right = "2.1rem",
	} = props;

	const { playClickAudio } = useAudioManager();

	return (
		<Link
			className={ styles.settingsButton }
			style={ { right } }
			href={ Routes.SETTINGS }
			onMouseEnter={ playClickAudio }
		>
			<Icon name={ Icons.IconSettings } />
		</Link>
	);
}