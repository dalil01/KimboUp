import styles from "./Timer.module.css";
import { useEffect, useRef } from "react";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import { addEffect } from "@react-three/fiber";
import { UTime } from "@/app/utils/UTime";

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

			const formattedTime = UTime.format(elapsedTime);

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