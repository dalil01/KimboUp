"use client";

import HowToPlay from "@/app/components/HowToPlay/HowToPlay";
import GoToBack from "@/app/components/GoToBack/GoToBack";
import { Routes } from "@/app/vars/Routes";
import { PageTitle } from "@/app/components/PageTitle/PageTitle";

export default function HowToPlayPage() {

	return (
		<>
			<PageTitle title="HOW TO PLAY" />
			<HowToPlay />
			<GoToBack url={ Routes.SETTINGS + window.location.hash } />
		</>
	);
}