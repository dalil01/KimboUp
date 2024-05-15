import styles from "./Settings.module.css";

import GoToBack from "@/app/components/GoToBack/GoToBack";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import Link from "next/link";

export default function Settings() {
	return (
		<div className={ styles.container }>
			<div className={ styles.content }>
				<button className={ styles.item }>
					<Icon name={ Icons.IconVolumeUp } />
					<span>AUDIO</span>
				</button>
				<button className={ styles.item }>
					<Icon name={ Icons.IconInfo } />
					<span>HOW TO PLAY</span>
				</button>
				<Link className={ styles.item } href="/credits">
					<Icon name={ Icons.IconMedia } />
					<span>CREDITS</span>
				</Link>
			</div>
		</div>
	);
}