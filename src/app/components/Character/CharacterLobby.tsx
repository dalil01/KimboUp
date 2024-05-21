import { Cylinder, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import FakeFlame from "@/app/components/Character/shaders/FakeFlame";
import { scale } from "maath/vector2";

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

			{/*
			<Cylinder
				args={[0.09, 0, 1, 128, 64, true]}
				position={[-0.18, 0.75, -1.1]}
				rotation={[Math.PI / 1.5, 0, 0]}
				scale={.5}
			>
				<FakeFlame isBoosting={true}/>
			</Cylinder>
			*/}
		</group>
	);

}