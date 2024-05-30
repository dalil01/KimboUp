"use client";

import styles from "./Rankings.module.css";
import { useEffect, useState } from "react";
import { CarCityConfig } from "@/app/blockchain/config/CarCity.config";
import { readContract } from "@wagmi/core";
import { config } from "@/app/blockchain/config/Web3Config";
import { UTime } from "@/app/utils/UTime";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import { useAudioManager } from "@/app/hooks/useAudioManager";


const itemsPerPage = 25;

export default function Rankings() {

	const currentConfig = GameStore((state: GameStoreState) => state.currentConfig);

	const { playSoundEffect } = useAudioManager();

	const [state, setState] = useState({
		loading: true,
		pageNumber: 1,
		usernames: [],
		times: [],
		hasPreviousPage: false,
		hasNextPage: false
	});

	const { loading, pageNumber, usernames, times, hasPreviousPage, hasNextPage } = state;

	useEffect(() => {
		const fetchUsers = async () => {
			const contract = currentConfig.map.contract;
			if (!contract) {
				return;
			}

			setState(prevState => ({ ...prevState, loading: true }));

			try {
				const usersRequest = await readContract(config, {
					abi: contract.abi,
					address: contract.address,
					functionName: contract.functions.GET_USERS_PAGINATED,
					args: [pageNumber, itemsPerPage]
				});

				if ((usersRequest instanceof Array) && usersRequest.length == 4) {
					setState({
						loading: false,
						pageNumber,
						usernames: usersRequest[0],
						times: usersRequest[1],
						hasPreviousPage: usersRequest[2],
						hasNextPage: usersRequest[3]
					});
				}
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setState(prevState => ({ ...prevState, loading: false }));
			}
		};

		fetchUsers().then(() => {
			// Nothing to do.
		});
	}, [pageNumber]);

	const handlePreviousPage = () => {
		setState(prevState => ({
			...prevState,
			pageNumber: prevState.pageNumber - 1
		}));
	};

	const handleNextPage = () => {
		setState(prevState => ({
			...prevState,
			pageNumber: prevState.pageNumber + 1
		}));
	};

	return (
		<div className={ styles.container }>
			{
				loading ?
					<p className={ styles.loading }>LOADING...</p>
					:
					<>
						<table className={ styles.table }>
							<thead>
								<tr>
									<th></th>
									<th className={ styles.usernameTitle }>USERNAME</th>
									<th className={ styles.timeTitle }>TIME</th>
								</tr>
							</thead>
							<tbody>
							{
								usernames.map((username, index) => (
									<tr key={ index }>
										<td className={ styles.index }>{ index + 1 }</td>
										<td className={ styles.username }>{ username }</td>
										<td className={ styles.time }>{ UTime.format(Number(String(times[index]))) }</td>
									</tr>
								))
							}
							</tbody>
						</table>

						<div className={ styles.pagination }>
							<button disabled={ !hasPreviousPage } onClick={ handlePreviousPage } onMouseEnter={ playSoundEffect }>PREVIOUS</button>
							<span>PAGE { pageNumber }</span>
							<button disabled={ !hasNextPage } onClick={ handleNextPage } onMouseEnter={ playSoundEffect }>NEXT</button>
						</div>
					</>
			}
		</div>
	);
}