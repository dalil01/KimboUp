import styles from "./ConnectWallet.module.css";

import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import React, { useEffect, useState } from "react";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from "wagmi";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import { readContract } from "@wagmi/core";
import { config } from "@/app/blockchain/config/Web3Config";
import { useAudioManager } from "@/app/hooks/useAudioManager";

export default function ConnectWallet() {

	const { currentConfig, setUser } = GameStore((state: GameStoreState) => ({
		currentConfig: state.currentConfig,
		setUser: state.setUser
	}));

	const { playSoundEffect } = useAudioManager();

	const { open } = useWeb3Modal();
	const { isConnecting, isReconnecting, isConnected, address } = useAccount();
	const { disconnect } = useDisconnect();

	const [userRead, setUserRead] = useState(false);

	useEffect(() => {
		const contract = currentConfig.map.contract;
		if (!contract) {
			return;
		}

		if (isConnected && !userRead) {
			(async () => {
				const data: [string, number] = await readContract(config, {
					abi: contract.abi,
					address: contract.address,
					functionName: contract.functions.GET_USER,
					args: [address]
				})as [string, number];


				if (address && data && data.length === 2) {
					setUser({
						address: address,
						contractUsername: data[0],
						username: data[0],
						time: Number(String(data[1]))
					});

					setUserRead(true);
				}
			})();
		}
	}, [address]);

	const openConnectWallet = () => {
		open().then(() => {
			document.body.style.cursor = "auto";
		});
	}

	const disconnectWallet = () => {
		disconnect();
	}

	return (
		<>
			{ currentConfig.map.contract &&
				<button
					className={ styles.connectWalletButton }
					onClick={ () => {
						if (isConnecting) {
							return;
						}

						isConnected ? disconnectWallet() : openConnectWallet()
					} }
					onMouseEnter={ playSoundEffect }
				>
					<Icon name={ Icons.IconWallet }/>
					<span>
						{
							(isConnecting || isReconnecting) ? "LOADING..."
							:
							(isConnected ? "DISCONNECT" : "CONNECT WALLET")
						}
					</span>
				</button>
			}
		</>
	);

}