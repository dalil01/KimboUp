import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

export enum GameState {
	HOME,
	LOBBY,
	READY,
	STARTED,
	ENDED
}

export type User = {
	address: string;
	contractUsername: string;
	username: string;
	time: number;
}

export type GameStoreState = {
	user?: User;
	setUser: (user: User) => void;
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
			startTime: 0,
			endTime: 0,

			state: GameState.LOBBY,

			setUser: (user: User) => {
				set(() => {
					return {
						user: user
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
				set((state: any) => {
					return {
						state: GameState.HOME,
					};
				});
			},

			lobby: () => {
				set((state: any) => {
					if (state.state === GameState.HOME || state.state == GameState.ENDED) {
						return {
							state: GameState.LOBBY,
						};
					}

					return {};
				});
			},

			ready: () => {
				set((state: any) => {
					if (state.state === GameState.LOBBY) {
						return {
							state: GameState.READY,
						};
					}

					return {};
				});
			},

			start: () => {
				set((state: any) => {
					if (state.state === GameState.READY) {
						return {
							state: GameState.STARTED,
							startTime: Date.now()
						};
					}

					return {};
				});
			},

			restart: () => {
				set((state: any) => {
					if (state.state !== GameState.LOBBY) {
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
					}

					return {};
				});
			},

			end: () => {
				set((state: any) => {
					if (state.state === GameState.STARTED) {
						if (document.pointerLockElement) {
							document.exitPointerLock();
						}

						return {
							state: GameState.ENDED,
							endTime: Date.now()
						};
					}

					return {};
				});
			}
		};

	})
);

