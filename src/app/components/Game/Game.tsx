import styles from "./Game.module.css";

import { Canvas } from "@react-three/fiber";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import React, { Suspense } from "react";
import Loading from "@/app/components/Loading/Loading";
import { Preload } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import SettingsButton from "@/app/components/SettingsButton/SettingsButton";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Logo from "@/app/components/Logo/Logo";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import Timer from "@/app/components/Timer/Timer";
import EndGameModal from "@/app/components/EndGameModal/EndGameModal";
import { CharacterFactory } from "@/app/components/characters/CharacterFactory";
import { MapFactory } from "@/app/components/maps/MapFactory";

export default function Game() {

	const { currentConfig, state, lobby, restart } = GameStore((state: GameStoreState) => ({
		currentConfig: state.currentConfig,
		state: state.state,
		lobby: state.lobby,
		restart: state.restart
	}));

	const { playHoverButtonAudio } = useAudioManager();

	return (
		<div className={ styles.container }>
			<Logo />

			{ state === GameState.ENDED
				?
				<EndGameModal />
				:
				<Timer />
			}

			<SettingsButton
				right={ "10rem" }
			/>

			<button className={ styles.restartButton }
					onClick={ () => {
						restart();
					} }
					onMouseEnter={ playHoverButtonAudio }
			>
				<Icon name={ Icons.IconRestart }/>
			</button>

			<button className={ styles.closeButton }
					onClick={ () => {
						restart();
						lobby();
					} }
					onMouseEnter={ playHoverButtonAudio }
			>
				<Icon name={ Icons.IconClose } />
			</button>

			<Canvas
				color="transparent"
				shadows
				onPointerDown={ (e: any) => {
					if (state !== GameState.ENDED) {
						e.target.requestPointerLock();
					}
				} }
			>
				<Suspense fallback={ <Loading/> }>
					<Preload all/>

					<Physics debug={ false }>
						{ CharacterFactory.create(currentConfig.character.main.name, currentConfig.character.main.props) }
						{ MapFactory.create(currentConfig.map.name, currentConfig.map.props) }
					</Physics>

					{/* <Stats /> */}
					{/* <Perf /> */}
				</Suspense>
			</Canvas>
		</div>
	);

}