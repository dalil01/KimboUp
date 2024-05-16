import styles from "./Loading.module.css";

import { Html, useProgress } from "@react-three/drei";

import React from "react";

export default function Loading() {
	const { progress } = useProgress();
	return <Html className={ styles.container } center>{progress} % loaded</Html>
}