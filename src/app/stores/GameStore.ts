import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameConfig } from "@/app/types/GameConfig";
import { User } from "@/app/types/User";
import { CharacterControllers } from "@/app/components/characters/CharacterControllers";
import { Maps } from "@/app/components/maps/Maps";
import { CarCityConfig } from "@/app/blockchain/config/CarCity.config";
import { CharacterEditors } from "@/app/components/characters/CharacterEditors";
import { MultiPlayer } from "@/app/types/MultiPlayer";
import { Characters } from "@/app/components/characters/Characters";

export enum GameState {
	HOME,
	LOBBY,
	READY,
	STARTED,
	ENDED,
	ENDED_ALL
}

export enum PlayerState {
	BODY_NAME = "bodyName",
	USERNAME = "username",
	FINISHED = "finished",
	POSITION = "pos",
	ROTATION = "rot",
	TIME = "time",
}

export type GameStoreState = {
	currentConfig: GameConfig;
	user?: User;
	setUser: (user: User) => void;
	autoSetTimeAsCurrentTime: () => void;
	players: MultiPlayer[];
	setPlayers: (callback: (players: MultiPlayer[]) => any[]) => void;
	characterBody?: undefined | any;
	setCharacterBody: (characterBody: any) => void;
	startTime: number;
	endTime: number;
	state: GameState;
	home: () => void;
	lobby: () => void;
	ready: () => void;
	start: () => void;
	restart: () => void;
	end: () => void;
	endAll: () => void;
}

export const GameStore = create<GameStoreState>()(
	subscribeWithSelector((set) => {
		return {
			currentConfig: {
				character: {
					main: {
						name: CharacterControllers.ASTRO_YORKIE
					},
					lobby: {
						name: Characters.ASTRO_YORKIE
					},
					editor: {
						name: CharacterEditors.ASTRO_YORKIE_EDITOR
					}
				},
				map: {
					name: Maps.CAR_CITY,
					contract: {
						address: CarCityConfig.ADDRESS,
						abi: CarCityConfig.ABI,
						functions: CarCityConfig.FUNCTIONS
					}
				}
			},

			startTime: 0,
			endTime: 0,

			state: GameState.HOME,

			players: [],

			setUser: (user: User) => {
				set(() => {
					return {
						user: user
					};
				});
			},

			autoSetTimeAsCurrentTime: () => {
				set((state: GameStoreState) => {
					if (!state.user?.currentTime) {
						return {};
					}

					const time = (!state.user.time || state.user.currentTime < state.user.time) ? state.user.currentTime : state.user.time;

					return {
						user: {
							...state.user,
							time
						}
					};
				});
			},

			setCharacterBody: (characterBody: any) => {
				set(() => {
					return {
						characterBody: characterBody
					};
				});
			},

			home: () => {
				set(() => {
					return {
						state: GameState.HOME,
					};
				});
			},

			lobby: () => {
				set(() => {
					return {
						state: GameState.LOBBY,
					};
				});
			},

			ready: () => {
				set(() => {
					return {
						state: GameState.READY,
						startTime: 0
					};
				});
			},

			start: () => {
				set(() => {
					return {
						state: GameState.STARTED,
						startTime: Date.now()
					};
				});
			},

			restart: () => {
				set((state: GameStoreState) => {
					if (state.characterBody) {
						const [x, y, z] = [0, 0, 0];
						const body = state.characterBody;
						body.setTranslation({ x, y, z });
						body.setLinvel({ x, y, z });
						body.setAngvel({ x, y, z });
						body.setRotation([0, 0, 0, 1])
					}

					return {
						state: GameState.READY
					};
				});
			},

			end: () => {
				set((state: GameStoreState) => {
					if (state.state === GameState.STARTED) {
						if (document.pointerLockElement) {
							document.exitPointerLock();
						}

						if (!state.user) {
							return {};
						}

						const endTime = Date.now();
						const time = endTime - state.startTime;

						return {
							state: GameState.ENDED,
							endTime: endTime,
							user: {
								...state.user,
								currentTime: time
							}
						};
					}

					return {};
				});
			},


			endAll: () => {
				set((state: GameStoreState) => {
					return {
						state: GameState.ENDED_ALL
					}
				});
			},

			setPlayers: (callback) => {
				set((state) => {
					const players = callback(state.players);
					return {
						players
					}
				});
			}
		};
	})
);

