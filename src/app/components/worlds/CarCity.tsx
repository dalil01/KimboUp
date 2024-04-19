import { Environment, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";
import GameStore from "@/app/stores/GameStore";

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

export default function CarCity(props: SquareParkProps) {

	const {} = props;

	const startGame = GameStore((state: any) => state.start);
	const endGame = GameStore((state: any) => state.end);

	const { scene, materials, animations } = useGLTF("/models/CarCity.glb", "draco/gltf/");

	const [ok, setOk] = useState<any>(false);

	const [startStartPlatform, setStartStartPlatform] = useState<any>();
	const [endFlag, setEndFlag] = useState<any>();
	const [cuboids, setCuboids] = useState<any[]>();

	useEffect(() => {
		const cuboidsGroup: React.SetStateAction<any[] | undefined> = [];

		scene.children = scene.children.filter((child) => {
			if (child.name == "StartPlatform") {
				setStartStartPlatform(child);
				return false;
			}

			if (child.name == "EndFlag") {
				setEndFlag(child);
				return false;
			}

			if (child.name.startsWith("Cuboid")) {
				cuboidsGroup.push(child);
				return false;
			}

			return true;
		});

		setCuboids(cuboidsGroup);

		setOk(true)
	}, []);

	return (
		<>
			<Environment files="/hdrs/fouriesburg_mountain_midday_1k.hdr" background/>
			{ ok &&
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
                            <Primitive object={ startStartPlatform } />
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
                            <Primitive object={ endFlag } />
                        </RigidBody>
					}

					{ cuboids &&
                        cuboids.map((cuboid, index) => (
							<RigidBody
								key={ "cuboid" + index }
								type='fixed'
								colliders="cuboid"
							>
								<Primitive object={ cuboid } />
							</RigidBody>
						))
					}


                    <RigidBody
                        type='fixed'
                        colliders="trimesh"
                    >
                        <Primitive object={ scene }/>
                    </RigidBody>
                </group>
			}
		</>
	);

}

useGLTF.preload("/models/CarCity.glb", "draco/gltf/");