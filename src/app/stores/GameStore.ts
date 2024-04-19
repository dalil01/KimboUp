import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export enum GameState {
	LOBBY,
	READY,
	STARTED,
	ENDED
}

export type GameStoreState = {
	startTime: number;
	endTime: number;
	state: GameState;
	ready: () => void;
	start: () => void;
	restart: () => void;
	end: () => void;
	characterBody?: undefined | any;
	setCharacterBody: (characterBody: any) => void;
}

export default create(subscribeWithSelector((set) => {

	return {
		startTime: 0,
		endTime: 0,

		state: GameState.LOBBY,

		setCharacterBody: (characterBody: any) => {
			set(() => { return {
				characterBody: characterBody
			} });
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

}));