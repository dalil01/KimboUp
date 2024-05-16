import HowToPlay from "@/app/components/HowToPlay/HowToPlay";
import GoToBack from "@/app/components/GoToBack/GoToBack";
import { Routes } from "@/app/vars/Routes";

export default function HowToPlayPage() {

	return (
		<>
			<HowToPlay />
			<GoToBack url={ Routes.SETTINGS } />
		</>
	);
}