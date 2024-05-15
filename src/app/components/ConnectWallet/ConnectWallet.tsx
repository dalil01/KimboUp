import styles from "./ConnectWallet.module.css";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import React, { useEffect, useState } from "react";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from "wagmi";
import { CarCityContractConfig } from "@/app/blockchain/config/CarCityContractConfig";
import { GameStore } from "@/app/stores/GameStore";
import { readContract } from "@wagmi/core";
import { config } from "@/app/blockchain/config/Web3Config";

export default function ConnectWallet() {

	const setUser = GameStore((state: any) => state.setUser);

	const { open } = useWeb3Modal();
	const { isConnecting, isReconnecting, isConnected, address } = useAccount();
	const { disconnect } = useDisconnect();

	const [userRead, setUserRead] = useState(false);

	useEffect(() => {
		if (isConnected && !userRead) {
			(async () => {
				const data: [string, number] = await readContract(config, {
					abi: CarCityContractConfig.ABI,
					address: CarCityContractConfig.ADDRESS,
					functionName: CarCityContractConfig.FUNCTIONS.GET_USER,
					args: [address]
				})as [string, number];


				if (data && data.length === 2) {
					setUser({
						address: address,
						contractUsername: data[0],
						username: data[0],
						time: data[1]
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
			<button
				className={ styles.connectWalletButton }
				onClick={ () => {
					if (isConnecting) {
						return;
					}

					isConnected ? disconnectWallet() : openConnectWallet()
				} }
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
		</>
	);
}