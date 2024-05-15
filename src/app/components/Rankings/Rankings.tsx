import styles from "./Rankings.module.css";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { CarCityContractConfig } from "@/app/blockchain/config/CarCityContractConfig";
import { readContract } from "@wagmi/core";
import { config } from "@/app/blockchain/config/Web3Config";
import { deserialize } from '@wagmi/core'
import { UTime } from "@/app/utils/UTime";


const itemsPerPage = 25;

export default function Rankings() {

	const [pageNumber, setPageNumber] = useState(1);
	const [usernames, setUsernames] = useState([]);
	const [times, setTimes] = useState([]);
	const [hasPreviousPage, setHasPreviousPage] = useState(false);
	const [hasNextPage, setHasNextPage] = useState(false);

	useEffect(() => {
		(async () => {
			const usersRequest = await readContract(config, {
				abi: CarCityContractConfig.ABI,
				address: CarCityContractConfig.ADDRESS,
				functionName: CarCityContractConfig.FUNCTIONS.GET_USERS_PAGINATED,
				args: [pageNumber, itemsPerPage]
			});

			if ((usersRequest instanceof Array) && usersRequest.length == 4) {
				setUsernames(usersRequest[0]);
				setTimes(usersRequest[1]);
				setHasPreviousPage(usersRequest[2]);
				setHasNextPage(usersRequest[3]);
			}
		})();
	}, [pageNumber]);

	const handlePreviousPage = () => {
		setPageNumber(prev => prev - 1);
	};

	const handleNextPage = () => {
		setPageNumber(prev => prev + 1);
	};

	return (
		<div className={ styles.container }>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
				{
					usernames.map((username, index) => (
							<tr key={ index }>
								<td>{ username }</td>
								<td>{ UTime.format(Number(String(times[index]))) }</td>
							</tr>
						))
					}
				</tbody>
			</table>

			<div>
				<button disabled={ !hasPreviousPage } onClick={ handlePreviousPage }>Previous</button>
				<span>Page { pageNumber }</span>
				<button disabled={ !hasNextPage } onClick={ handleNextPage }>Next</button>
			</div>
		</div>
	);
}