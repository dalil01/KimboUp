import { useEffect, useRef } from "react";
import { GameState, GameStore, GameStoreState, PlayerState } from "@/app/stores/GameStore";
import { Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { UGame } from "@/app/utils/UGame";
import { useKeyboardControls } from "@react-three/drei";
import useFollowCam from "@/app/hooks/useFollowCam";
import { RigidBody } from "@react-three/rapier";
import AstroYorkie from "@/app/components/characters/AstroYorkie/AstroYorkie";
import { myPlayer } from "playroomkit";
import AstroYorkieName from "@/app/components/characters/AstroYorkie/AstroYorkieName";

type AstroYorkieControllerProps = {
}

const DEFAULT_POSITION = new Vector3(0, 1.5, 0);
const MOVEMENT_SPEED = 1.3;

const rotateAngle = new Vector3(0, 1, 0);
const rotateQuaternion = new Quaternion();
const impulseAxis = new Vector3(0, 1, 0);

export default function AstroYorkieController({
	playerState,
	  bodyName,
		...props
}: any) {

	const { players, user, state, setCharacterBody, restart } = GameStore((state: GameStoreState) => ({
		players: state.players,
		user: state.user,
		state: state.state,
		setCharacterBody: state.setCharacterBody,
		restart: state.restart
	}));

	const currentPlayer = myPlayer();

	const [subscribeKeys, getKeys] = useKeyboardControls();

	const controllerRef = useRef<any>();
	const playerBodyRef = useRef<any>();
	const playerRef = useRef<any>();
	const textRef = useRef<any>();

	const { yaw, pivot } = useFollowCam(playerState.id === currentPlayer?.id ? playerRef : null, [0, .8, 1.8]);

	const canJump = useRef(true);

	useEffect(() => {
		if (playerState.id === currentPlayer?.id && playerBodyRef.current) {
			playerState.setState(PlayerState.BODY_NAME, bodyName);
			playerState.setState(PlayerState.USERNAME, user?.username);

			if (state === GameState.READY) {
				playerState.setState(PlayerState.POSITION, DEFAULT_POSITION);
				playerState.setState(PlayerState.FINISHED, false);
				playerBodyRef.current.setTranslation(DEFAULT_POSITION);
			} else {
				const pos = playerState.getState(PlayerState.POSITION);
				if (pos?.x) {
					playerBodyRef.current.setTranslation(pos);
					playerBodyRef.current.setRotation(playerState.getState(PlayerState.ROTATION));
				}
			}

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
		if (!playerBodyRef.current || !currentPlayer?.id) {
			return;
		}

		if (playerState.id === currentPlayer.id) {
			if (document.pointerLockElement) {
				const { forward, backward, leftward, rightward, jump } = getKeys();
				const move = forward || backward || leftward || rightward;

				if (move) {
					const angleYCameraDirect = yaw.rotation.y;

					// Rotate avatar
					const playerDirection = UGame.findDirectionOffset({ forward, backward, leftward, rightward });
					rotateQuaternion.setFromAxisAngle(rotateAngle, angleYCameraDirect + playerDirection);
					playerBodyRef.current.setRotation(rotateQuaternion, true);

					// Calculate impulse
					const impulseDirection = new Vector3(Math.sin(playerDirection), 0, Math.cos(playerDirection));
					impulseDirection.applyAxisAngle(impulseAxis, angleYCameraDirect);

					playerBodyRef.current.applyImpulse(impulseDirection.multiplyScalar(MOVEMENT_SPEED * delta), true);
				}
			}

			if (textRef.current) {
				// TODO
			}

			const translation = playerBodyRef.current.translation();

			playerState.setState(PlayerState.POSITION, translation);
			playerState.setState(PlayerState.ROTATION, playerBodyRef.current.rotation());

			if (translation.y < -1) {
				restart();
			}
		} else {
			const pos = playerState.getState(PlayerState.POSITION);
			if (pos?.x) {
				playerBodyRef.current?.setTranslation(pos);
				playerBodyRef.current?.setRotation(playerState.getState(PlayerState.ROTATION));
			}
		}
	});

	function jump(): void {
		if (canJump.current) {
			playerBodyRef.current.applyImpulse({ x: 0, y: 0.21, z: 0 }, true);
			canJump.current = false;
		}
	}

	return (
		<group key={ playerState.id } ref={ controllerRef } position={ DEFAULT_POSITION } { ...props }>
			<RigidBody
				ref={ playerBodyRef }
				name={ bodyName }
				colliders="cuboid"
				onCollisionEnter={ () => {
					canJump.current = true;
				} }
				restitution={ 0.2 }
				friction={ 1 }
				lockRotations
				linearDamping={ 21 }
				gravityScale={ 1.8 }

			>
				<group ref={ playerRef }>
					{/* <AstroYorkieName ref={ textRef } /> */}
					<AstroYorkie
						scale={ 0.75 }
						lights={ false }
					/>
				</group>
			</RigidBody>
		</group>
	)
}