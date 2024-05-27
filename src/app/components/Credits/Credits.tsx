import styles from "./Credits.module.css";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";

export function Credits() {
	return (
		<div className={ styles.container }>
			<div className={ styles.mainContent }>
				<div className={ styles.block }>
					<h2 className={ styles.title }>DEVELOPER</h2>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>DALIL CHABLIS</h2>
						<a className={ styles.link } href="https://dalilchablis.com/" target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
				</div>

				<div className={ styles.block }>
					<h2 className={ styles.title }>BLOCKCHAIN ARCHITECT</h2>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>PEDRO MACHADO</h2>
						<a className={ styles.link } href="https://www.linkedin.com/in/machadopedro/" target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
				</div>

				<div className={ styles.block }>
					<h2 className={ styles.title }>DESIGNER UX/UI</h2>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>LAURINE CHERY</h2>
						<a className={ styles.link } href="https://www.linkedin.com/in/laurine-chery/" target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
				</div>
			</div>

			<div className={ styles.others }>
				<div className={ styles.block }>
					<h2 className={ styles.title }>3D DESIGNERS</h2>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>RAPHAEL GONÇALVES</h2>
						<a className={ styles.link } href="https://www.cgtrader.com/designers/rgsdev"
						   target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>AREALITY</h2>
						<a className={ styles.link } href="https://www.cgtrader.com/designers/Areality"
						   target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>CHAMOD1999</h2>
						<a className={ styles.link } href="https://www.cgtrader.com/designers/chamod1999"
						   target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
				</div>

				<div className={ styles.block }>
					<h2 className={ styles.title }>AUDIO</h2>
					<div className={ styles.blockContent }>
						<h2 className={ styles.name }>NAGATOYO NAKASONE</h2>
						<a className={ styles.link } href="https://pixabay.com/fr/users/ai-seven-bgm-23012428/"
						   target="_blank">
							<Icon name={ Icons.IconLinkExternal }/>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}