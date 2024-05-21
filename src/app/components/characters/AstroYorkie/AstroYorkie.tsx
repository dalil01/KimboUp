import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import useFollowCam from "@/app/hooks/useFollowCam";
import { UGame } from "@/app/utils/UGame";
import { Files } from "@/app/vars/Files";
import { Characters } from "@/app/components/characters/Characters";

const DEFAULT_POSITION = new Vector3(0, .5, 0);
const MOVEMENT_SPEED = 1.3;

const rotateAngle = new Vector3(0, 1, 0);
const rotateQuaternion = new Quaternion();
const impulseAxis = new Vector3(0, 1, 0);

let position = new Vector3(DEFAULT_POSITION.x, DEFAULT_POSITION.y, DEFAULT_POSITION.z);

export default function AstroYorkie() {

	//const user: User = GameStore((state: any) => state.user);

	const { state, setCharacterBody, restart } = GameStore((state: GameStoreState) => ({
		state: state.state,
		setCharacterBody: state.setCharacterBody,
		restart: state.restart
	}));

	const { scene, materials, animations } = useGLTF(Files.MODELS.ASTRO_YORKIE, Files.DRACO.GLTF);

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

		const unsubscribeJump = subscribeKeys((state) => state.jump,
			(value) => {
				if (value) {
					jump();
				}
			});

		return () => {
			unsubscribeJump();
		}
	}, [state, setCharacterBody, subscribeKeys]);

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
				const playerDirection = UGame.findDirectionOffset({ forward, backward, leftward, rightward })
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
			restart();
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
				name={ Characters.ASTRO_YORKIE }
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