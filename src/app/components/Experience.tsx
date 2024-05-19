import React, { useMemo } from "react";
import { KeyboardControls, useGLTF } from "@react-three/drei";
import { GameState, GameStore } from "@/app/stores/GameStore";
import { LobbyCanvas } from "@/app/components/Lobby/LobbyCanvas";
import { LobbyHTML } from "@/app/components/Lobby/LobbyHTML";
import { Home } from "@/app/components/Home/Home";
import Game from "@/app/components/Game/Game";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import useIsDesktop from "@/app/hooks/useIsDesktop";
import { OnlyDesktop } from "@/app/components/OnlyDesktop/OnlyDesktop";

export enum Controls {
	FORWARD = "forward",
	BACKWARD = "backward",
	LEFTWARD = "leftward",
	RIGHTWARD = "rightward",
	JUMP = "jump"
}

export default function Experience() {

	const controlsMap = useMemo(() => [
		{ name: Controls.FORWARD, keys: ['ArrowUp', 'KeyW'] },
		{ name: Controls.BACKWARD, keys: ['ArrowDown', 'KeyS'] },
		{ name: Controls.LEFTWARD, keys: ['ArrowLeft', 'KeyA'] },
		{ name: Controls.RIGHTWARD, keys: ['ArrowRight', 'KeyD'] },
		{ name: Controls.JUMP, keys: ['Space'] },
	], []);

	const state = GameStore((state: any) => state.state);

	const isDesktop = useIsDesktop();

	return (
		<>
			{
				isDesktop ?
					<KeyboardControls map={ controlsMap }>
						{ state === GameState.HOME && <Home/> }

						{ state === GameState.LOBBY &&
                            <>
                                <LobbyHTML />
                                <LobbyCanvas />
                            </>
						}

						{ !(state === GameState.HOME || state === GameState.LOBBY) &&
                            <Game />
						}
					</KeyboardControls>
				:
					<OnlyDesktop />
			}
		</>

	)
}

useGLTF.preload("/models/Character.glb", "draco/gltf/");
useGLTF.preload("/models/CarCity.glb", "draco/gltf/");
useLoader.preload(RGBELoader, '/textures/nebula2.hdr');