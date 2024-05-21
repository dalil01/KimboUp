import styles from "./OnlyDesktop.module.css";
import { ReactSVG } from "react-svg";
import { GameStore } from "@/app/stores/GameStore";
import { useEffect, useRef } from "react";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import Copyright from "@/app/components/Copyright/Copyright";

export function OnlyDesktop() {

	const lobby = GameStore((state: any) => state.lobby);

	const textRef = useRef<any>();

	const { autoEnableAudio } = useAudioManager();

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (textRef) {
				textRef.current.style.opacity = 1;
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
				src={ "/svg/logo-max.svg" }
			/>

			<p ref={ textRef } className={ styles.text }>$KIMBO UP IS CURRENTLY ONLY AVAILABLE ON DESKTOP&nbsp;!</p>

			<Copyright />
		</div>
	)
}