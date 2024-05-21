import React from "react";

import { Environment, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import CarCityLights from "@/app/components/maps/CarCity/CarCityLights";
import { Object3D, Object3DEventMap } from "three";
import { Files } from "@/app/vars/Files";
import { EffectComposer } from "@react-three/postprocessing";

type SquareParkProps = {}

const Primitive = ({ object }: { object: any }) => {
	return (
		<primitive
			object={ object }
			scale={ 1 }
			castShadow={ true }
			receiveShadow={ true }
		></primitive>
	)
}


let startStartPlatform: Object3D<Object3DEventMap>;
let endFlag: Object3D<Object3DEventMap>;

const cuboids: Object3D<Object3DEventMap>[] = [];

export default function CarCity(props: SquareParkProps) {

	const {} = props;

	const { currentConfig, start, end } = GameStore((state: GameStoreState) => ({
		currentConfig: state.currentConfig,
		start: state.start,
		end: state.end
	}));

	const { scene, materials, animations } = useGLTF("/models/CarCity.glb", "draco/gltf/");
	if (scene) {
		scene.children = scene.children.filter((child) => {
			if (child.name == "StartPlatform") {
				startStartPlatform = child;
				return false;
			}

			if (child.name == "EndFlag") {
				endFlag = child;
				return false;
			}

			if (child.name.startsWith("Cuboid")) {
				cuboids.push(child);
				return false;
			}

			return true;
		});
	}

	return (
		<>
			<CarCityLights/>

			<Environment files={ Files.HDRS.SPACE } background />

			<group position={ [0, 0, 0] }>
				{ startStartPlatform &&
                    <RigidBody
                        type="fixed"
                        colliders={ "cuboid" }
                        onCollisionEnter={ (e) => {
							if (e.other.rigidBodyObject?.name === currentConfig.character.main.name) {
								start();
							}
						} }
                    >
                        <Primitive object={ startStartPlatform }/>
                    </RigidBody>
				}

				{ endFlag &&
                    <RigidBody
                        type="fixed"
                        colliders="cuboid"
                        onCollisionEnter={ (e) => {
							if (e.other.rigidBodyObject?.name === currentConfig.character.main.name) {
								end();
							}
						} }
                    >
                        <Primitive object={ endFlag }/>
                    </RigidBody>
				}

				{ cuboids &&
					cuboids.map((cuboid, index) => (
						<RigidBody
							key={ "cuboid" + index }
							type="fixed"
							colliders="cuboid"
						>
							<Primitive object={ cuboid }/>
						</RigidBody>
					))
				}


				{ scene &&
                    <RigidBody
                        type="fixed"
                        colliders="trimesh"
                    >
                        <Primitive object={ scene }/>
                    </RigidBody>
				}
			</group>

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
		</>
	);

}