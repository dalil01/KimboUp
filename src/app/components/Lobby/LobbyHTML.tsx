import styles from "./Lobby.module.css";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { GameStore, GameStoreState, User } from "@/app/stores/GameStore";
import UsernameInput from "@/app/components/UsernameInput/UsernameInput";
import ConnectWallet from "@/app/components/ConnectWallet/ConnectWallet";

export function LobbyHTML() {

	const user: undefined | User = GameStore((state: GameStoreState) => state.user);

	const home = GameStore((state: any) => state.home);
	const ready = GameStore((state: any) => state.ready);

	return (
		<div className={ styles.containerHTML }>
			<ReactSVG
				onClick={ () => {
					home();
				} }
				className={ styles.logo }
				src={ "/svg/logo.svg" }
			/>

			<ConnectWallet />

			<Link className={ styles.settingsButton } href="/settings">
				<Icon name={ Icons.IconSettings } />
			</Link>

			<UsernameInput />

			<Link className={ styles.rankings  } href="/rankings">
				<Icon name={ Icons.IconRankings } />
				<span>RANKINGS</span>
			</Link>

			<button className={ styles.iconsButton }>
				<Icon name={ Icons.IconDog } />
				<Icon name={ Icons.IconUp } />
				<Icon name={ Icons.IconFlag } />
			</button>

			<button
				className={ (user?.username) ? styles.playButtonActive : styles.playButton }
				onClick={ () => {
					ready();
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