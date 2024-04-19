import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import GameStore, { GameState, GameStoreState } from "@/app/stores/GameStore";
import { saveToKimbonet } from "@/app/actions/saveToKimbonet";

export default function Interface() {


	const timeElementRef = useRef<any>();

	const gameState = GameStore((state: any) => state.state);

	const ready = GameStore((state: any) => state.ready);
	const restart = GameStore((state: any) => state.restart);

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

			const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

			if (timeElementRef.current) {
				timeElementRef.current.textContent = formattedTime;
			}
		});

		return () => {
			unsubscribeEffect();
		}
	}, []);

	const handleSaveToKimbonet = () => {
		saveToKimbonet().then(() => {

		});
	}

	return (
		<div className={ `interface " + ${ gameState === GameState.LOBBY ? "interface-dark" : '' }` }>
			<div className="interface-header">
				<h1 className="logo">$KimboUp</h1>
				{/*
				<button className="audio"
						onClick={ () => setAudioEnabled(!audioEnabled) }>{ audioEnabled ? "Mute" : "Son" }</button>
				*/}
			</div>

			{ (gameState !== GameState.LOBBY && gameState !== GameState.ENDED) &&
                <div className="time-container">
                    <p className="time" ref={ timeElementRef }>0.00</p>
                </div>
			}

			{ gameState === GameState.LOBBY &&
                <div className="center-container" onClick={ ready }>
                    <button className="start-btn">Start</button>
                </div>
			}

			{ gameState === GameState.ENDED &&
                <div className="restart-container">
					{ timeElementRef.current && <p className="time-restart">Time: { timeElementRef.current.textContent }</p> }
                    <button className="save-kimbonet" onClick={ handleSaveToKimbonet }>Save to Kimbonet</button>
                    <button className="restart" onClick={ restart }>RESTART</button>
                </div>
			}
		</div>
	)
}