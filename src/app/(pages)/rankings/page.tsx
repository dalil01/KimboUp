import Rankings from "@/app/components/Rankings/Rankings";
import GoToBack from "@/app/components/GoToBack/GoToBack";
import { PageTitle } from "@/app/components/PageTitle/PageTitle";
import { Routes } from "@/app/vars/Routes";

export default function RankingsPage() {
	return (
		<>
			<PageTitle title="RANKINGS" />
			<Rankings/>
			<GoToBack />
		</>
	);
}