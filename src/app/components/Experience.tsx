import React, { useEffect, useMemo, useState } from "react";
import { KeyboardControls, useGLTF } from "@react-three/drei";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import { LobbyCanvas } from "@/app/components/Lobby/LobbyCanvas";
import { LobbyHTML } from "@/app/components/Lobby/LobbyHTML";
import { Home } from "@/app/components/Home/Home";
import Game from "@/app/components/Game/Game";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import useIsDesktop from "@/app/hooks/useIsDesktop";
import { OnlyDesktop } from "@/app/components/OnlyDesktop/OnlyDesktop";
import { Files } from "@/app/vars/Files";

export enum Controls {
	FORWARD = "forward",
	BACKWARD = "backward",
	LEFTWARD = "leftward",
	RIGHTWARD = "rightward",
	JUMP = "jump"
}

export default function Experience() {

	const { state, players } = GameStore((state: GameStoreState) => ({
		state: state.state,
		players: state.players,
	}));

	const isDesktop = useIsDesktop();

	const controlsMap = useMemo(() => [
		{ name: Controls.FORWARD, keys: ["ArrowUp", "KeyW"] },
		{ name: Controls.BACKWARD, keys: ["ArrowDown", "KeyS"] },
		{ name: Controls.LEFTWARD, keys: ["ArrowLeft", "KeyA"] },
		{ name: Controls.RIGHTWARD, keys: ["ArrowRight", "KeyD"] },
		{ name: Controls.JUMP, keys: ["Space"] },
	], []);

	return (
		<>
			{
				isDesktop ?
					<KeyboardControls map={ controlsMap }>
						{ state === GameState.HOME && <Home /> }

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

// Preload models
for (const [, path] of Object.entries(Files.MODELS)) {
	useGLTF.preload(path, Files.DRACO.GLTF);
}

// Preload hdrs
for (const [, path] of Object.entries(Files.HDRS)) {
	useLoader.preload(RGBELoader, path);
}