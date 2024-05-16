import { Environment, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useState } from "react";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import CarCityLights from "@/app/components/CarCity/CarCityLights";
import { Object3D, Object3DEventMap } from "three";
import { RGBELoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

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
const cuboids: Object3D<Object3DEventMap>[] = []

export default function CarCity(props: SquareParkProps) {

	const {} = props;

	const startGame = GameStore((state: GameStoreState) => state.start);
	const endGame = GameStore((state: GameStoreState) => state.end);

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

			<Environment files="/hdrs/HDR_multi_nebulae2.hdr" background />

			<group position={ [0, 0, 0] }>
				{ startStartPlatform &&
                    <RigidBody
                        type='fixed'
                        colliders={ "cuboid" }
                        onCollisionEnter={ (e) => {
							// @ts-ignore
							if (e.other.rigidBodyObject.name === "Character") {
								startGame()
							}
						} }
                    >
                        <Primitive object={ startStartPlatform }/>
                    </RigidBody>
				}

				{ endFlag &&
                    <RigidBody
                        type='fixed'
                        colliders="cuboid"
                        onCollisionEnter={ (e) => {
							// @ts-ignore
							if (e.other.rigidBodyObject.name === "Character") {
								endGame();
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
							type='fixed'
							colliders="cuboid"
						>
							<Primitive object={ cuboid }/>
						</RigidBody>
					))
				}


				{ scene &&
                    <RigidBody
                        type='fixed'
                        colliders="trimesh"
                    >
                        <Primitive object={ scene }/>
                    </RigidBody>
				}
			</group>
		</>
	);

}