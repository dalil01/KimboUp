import styles from "./GoToBack.module.css";
import Link from "next/link";

type GoToBackProps = {
	url: string;
}

export default function GoToBack(props: GoToBackProps) {

	const {
		url = '/'
	} = props;

	return (
		<Link className={ styles.container } href={ url }>BACK</Link>
	);
}