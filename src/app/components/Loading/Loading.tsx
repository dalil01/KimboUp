import styles from "./Loading.module.css";

import { Html, useProgress } from "@react-three/drei";

import React from "react";

export default function Loading() {
	const { progress } = useProgress();
	return <Html style={
		{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			zIndex: 1000
		}
	} center>
		<p className={ styles.loading }>LOADING...&nbsp;({ progress }%)</p>
	</Html>
}