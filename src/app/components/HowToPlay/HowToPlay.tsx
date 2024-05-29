import styles from "./HowToPlay.module.css";
import React from "react";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";

export default function HowToPlay() {

	return (
		<div className={ styles.container }>
			<h2 className={ styles.title }>
				<span className={ styles.keyboardIcon }><Icon name={ Icons.IconKeyboard } /></span>
				<span>KEYBOARD</span>
			</h2>

			<h3 className={ styles.subTitle }>DISPLACEMENT</h3>

			<div className={ styles.keys }>
				<p><strong>W or Z or ARROW UP :</strong><span>MOVE FORWARD</span></p>
				<p><strong>A or Q or ARROW LEFT :</strong><span>MOVE LEFT</span></p>
				<p><strong>S or ARROW DOWN :</strong><span>MOVE BACKWARD</span></p>
				<p><strong>D or ARROW RIGHT :</strong><span>MOVE RIGHT</span></p>
				<p><strong>SPACE :</strong><span>JUMP</span></p>
			</div>
		</div>
	);
}