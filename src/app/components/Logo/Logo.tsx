import styles from "./Logo.module.css";

import { ReactSVG } from "react-svg";

export default function Logo() {

	return (
		<ReactSVG
			className={ styles.logo }
			src={ "/svg/logo.svg" }
		/>
	);
}