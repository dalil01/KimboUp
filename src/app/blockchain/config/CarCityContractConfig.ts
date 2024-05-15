export class CarCityContractConfig {

	public static ADDRESS = process.env.NEXT_PUBLIC_CARCITY_CONTRAT_ADDRESS as `0x${ string }`;

	public static ABI = [
		{
			"type": "function",
			"name": "setUser",
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				},
				{
					"name": "_username",
					"type": "string"
				}
			],
			"outputs": []
		},
		{
			"type": "function",
			"name": "setTime",
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				},
				{
					"name": "_timeMs",
					"type": "uint256"
				}
			],
			"outputs": []
		},
		{
			"type": "function",
			"name": "getUser",
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"outputs": [
				{
					"name": "",
					"type": "string"
				},
				{
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view"
		},
		{
			"type": "function",
			"name": "getUsersPaginated",
			"inputs": [
				{
					"name": "_pageNumber",
					"type": "uint256"
				},
				{
					"name": "_itemsPerPage",
					"type": "uint256"
				}
			],
			"outputs": [
				{
					"name": "",
					"type": "string[]"
				},
				{
					"name": "",
					"type": "uint256[]"
				},
				{
					"name": "",
					"type": "bool"
				},
				{
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view"
		}
	];

	public static FUNCTIONS = {
		SET_USER: "setUser",
		SET_TIME: "setTime",
		GET_USER: "getUser",
		GET_USERS_PAGINATED: "getUsersPaginated"
	}

}