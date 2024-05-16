import styles from "./Timer.module.css";
import { useEffect, useRef } from "react";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import { addEffect } from "@react-three/fiber";

export default function Timer() {

	const timeElementRef = useRef<any>();

	useEffect(() => {
		const unsubscribeEffect = addEffect(() => {
			const gameStoreState: any = GameStore.getState();

			let elapsedTime = 0;


			if (gameStoreState.state === GameState.STARTED) {
				elapsedTime = Date.now() - gameStoreState.startTime;
			} else if (gameStoreState.state == GameState.ENDED) {
				elapsedTime = gameStoreState.endTime - gameStoreState.startTime;
			}

			elapsedTime /= 1000;

			const minutes = Math.floor(elapsedTime / 60);
			const seconds = Math.floor(elapsedTime % 60);

			const formattedTime = `${ minutes.toString().padStart(2, '0') }:${ seconds.toString().padStart(2, '0') }`;

			if (timeElementRef.current) {
				timeElementRef.current.textContent = formattedTime;
			}
		});

		return () => {
			unsubscribeEffect();
		}
	}, []);

	return (
		<div className={ styles.container }>
			<p className={ styles.time } ref={ timeElementRef }>0.00</p>
		</div>
	);

}