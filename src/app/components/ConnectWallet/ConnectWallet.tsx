import styles from "./ConnectWallet.module.css";
import { useState } from "react";

export default function ConnectWallet() {

	const [loading, setLoading] = useState(false);

	return (

		<button
			className={ styles.button }
			onClick={ () => {

			} }
		>
			ConnectWallet
		</button>
	);
}