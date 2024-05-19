import styles from "./UsernameInput.module.css";
import { useState } from "react";
import { GameStore, GameStoreState, User } from "@/app/stores/GameStore";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import { useAccount } from "wagmi";
import { CarCityContractConfig } from "@/app/blockchain/config/CarCityContractConfig";
import { config } from "@/app/blockchain/config/Web3Config";
import { writeContract } from "@wagmi/core";

export default function UsernameInput() {

	const user: undefined | User = GameStore((state: GameStoreState) => state.user);
	const setUser = GameStore((state: GameStoreState) => state.setUser);

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

									let newUser: any = {};
									if (user) {
										newUser = { ...user };
									}

									newUser.username = e.target.value.trim();

									setUser(newUser);
									setDisplaySave(user && newUser.username.length > 0 && newUser.username !== newUser.contractUsername);
								}
							}
						/>

						{ isConnected && displaySave && user &&
                            <button
                                className={ styles.saveButton }
                                onClick={ async (e) => {
									e.preventDefault();

									await writeContract(config, {
										abi: CarCityContractConfig.ABI,
										address: CarCityContractConfig.ADDRESS,
										functionName: CarCityContractConfig.FUNCTIONS.SET_USER,
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