import React, { useMemo } from "react";
import { KeyboardControls } from "@react-three/drei";
import Experience from "@/app/components/Experience";
import Interface from "@/app/components/Interface";



export enum Controls {
	FORWARD = "forward",
	BACKWARD = "backward",
	LEFTWARD = "leftward",
	RIGHTWARD = "rightward",
	JUMP = "jump"
}

export default function App() {

	const controlsMap = useMemo(() => [
		{ name: Controls.FORWARD, keys: [ 'ArrowUp', 'KeyW' ] },
		{ name: Controls.BACKWARD, keys: [ 'ArrowDown', 'KeyS' ] },
		{ name: Controls.LEFTWARD, keys: [ 'ArrowLeft', 'KeyA' ] },
		{ name: Controls.RIGHTWARD, keys: [ 'ArrowRight', 'KeyD' ] },
		{ name: Controls.JUMP, keys: [ 'Space' ] },
	], []);

	return (
		<KeyboardControls map={ controlsMap }>
			<Experience />
			<Interface />
		</KeyboardControls>
	)
}