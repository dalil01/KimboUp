import { CharacterControllers } from "@/app/components/characters/CharacterControllers";
import { Maps } from "@/app/components/maps/Maps";
import { CharacterEditors } from "@/app/components/characters/CharacterEditors";
import { Characters } from "@/app/components/characters/Characters";

export type GameConfig = {
	character: {
		main: {
			name: CharacterControllers,
			props?: any
		},
		lobby: {
			name: Characters,
			props?: any
		},
		editor: {
			name: CharacterEditors,
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