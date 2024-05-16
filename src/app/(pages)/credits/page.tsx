import { Credits } from "@/app/components/Credits/Credits";
import GoToBack from "@/app/components/GoToBack/GoToBack";
import { Routes } from "@/app/vars/Routes";

export default function CreditsPage() {
	return (
		<>
			<Credits />
			<GoToBack url={ Routes.SETTINGS } />
		</>
	)
}