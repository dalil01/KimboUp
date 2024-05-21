import styles from "./Lobby.module.css";

import React, { Suspense, useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import { CharacterFactory } from "@/app/components/characters/CharacterFactory";

export function LobbyCanvas() {

	const currentConfig = GameStore((state: GameStoreState) => state.currentConfig);

	useEffect(() => {
		return () => {
			document.body.style.cursor = "auto";
		}
	}, []);

	return (
		<Canvas
			color="transparent"
			shadows
			camera={ {
				fov: 45,
				near: 0.1,
				far: 200,
				position: [-1, 1, 3]
			} }
			onMouseOver={ () => {
				document.body.style.cursor = "grab";
			} }
			onPointerDown={ () => {
				document.body.style.cursor = "grabbing";
			} }
			onPointerUp={ () => {
				document.body.style.cursor = "grab";
			} }
		>
			<Suspense>
				<Preload all/>

				<OrbitControls
					makeDefault
					enableZoom={ false }
					enablePan={ false }
					enableDamping
					minDistance={ 2.5 }
					maxDistance={ 2.5 }
					minPolarAngle={ 1 }
					maxPolarAngle={ Math.PI / 2 - 0.1 }
				/>

				{ CharacterFactory.create(currentConfig.character.lobby.name, currentConfig.character.lobby.props) }
			</Suspense>
		</Canvas>
	)
}