import styles from "./Editor.module.css";

import React, { useRef } from "react";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";

export default function Editor() {

	return (
		<div className={ styles.container }>
			<Icon name={ Icons.IconEdit } />
		</div>
	);

}