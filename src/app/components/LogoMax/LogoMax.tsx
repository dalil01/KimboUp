import styles from "./LogoMax.module.css";

import { ReactSVG } from "react-svg";

export default function LogoMax() {

	return (
		<ReactSVG
			className={ styles.logo }
			src={ "/svg/logo.svg" }
		/>
	);
}