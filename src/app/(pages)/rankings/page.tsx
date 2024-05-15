"use client";

import Rankings from "@/app/components/Rankings/Rankings";
import GoToBack from "@/app/components/GoToBack/GoToBack";
import { PageTitle } from "@/app/components/PageTitle/PageTitle";

export default function RankingsPage() {
	return (
		<>
			<PageTitle title="Rankings" />
			<Rankings/>
			<GoToBack url="/" />
		</>
	);
}