import { Credits } from "@/app/components/Credits/Credits";
import GoToBack from "@/app/components/GoToBack/GoToBack";

export default function CreditsPage() {
	return (
		<>
			<Credits />
			<GoToBack url="/settings" />
		</>
	)
}