import { CharacterControllers } from "@/app/components/characters/CharacterControllers";

import AstroYorkieController from "@/app/components/characters/AstroYorkie/AstroYorkieController";

export class CharacterControllerFactory {

	public static create(characterController: CharacterControllers, props: any = {}): JSX.Element | null {
		let characterComponent: null | JSX.Element = null;

		switch (characterController) {
			case CharacterControllers.ASTRO_YORKIE:
				characterComponent = <AstroYorkieController { ...props } />
				break;
		}

		return characterComponent;
	}

}