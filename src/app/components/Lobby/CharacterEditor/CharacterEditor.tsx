import styles from "./CharacterEditor.module.css";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@/app/components/Icon/Icon";
import { Icons } from "@/app/components/Icon/Icons";
import { CharacterEditorFactory } from "@/app/components/characters/CharacterEditorFactory";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";

export default function CharacterEditor() {

	const currentConfig = GameStore((state: GameStoreState) => state.currentConfig);

	const contentRef = useRef<any>();

	const [displayContent, setDisplayContent] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (contentRef.current && e.target && !(contentRef.current as Node).contains(e.target as Node)) {
				setDisplayContent(false);
			}
		};

		globalThis.addEventListener("click", handleClickOutside);

		return () => {
			globalThis.addEventListener("click", handleClickOutside);
		}
	}, []);

	return (
		<div className={ styles.container }>
			<button className={ styles.button } onClick={ (e) => {
				e.preventDefault();
				e.stopPropagation();
				setDisplayContent(!displayContent)
			} }>
				<Icon name={ Icons.IconHanger } />
			</button>

			{ displayContent &&
				<div ref={ contentRef } className={ styles.content }>
					{ CharacterEditorFactory.create(currentConfig.character.editor.name) }
				</div>
			}
		</div>
	);

}