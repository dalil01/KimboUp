import styles from "./EndGameModal.module.css";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import { UTime } from "@/app/utils/UTime";
import { GameState, GameStore, GameStoreState, PlayerState } from "@/app/stores/GameStore";
import { useEffect, useState } from "react";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "@/app/blockchain/config/Web3Config";
import { CarCityConfig } from "@/app/blockchain/config/CarCity.config";
import { MultiPlayer } from "@/app/types/MultiPlayer";
import { Files } from "@/app/vars/Files";
import { myPlayer } from "playroomkit";

export default function EndGameModal() {

	const { players, state, user, lobby, restart, autoSetTimeAsCurrentTime } = GameStore((state: GameStoreState) => ({
		players: state.players,
		state: state.state,
		user: state.user,
		lobby: state.lobby,
		restart: state.restart,
		autoSetTimeAsCurrentTime: state.autoSetTimeAsCurrentTime
	}));

	const currentPlayer = myPlayer();

	const { isConnected, address, connector } = useAccount();
	const [saved, setSaved] = useState(false);

	const { playHoverButtonAudio } = useAudioManager();

	useEffect(() => {
		return () => {
			autoSetTimeAsCurrentTime();
		}
	}, []);

	const handleSaveToKimbonet = async () => {
		if (!user) {
			return;
		}

		await writeContract(config, {
			abi: CarCityConfig.ABI,
			address: CarCityConfig.ADDRESS,
			functionName: CarCityConfig.FUNCTIONS.SET_TIME,
			args: [address, user.currentTime],
			connector
		}).then(() => {
			// Nothing to do.
		}).catch((error) => {
			console.error(error);
		}).finally(() => {
			setSaved(true);
		});
	}

	const filterAndSortPlayersByTime = (players: MultiPlayer[]) => {
		return players
			.filter(player => player.state.getState(PlayerState.TIME) !== undefined)
			.sort((a, b) => Number(a.state.getState(PlayerState.TIME)) - Number(b.state.getState(PlayerState.TIME)));
	};

	return (
		<div className={ styles.background }>
			<div className={ styles.container }>
				<div className={ styles.header }>
					<img
						className={ styles.logo }
						src={ Files.IMAGES.LOGO_MIN }
					/>
				</div>

				<div className={ styles.content }>
					<table className={ styles.statsContainer }>
						<thead>
							<tr>
								<th></th>
								<th className={ styles.usernameTitle }>USERNAME</th>
								<th className={ styles.timeTitle }>TIME</th>
							</tr>
						</thead>
						<tbody>
							{
								filterAndSortPlayersByTime(players).map((player, index) => (
									<tr key={ index }>
										<td className={ styles.index + ' ' + (currentPlayer.id === player.state.id ? styles.currentIndex : '') }>{ index + 1 }</td>
										<td className={ styles.username }>
											{ player.state.getState(PlayerState.USERNAME) }
										</td>
										<td className={ styles.timeText }>
											{ UTime.format(Number(player.state.getState("time"))) }
										</td>
									</tr>
								))
							}
						</tbody>
					</table>

					{
						state === GameState.ENDED_ALL &&
						!saved && isConnected && user &&
						(user.time == 0 || (user.currentTime && user.currentTime < user.time)) &&
                        <div className={ styles.newBestTime }>
                            <p>IT'S YOUR NEW BEST TIME&nbsp;!&nbsp;🎉</p>
                            <button
								className={ styles.saveToKimbonet }
								onClick={ handleSaveToKimbonet }
                                onMouseEnter={ playHoverButtonAudio }
							>
								<Icon name={ Icons.IconSave } />
								<span>SAVE TO KIMBONET</span>
							</button>
                        </div>
					}
				</div>

				<div className={ styles.separator }></div>

				<div className={ styles.footer } onMouseEnter={ playHoverButtonAudio }>
					<button
						className={ styles.footerButton }
						onClick={ () => {
							restart();
						} }
						onMouseEnter={ playHoverButtonAudio }
					>
						<Icon name={ Icons.IconRestart }/>
						<span>RESTART</span>
					</button>

					<button
						className={ styles.footerButton }
						onClick={ () => {
							restart();
							lobby();
						} }
						onMouseEnter={ playHoverButtonAudio }
					>
						<Icon name={ Icons.IconClose } />
						<span>BACK TO LOBBY</span>
					</button>
				</div>
			</div>
		</div>
	);
}