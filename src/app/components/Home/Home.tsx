import styles from "./Home.module.css";
import { ReactSVG } from "react-svg";
import { GameStore } from "@/app/stores/GameStore";
import { useEffect, useRef } from "react";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { Files } from "@/app/vars/Files";

export function Home() {

	const lobby = GameStore((state: any) => state.lobby);

	const toLobbyBtnRef = useRef<any>();

	const { autoEnableAudio } = useAudioManager();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (toLobbyBtnRef) {
				toLobbyBtnRef.current.style.opacity = 1;
			}
		}, 600);

		return () => {
			clearTimeout(timeout);
		}
	}, []);

	return (
		<div className={ styles.container }>
			<ReactSVG
				className={ styles.logo }
				src={ Files.SVGS.LOGO_MAX }
			/>

			<button ref={ toLobbyBtnRef } className={ styles.toLobbyButton } onClick={ () => {
				autoEnableAudio();
				lobby();
			} }>Let's go!</button>

			<p className={ styles.copy }>$KimboUp&nbsp;&copy;&nbsp;2024</p>
		</div>
	)
}