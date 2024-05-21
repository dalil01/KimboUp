import { Characters } from "@/app/components/characters/Characters";
import { Maps } from "@/app/components/maps/Maps";

export type GameConfig = {
	character: {
		main: {
			name: Characters,
			props?: any
		},
		lobby: {
			name: Characters,
			props?: any
		}
	},
	map: {
		name: Maps,
		props?: any,
		contract?: {
			address:  `0x${ string }`,
			abi: {
				type: string,
				name: string,
				inputs: {
					name: string,
					type: string
				}[]
			}[],
			functions: {
				SET_USER: string,
				SET_TIME: string,
				GET_USER: string,
				GET_USERS_PAGINATED: string
			}
		}
	}
}