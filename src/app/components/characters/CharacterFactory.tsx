import { Characters } from "@/app/components/characters/Characters";

import AstroYorkie from "@/app/components/characters/AstroYorkie/AstroYorkie";
import AstroYorkieLobby from "@/app/components/characters/AstroYorkie/AstroYorkieLobby";

export class CharacterFactory {

	public static create(character: Characters, props: any = {}): JSX.Element | null {
		let characterComponent: null | JSX.Element = null;

		switch (character) {
			case Characters.ASTRO_YORKIE:
				characterComponent = <AstroYorkie { ...props } />
				break;
			case Characters.ASTRO_YORKIE_LOBBY:
				characterComponent = <AstroYorkieLobby { ...props } />
				break;
		}

		return characterComponent;
	}

}