"use client";

import { Credits } from "@/app/components/Credits/Credits";
import GoToBack from "@/app/components/GoToBack/GoToBack";
import { Routes } from "@/app/vars/Routes";
import { PageTitle } from "@/app/components/PageTitle/PageTitle";

export default function CreditsPage() {
	return (
		<>
			<PageTitle title="CREDITS" />
			<Credits />
			<GoToBack url={ Routes.SETTINGS + window.location.hash } />
		</>
	)
}