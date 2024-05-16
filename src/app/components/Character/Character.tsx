import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import useFollowCam from "@/app/hooks/useFollowCam";

const DEFAULT_POSITION = new Vector3(0, .5, 0);
const MOVEMENT_SPEED = 1.3;

const rotateAngle = new Vector3(0, 1, 0);
const rotateQuaternion = new Quaternion();
const impulseAxis = new Vector3(0, 1, 0);

let position = new Vector3(DEFAULT_POSITION.x, DEFAULT_POSITION.y, DEFAULT_POSITION.z);

export default function Character() {

	//const user: User = GameStore((state: any) => state.user);

	const state = GameStore((state: GameStoreState) => state.state);
	const setCharacterBody = GameStore((state: GameStoreState) => state.setCharacterBody);
	const restartGame = GameStore((state: GameStoreState) => state.restart);

	const { scene, materials, animations } = useGLTF("models/Character.glb", "draco/gltf/") as any;

	const [subscribeKeys, getKeys] = useKeyboardControls();

	const playerBodyRef = useRef<any>();
	const playerRef = useRef<any>();

	const { pivot, yaw } = useFollowCam(playerRef, [0, .8, 1.8]);

	const canJump = useRef(true);

	const textRef = useRef<any>();

	useEffect(() => {
		if (state === GameState.READY) {
			position = new Vector3(DEFAULT_POSITION.x, DEFAULT_POSITION.y, DEFAULT_POSITION.z);
		}

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

	useFrame(({ camera }, delta) => {
		if (!playerBodyRef.current) {
			return;
		}

		//if (textRef.current) {
		//	textRef.current.lookAt(camera.position);
		//}

		const t = playerBodyRef.current.translation();

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

				position.x = t.x;
				position.y = t.y;
				position.z = t.z;
			}
		}

		if (t.y < -1) {
			restartGame();
		}
	});


	function jump(): void {
		if (canJump.current) {
			playerBodyRef.current.applyImpulse({ x: 0, y: 0.21, z: 0 }, true);
			canJump.current = false;
		}
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
				linearDamping={ 21 }
				gravityScale={ 1.8 }
				position={ position }
			>
				{ /* user?.username &&
					<group ref={ textRef }>
						<Text
							position-y={ 0.5 }
							fontSize={ 0.08 }
							anchorX="center"
							anchorY="middle"
							font="fonts/PaytoneOne-Regular.ttf"
						>
							{ user?.username || '' }
							<meshBasicMaterial color="white"/>
						</Text>
						<Text
							position-y={ 0.492 }
							position-x={ 0.005 }
							position-z={ -0.02 }
							fontSize={ 0.08 }
							anchorX="center"
							anchorY="middle"
							font="fonts/PaytoneOne-Regular.ttf"
						>
							{ user?.username || '' }
							<meshBasicMaterial color="black"/>
						</Text>
					</group>
				*/ }

				<primitive
					ref={ playerRef }
					object={ scene }
					scale={ 0.75 }
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