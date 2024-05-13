"use client";

import * as process from "process";

import { ethers } from "ethers";

declare global {
	interface Window {
		ethereum?: any;
	}
}

const ethereum: any = (typeof window !== 'undefined') ? window.ethereum : null;

const contractAddress: string = "0xE30E0050B9eED246cF1D9D569acF925aF91061Fb";
const contractInterface = [
	"function setUser(address _address, string memory _username, uint256 _timeMs) public",
	"function getUser(address _user) public view returns (string memory, uint256)",
	"function getUsersPaginated(uint256 _pageNumber, uint256 _itemsPerPage) public view returns (uint256[] memory, bool, bool)"
]

const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
const provider = new ethers.providers.JsonRpcProvider("https://api.ash-test.center/kimbonet/rpc");

const readContract = new ethers.Contract(contractAddress, contractInterface, provider);
const writeContract = new ethers.Contract(contractAddress, contractInterface, signer);

export const saveToKimbonet = async (address: string, username: string, timeMs: number) => {
	try {
		await writeContract.setUser(address, username, timeMs);
		console.log("User saved to Kimbonet successfully!");
	} catch (e) {
		console.error("Error setting user:", e);
		throw e;
	}
}

export const getUserFromKimbonet = async (address: string) => {
	try {
		const [username, timeMs] = await readContract.getUser(address);
		return { username, timeMs };
	} catch (error) {
		console.error("Error getting user:", error);
		throw error;
	}
}

export const getUsersPaginatedFromKimbonet = async (pageNumber: number, itemsPerPage: number) => {
	try {
		const [usernames, hasPrevious, hasNext] = await readContract.getUsersPaginated(pageNumber, itemsPerPage);

		console.log(usernames, hasPrevious, hasNext);

		return { hasPrevious, hasNext };
	} catch (error) {
		console.error("Error getting paginated users:", error);
		throw error;
	}
}