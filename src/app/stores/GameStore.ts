import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

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
	currentTime?: number;
}

export type GameStoreState = {
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
				set((state) => {
					if (!state.user?.currentTime) {
						return {};
					}

					return {
						user: {
							...state.user,
							time: state.user.currentTime
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
				set((state: any) => {
					return {
						state: GameState.HOME,
					};
				});
			},

			lobby: () => {
				set((state: any) => {
					return {
						state: GameState.LOBBY,
					};
				});
			},

			ready: () => {
				set((state: any) => {
					return {
						state: GameState.READY,
						startTime: 0
					};
				});
			},

			start: () => {
				set((state: any) => {
					return {
						state: GameState.STARTED,
						startTime: Date.now()
					};
				});
			},

			restart: () => {
				set((state: any) => {
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
				set((state: any) => {
					if (state.state === GameState.STARTED) {
						if (document.pointerLockElement) {
							document.exitPointerLock();
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

