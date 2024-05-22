import { CharacterEditors } from "@/app/components/characters/CharacterEditors";
import AstroYorkieEditor from "@/app/components/characters/AstroYorkie/AstroYorkieEditor/AstroYorkieEditor";

export class CharacterEditorFactory {

	public static create(characterEditor: CharacterEditors, props: any = {}): JSX.Element | null {
		let characterEditorComponent: null | JSX.Element = null;

		switch (characterEditor) {
			case CharacterEditors.ASTRO_YORKIE_EDITOR:
				characterEditorComponent = <AstroYorkieEditor { ...props } />
				break;
		}

		return characterEditorComponent;
	}

}