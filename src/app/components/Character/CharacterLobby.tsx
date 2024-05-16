import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export default function CharacterLobby() {

	const { scene, materials, animations } = useGLTF("models/Character.glb", "draco/gltf/") as any;

	const playerRef = useRef<any>();

	return (
		<group position={ [0, 0, 0] }>
			<primitive
				ref={ playerRef }
				object={ scene }
				scale={ 1 }
				castShadow={ true }
				receiveShadow={ true }
			/>
		</group>
	);
}