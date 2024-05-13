import React, { Suspense, useMemo } from "react";
import { KeyboardControls, OrbitControls, PerspectiveCamera, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { GameState, GameStore } from "@/app/stores/GameStore";
import { LobbyCanvas } from "@/app/components/Lobby/LobbyCanvas";
import { LobbyHTML } from "@/app/components/Lobby/LobbyHTML";
import { Home } from "@/app/components/Home/Home";
import Character from "@/app/components/Character/Character";
import { Physics, RigidBody } from "@react-three/rapier";
import Lights from "@/app/components/Lights/Lights";
import CarCity from "@/app/components/worlds/CarCity";
import * as THREE from "three";
import CharacterLobby from "@/app/components/Character/CharacterLobby";

export enum Controls {
	FORWARD = "forward",
	BACKWARD = "backward",
	LEFTWARD = "leftward",
	RIGHTWARD = "rightward",
	JUMP = "jump"
}

export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

export const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });

export default function Experience() {

	const controlsMap = useMemo(() => [
		{ name: Controls.FORWARD, keys: ['ArrowUp', 'KeyW'] },
		{ name: Controls.BACKWARD, keys: ['ArrowDown', 'KeyS'] },
		{ name: Controls.LEFTWARD, keys: ['ArrowLeft', 'KeyA'] },
		{ name: Controls.RIGHTWARD, keys: ['ArrowRight', 'KeyD'] },
		{ name: Controls.JUMP, keys: ['Space'] },
	], []);

	const state = GameStore((state: any) => state.state);

	/*
	fallback={ gameState !== GameState.LOBBY && <Loading/> }
	 */

	return (
		<KeyboardControls map={ controlsMap }>
			{ state === GameState.HOME && <Home/> }

			{ state === GameState.LOBBY &&
                <>
                    <LobbyHTML/>
                    <LobbyCanvas/>
                </>
			}

			{/*

			<Canvas
				color="transparent"
				shadows
				onPointerDown={ (e: any) => {
					if (state !== GameState.LOBBY && state !== GameState.ENDED) {
						e.target.requestPointerLock()
					}
				} }>
				<Suspense>
					<Preload all/>

					<Physics debug={ false }>
						<Lights/>

						{ state === GameState.LOBBY &&
                            <LobbyCanvas/>
						}
					</Physics>

							<Lights/>
							<CarCity/>
							<Character />
						{<Stats />}
				</Suspense>
			</Canvas>
									*/ }

		</KeyboardControls>
	)
}