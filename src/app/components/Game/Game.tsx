import styles from "./Game.module.css";

import { Canvas } from "@react-three/fiber";
import { GameState, GameStore, GameStoreState } from "@/app/stores/GameStore";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "@/app/components/Loading/Loading";
import { Preload } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import SettingsButton from "@/app/components/SettingsButton/SettingsButton";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Logo from "@/app/components/Logo/Logo";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import Timer from "@/app/components/Timer/Timer";
import EndGameModal from "@/app/components/EndGameModal/EndGameModal";
import { CharacterControllerFactory } from "@/app/components/characters/CharacterControllerFactory";
import { MapFactory } from "@/app/components/maps/MapFactory";
import { insertCoin, onPlayerJoin } from "playroomkit";

export default function Game() {

	const { currentConfig, state, lobby, restart, players, setPlayers } = GameStore((state: GameStoreState) => ({
		currentConfig: state.currentConfig,
		state: state.state,
		lobby: state.lobby,
		restart: state.restart,
		players: state.players,
		setPlayers: state.setPlayers,
	}));

	const { playHoverButtonAudio } = useAudioManager();

	const [linkCopied, setLinkCopied] = useState(false);

	useEffect(() => {
		const joinPlayRoom = async () => {
			try {
				await insertCoin({
					skipLobby: true
				});
			} catch (e) {
				console.error(e);
			}
		};

		onPlayerJoin((state) => {
			const newPlayer = { state }
			setPlayers((players) => [...players.filter((p) => p.state.id !== state.id), newPlayer]);

			state.onQuit(() => {
				setPlayers((players) => players.filter((p) => p.state.id !== state.id));
			});
		});

		joinPlayRoom().then(() => {
			// Nothing to do.
		});
	}, []);

	return (
		<div className={ styles.container }>
			<Logo />

			{ state === GameState.ENDED || state === GameState.ENDED_ALL
				?
				<EndGameModal />
				:
				<Timer />
			}

			<SettingsButton
				right={ "14rem" }
			/>

			<button className={ styles.usersButton }
					onClick={ () => {
						navigator.clipboard.writeText(window.location.href).then(() => {
							setLinkCopied(true);
						});
					} }
					onMouseEnter={ playHoverButtonAudio }
					onMouseLeave={ () => {
						setLinkCopied(false);
					} }
			>
				<Icon name={ Icons.IconUsers }/>
				<span className={ styles.copyLinkTooltipText }>{ linkCopied ? "LINK COPIED !" : "COPY LINK" }</span>
			</button>

			<button className={ styles.restartButton }
					onClick={ () => {
						restart();
					} }
					onMouseEnter={ playHoverButtonAudio }
			>
				<Icon name={ Icons.IconRestart }/>
			</button>

			<button className={ styles.closeButton }
					onClick={ () => {
						restart();
						lobby();
					} }
					onMouseEnter={ playHoverButtonAudio }
			>
				<Icon name={ Icons.IconClose }/>
			</button>

			<Canvas
				color="transparent"
				shadows
				onPointerDown={ (e: any) => {
					if (state !== GameState.ENDED) {
						e.target.requestPointerLock();
					}
				} }
			>
				<Suspense fallback={ <Loading/> }>
					<Preload all/>

					<Physics debug={ false }>
						{
							players.map(({ state }, idx) => (
								<group key={ "character-" + idx }>
									{
										CharacterControllerFactory.create(currentConfig.character.main.name, {
											...currentConfig.character.main.props,
											playerState: state,
											bodyName: currentConfig.character.main.name + '-' + state.id
										})
									}
								</group>
							))
						}
						{ MapFactory.create(currentConfig.map.name, currentConfig.map.props) }
					</Physics>

					{/* <Stats /> */ }
					{/* <Perf /> */ }
				</Suspense>
			</Canvas>
		</div>
	);

}