import React, { Suspense } from "react";
import { Preload, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import GameStore, { GameState } from "@/app/stores/GameStore";
import Loading from "@/app/components/Loading";
import { Physics } from "@react-three/rapier";
import Lights from "@/app/components/Lights";
import CarCity from "@/app/components/worlds/CarCity";
import Character from "@/app/components/Character";


export default function Experience() {

	const gameState = GameStore((state: any) => state.state);

	return (
		<>
			<Canvas shadows onPointerDown={(e: any) => {
				if (gameState !== GameState.LOBBY) {
					e.target.requestPointerLock()
				}
			}}>
				<Suspense fallback={ gameState !== GameState.LOBBY && <Loading /> }>
					<Preload all/>
					<Physics debug={ false }>
						<Lights/>
						<CarCity/>
						<Character />
					</Physics>
					<Stats />
				</Suspense>
			</Canvas>

		</>
	)
}