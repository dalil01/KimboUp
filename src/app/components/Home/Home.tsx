import styles from "./Home.module.css";
import { ReactSVG } from "react-svg";
import { GameStore } from "@/app/stores/GameStore";
import { useEffect, useRef } from "react";

export function Home() {

	const lobby = GameStore((state: any) => state.lobby);

	const toLobbyBtnRef = useRef<any>();

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
				src={ "/svg/logo.svg" }
			/>

			<button ref={ toLobbyBtnRef } className={ styles.toLobbyButton } onClick={ () => {
				lobby();
			} }>Let's go!</button>

			<p className={ styles.copy }>$KimboUp&nbsp;&copy;&nbsp;2024</p>
		</div>
	)
}