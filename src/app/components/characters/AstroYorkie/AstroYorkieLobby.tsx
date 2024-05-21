import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import AstroYorkieLobbyLights from "@/app/components/characters/AstroYorkie/AstroYorkieLobbyLights";
import { Files } from "@/app/vars/Files";

export default function AstroYorkieLobby() {

	const { scene, materials, animations } = useGLTF(Files.MODELS.ASTRO_YORKIE, Files.DRACO.GLTF);

	return (
		<>
			<AstroYorkieLobbyLights />
			<group position={ [0, 0, 0] }>
				<primitive
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
					<AstroYorkieFlameShader isBoosting={true}/>
				</Cylinder>
				*/}
			</group>
		</>
	);

}