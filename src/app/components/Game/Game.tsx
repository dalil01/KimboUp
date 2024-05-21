import styles from "./Game.module.css";

import { Canvas } from "@react-three/fiber";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import React, { Suspense } from "react";
import Loading from "@/app/components/Loading/Loading";
import { Preload } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import CarCity from "@/app/components/CarCity/CarCity";
import Character from "@/app/components/Character/Character";
import SettingsButton from "@/app/components/Settings/SettingsButton";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Logo from "@/app/components/Logo/Logo";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import Timer from "@/app/components/Timer/Timer";
import EndGameModal from "@/app/components/EndGameModal/EndGameModal";
import { Bloom, EffectComposer, HueSaturation, SMAA, TiltShift2 } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";

export default function Game() {

	const state = GameStore((state: GameStoreState) => state.state);
	const lobby = GameStore((state: GameStoreState) => state.lobby);
	const restartGame = GameStore((state: GameStoreState) => state.restart);

	const { playClickAudio } = useAudioManager();

	/*
	style={
				 {
					 visibility:
						 (state === GameState.HOME || state === GameState.LOBBY)
							 ? "hidden" : "visible"
				 }
			 }
	 */

	// @ts-ignore
	return (
		<div className={ styles.container }>
			<Logo/>

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
						restartGame();
					} }
					onMouseEnter={ playClickAudio }
			>
				<Icon name={ Icons.IconRestart }/>
			</button>

			<button className={ styles.closeButton }
					onClick={ () => {
						restartGame();
						lobby();
					} }
					onMouseEnter={ playClickAudio }
			>
				<Icon name={ Icons.IconClose }/>
			</button>

			<Canvas
				color="transparent"
				shadows
				onPointerDown={ (e: any) => {
					if (state !== GameState.ENDED) {
						e.target.requestPointerLock()
					}
				} }
			>
				<Suspense fallback={ <Loading/> }>
					<Preload all/>

					<Physics debug={ false }>
						<Character/>
						<CarCity/>
					</Physics>


					<EffectComposer
						multisampling={0}
					>
						<></>
						{/*<SMAA />*/}
						{/* <N8AO distanceFalloff={1} aoRadius={1} intensity={3} /> */}
						{/*<Bloom
						luminanceThreshold={0}
						mipmapBlur
						luminanceSmoothing={0.01}
						intensity={0.5}
					/>*/}
						{/*<TiltShift2 />*/}
						{/* <ChromaticAberration offset={[0.0006, 0.0006]} /> */}
						{/*<HueSaturation saturation={0.05} />*/}
						{/* <Vignette eskil={false} offset={0.1} darkness={0.4} /> */}
					</EffectComposer>

					{/* <Stats /> */}
					{/*<Perf />*/}
				</Suspense>
			</Canvas>
		</div>
	);

}