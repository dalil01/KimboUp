import styles from "./PageTitle.module.css";

type PageTitleProps = {
	title: string;
}

export function PageTitle(props: PageTitleProps) {

	return (
		<div className={ styles.container }>
			<h2 className={ styles.title }>{ props.title }</h2>
		</div>
	);
}