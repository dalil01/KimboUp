import styles from "./EndGameModal.module.css";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import { UTime } from "@/app/utils/UTime";
import { GameStore, GameStoreState, User } from "@/app/stores/GameStore";
import { useEffect, useState } from "react";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { useAccount } from "wagmi";
import { writeContract } from "@wagmi/core";
import { config } from "@/app/blockchain/config/Web3Config";
import { CarCityContractConfig } from "@/app/blockchain/config/CarCityContractConfig";

export default function EndGameModal() {

	const user: undefined | User = GameStore((state: GameStoreState) => state.user);
	const lobby = GameStore((state: GameStoreState) => state.lobby);
	const restartGame = GameStore((state: GameStoreState) => state.restart);
	const autoSetTimeAsCurrentTime = GameStore((state: GameStoreState) => state.autoSetTimeAsCurrentTime);

	const { isConnected, address, connector } = useAccount();
	const [saved, setSaved] = useState(false);

	const { playClickAudio } = useAudioManager();

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
			abi: CarCityContractConfig.ABI,
			address: CarCityContractConfig.ADDRESS,
			functionName: CarCityContractConfig.FUNCTIONS.SET_TIME,
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

	return (
		<div className={ styles.background }>
			<div className={ styles.container }>
				<div className={ styles.header }>
				</div>

				<div className={ styles.content }>
					<div className={ styles.timeContainer }>
						<p className={ styles.timeText }>
							{ UTime.format(user?.currentTime || 0) }
						</p>
					</div>

					{
						!saved && isConnected && user && (user.time == 0 || (user.currentTime && user.currentTime < user.time)) &&
                        <div className={ styles.newBestTime }>
                            <p>IT'S YOUR NEW BEST TIME&nbsp;!&nbsp;🎉</p>
                            <button
								className={ styles.saveToKimbonet }
								onClick={ handleSaveToKimbonet }
                                onMouseEnter={ playClickAudio }
							>
								<Icon name={ Icons.IconSave } />
								<span>SAVE TO KIMBONET</span>
							</button>
                        </div>
					}
				</div>

				<div className={ styles.separator }></div>

				<div className={ styles.footer } onMouseEnter={ playClickAudio }>
					<button
						className={ styles.footerButton }
						onClick={ () => {
							restartGame();
						} }
						onMouseEnter={ playClickAudio }
					>
						<Icon name={ Icons.IconRestart }/>
						<span>RESTART</span>
					</button>

					<button
						className={ styles.footerButton }
						onClick={ () => {
							restartGame();
							lobby();
						} }
						onMouseEnter={ playClickAudio }
					>
						<Icon name={ Icons.IconClose } />
						<span>BACK TO LOBBY</span>
					</button>
				</div>
			</div>
		</div>
	);
}