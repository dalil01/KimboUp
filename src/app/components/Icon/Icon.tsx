import customIconStyles from "./css/icons-custom.module.css";

import React, { JSX } from "react";

type IconProps = {
	name: any,// Icons,
	title?: string,
	className?: string,
	onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export default function Icon(props: IconProps): JSX.Element {

	const { name, title = '', className, onClick } = props;

	return (
		<i title={ title } className={ name + ' ' + customIconStyles.icon1x +  (className ? ' ' + className : '') }
		   onClick={ onClick }
		></i>
	)
}