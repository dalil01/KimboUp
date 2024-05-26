import { Characters } from "@/app/components/characters/Characters";
import AstroYorkie from "@/app/components/characters/AstroYorkie/AstroYorkie";

export class CharacterFactory {

	public static create(characterLobby: Characters, props: any = {}): JSX.Element | null {
		let characterComponent: null | JSX.Element = null;

		switch (characterLobby) {
			case Characters.ASTRO_YORKIE:
				characterComponent = <AstroYorkie { ...props } />
				break;
		}

		return characterComponent;
	}

}