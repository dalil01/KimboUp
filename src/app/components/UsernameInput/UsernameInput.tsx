import styles from "./UsernameInput.module.css";
import { useState } from "react";
import { GameState, GameStore, GameStoreState, User } from "@/app/stores/GameStore";

export default function UsernameInput() {

	const user: undefined | User = GameStore((state: GameStoreState) => state.user);
	const setUser = GameStore((state: GameStoreState) => state.setUser);

	const [loading, setLoading] = useState(false);

	return (
		<div className={ styles.container }>
			<input
				className={ styles.input }
				type="text"
				placeholder="Username*"
				defaultValue={ user?.username || '' }
				onChange={
					(e) => {
						let newUser: any = {};

						if (user) {
							newUser = { user };
						}

						newUser.username = e.target.value;

						setUser(newUser);
				   }
				}
			/>
		</div>
	);
}