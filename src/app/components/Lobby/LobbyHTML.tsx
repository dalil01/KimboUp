import styles from "./Lobby.module.css";

import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Link from "next/link";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import UsernameInput from "@/app/components/UsernameInput/UsernameInput";
import ConnectWallet from "@/app/components/ConnectWallet/ConnectWallet";
import { UTime } from "@/app/utils/UTime";
import { useAudioManager } from "@/app/hooks/useAudioManager";
import { Routes } from "@/app/vars/Routes";
import Logo from "@/app/components/Logo/Logo";
import SettingsButton from "@/app/components/SettingsButton/SettingsButton";
import { ChooseMap } from "@/app/components/ChooseMap/ChooseMap";
import CharacterEditor from "@/app/components/CharacterEditor/CharacterEditor";
import EndGameModal from "@/app/components/EndGameModal/EndGameModal";
import React from "react";

export function LobbyHTML() {

	const { user, ready } = GameStore((state: GameStoreState) => ({
		user: state.user,
		ready: state.ready
	}));

	const { playSoundEffect } = useAudioManager();

	return (
		<div className={ styles.containerHTML }>
			<Logo/>

			<ChooseMap />

			<ConnectWallet />

			<SettingsButton />

			<div className={ styles.editorContainer }>
				{/* <CharacterEditor /> */}
				<UsernameInput />
			</div>

			<Link className={ styles.rankings } href={ Routes.RANKINGS + '/' + window.location.hash }>
				<Icon name={ Icons.IconRankings }/>
				<span>RANKINGS</span>
			</Link>

			<button className={ styles.infoContainer }>
				<span className={ styles.infoIcon }>
					<Icon name={ Icons.IconDog } />
				</span>
				<div className={ styles.infoContent }>
					<div className={ styles.info }>
						<h3 className={ styles.infoTitle }>MAP</h3>
						<span className={ styles.infoSeparator }>:</span>
						<p className={ styles.infoText }>CarCity</p>
					</div>
					<div className={ styles.info }>
						<h3 className={ styles.infoTitle }>BEST TIME</h3>
						<span className={ styles.infoSeparator }>:</span>
						<p className={ styles.infoText }>
							{
								user?.time ?
									UTime.format(user.time)
									:
									"N/A"
							}
						</p>
					</div>
				</div>
			</button>

			<button
				className={ (user?.username) ? styles.playButtonActive : styles.playButton }
				onClick={ () => {
					if ((user?.username || '').length > 0) {
						ready();
					}
				} }
				onMouseEnter={ () => {
					if ((user?.username || '').length > 0) {
						playSoundEffect()
					}
				} }
			>
				<Icon name={ Icons.IconPlay }/>
				<span>PLAY!</span>
				<span className={ styles.playButtonTooltipText }>
					Username required !
				</span>
			</button>
		</div>
	);

}