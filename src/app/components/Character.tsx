import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Quaternion, Vector3 } from "three";
import GameStore from "@/app/stores/GameStore";
import useFollowCam from "@/app/hooks/useFollowCam";

type CharacterProps = {
	gltfPath?: string;
}

const MOVEMENT_SPEED = 0.8;

let rotateAngle = new Vector3(0, 1, 0);
let rotateQuaternion = new Quaternion();
let impulseAxis = new Vector3(0, 1, 0);

export default function Character(props: CharacterProps) {

	const {
		gltfPath = "models/yorkie.glb"
	} = props;

	const setCharacterBody = GameStore((state: any) => state.setCharacterBody);
	const restartGame = GameStore((state: any) => state.restart);

	const { scene, materials, animations } = useGLTF(gltfPath) as any;

	const [subscribeKeys, getKeys] = useKeyboardControls();

	const playerBodyRef = useRef<any>();
	const playerRef = useRef<any>();

	const { yaw } = useFollowCam(playerRef, [0, .8, 1.8]);

	const canJump = useRef(true);

	useEffect(() => {
		if (playerBodyRef.current) {
			setCharacterBody(playerBodyRef.current);
		}

		const unsubscribeJump = subscribeKeys((state) => {
			return state.jump;
		}, (value) => {
			if (value) {
				jump();
			}
		});


		return () => {
			unsubscribeJump();
		}
	}, []);

	useFrame((_, delta) => {
		if (!playerBodyRef.current) {
			return;
		}

		if (document.pointerLockElement) {
			const { forward, backward, leftward, rightward, jump } = getKeys();
			const move = forward || backward || leftward || rightward;

			if (move) {

				const angleYCameraDirect = yaw.rotation.y;

				// Rotate avatar
				const playerDirection = findDirectionOffset({ forward, backward, leftward, rightward })
				rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirect + playerDirection);
				playerBodyRef.current.setRotation(rotateQuaternion, true);

				// Calculate impulse
				const impulseDirection = new Vector3(Math.sin(playerDirection), 0, Math.cos(playerDirection));
				impulseDirection.applyAxisAngle(impulseAxis, angleYCameraDirect);

				playerBodyRef.current.applyImpulse(impulseDirection.multiplyScalar(MOVEMENT_SPEED * delta), true);
			}
		}


		if (playerBodyRef.current.translation().y < -1) {
			restartGame();
		}
	});


	function jump(): void {
		if (canJump.current) {
			playerBodyRef.current.applyImpulse({ x: 0, y: 0.12, z: 0 }, true);
			canJump.current = false;
		}
	}

	function reset() {
		const [x, y, z] = [0, 0, 0];
		const playerBody = playerBodyRef.current;
		playerBody.setTranslation({ x, y, z });
		playerBody.setLinvel({ x, y, z });
		playerBody.setAngvel({ x, y, z });
		playerBody.setRotation([0, 0, 0, 1])
	}

	return (
		<>
			<RigidBody
				ref={ playerBodyRef }
				name={ "Character" }
				colliders="cuboid"
				onCollisionEnter={ () => {
					canJump.current = true;
				} }
				restitution={ 0.2 }
				friction={ 1 }
				lockRotations
				linearDamping={ 20 }
				gravityScale={ 2.5 }
				position={ [0, 1, 0] }
			>
				<primitive
					ref={ playerRef }
					object={ scene }
					scale={ 0.8 }
					castShadow={ true }
					receiveShadow={ true }
				/>
			</RigidBody>
		</>
	)
}

function findDirectionOffset({ forward, backward, leftward, rightward }: any): number {
	let directionOffset = 0;

	if (forward) {
		if (leftward) {
			directionOffset = -Math.PI * 3 / 4;
		} else if (rightward) {
			directionOffset = Math.PI * 3 / 4;
		} else {
			directionOffset = -Math.PI;
		}
	} else if (backward) {
		if (leftward) {
			directionOffset = -Math.PI / 4;
		} else if (rightward) {
			directionOffset = Math.PI / 4;
		}
	} else if (leftward) {
		directionOffset = -Math.PI / 2;
	} else if (rightward) {
		directionOffset = Math.PI / 2;
	}

	return directionOffset;
}

useGLTF.preload("/models/character.glb", "draco/gltf/");