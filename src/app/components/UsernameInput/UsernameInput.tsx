import styles from "./UsernameInput.module.css";
import { useState } from "react";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import { useAccount } from "wagmi";
import { config } from "@/app/blockchain/config/Web3Config";
import { writeContract } from "@wagmi/core";
import { User } from "@/app/types/User";

export default function UsernameInput() {

	const { currentConfig, user, setUser } = GameStore((state: GameStoreState) => ({
		currentConfig: state.currentConfig,
		user: state.user,
		setUser: state.setUser
	}));

	const { isConnecting, isReconnecting, isConnected, address, connector } = useAccount();

	const [displaySave, setDisplaySave] = useState<undefined | boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	return (
		<form className={ styles.container } onSubmit={ (e) => {
			e.preventDefault();
		} }>
			{
				(isConnecting || isReconnecting) ?
					<p className={ styles.loading }>LOADING...</p>
					:
					<>
						<input
							className={ styles.input }
							type="text"
							placeholder="Username*"
							defaultValue={ user?.username || '' }
							onChange={
								(e) => {
									setErrorMessage('');

									let newUser: User = {} as User;
									if (user) {
										newUser = { ...user };
									}

									newUser.username = e.target.value.trim();

									setUser(newUser);
									setDisplaySave(user && newUser.username.length > 0 && newUser.username !== newUser.contractUsername);
								}
							}
						/>

						{ currentConfig.map.contract && isConnected && displaySave && user &&
                            <button
                                className={ styles.saveButton }
                                onClick={ async (e) => {
									e.preventDefault();

									await writeContract(config, {
										abi: currentConfig.map.contract?.abi!,
										address: currentConfig.map.contract?.address!,
										functionName: currentConfig.map.contract?.functions.SET_USER!,
										args: [address, user.username],
										connector
									}).then(() => {
										setUser({ ...user, contractUsername: user.username });
										setDisplaySave(false);
									}).catch((error) => {
										if (error.message) {
											const userNameAlreadyExists = "This username already exists"
											if (error.message.includes(userNameAlreadyExists)) {
												setErrorMessage(userNameAlreadyExists);
											}
										}

										console.error(error);
									});
								} }
                            >
                                <Icon name={ Icons.IconSave }/>
                            </button>
						}

						{ errorMessage &&
							<p className={ styles.errorMessage }>{ errorMessage }</p>
						}
					</>
			}
		</form>
	);
}