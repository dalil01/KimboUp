import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameConfig } from "@/app/types/GameConfig";
import { User } from "@/app/types/User";
import { Characters } from "@/app/components/characters/Characters";
import { Maps } from "@/app/components/maps/Maps";
import { CarCityConfig } from "@/app/blockchain/config/CarCity.config";

export enum GameState {
	HOME,
	LOBBY,
	READY,
	STARTED,
	ENDED
}

export type GameStoreState = {
	currentConfig: GameConfig;
	user?: User;
	setUser: (user: User) => void;
	autoSetTimeAsCurrentTime: () => void;
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
}

export const GameStore = create<GameStoreState>()(
	subscribeWithSelector((set) => {
		return {
			currentConfig: {
				character: {
					main: {
						name: Characters.ASTRO_YORKIE,
					},
					lobby: {
						name: Characters.ASTRO_YORKIE_LOBBY
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
			}
		};

	})
);

