import styles from "./Logo.module.css";

import { ReactSVG } from "react-svg";
import { Files } from "@/app/vars/Files";

export default function Logo() {

	return (
		<ReactSVG
			className={ styles.logo }
			src={ Files.SVGS.LOGO_MAX }
		/>
	);

}