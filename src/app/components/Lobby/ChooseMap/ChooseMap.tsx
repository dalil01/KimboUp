import styles from "./ChooseMap.module.css";

import { Maps } from "@/app/components/maps/Maps";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";
import Select from "react-select";

// https://react-select.com/

export function ChooseMap() {

	const { currentConfig, ready } = GameStore((state: GameStoreState) => ({
		currentConfig: state.currentConfig,
		ready: state.ready
	}));

	const customStyles = {
		control: (provided: any) => ({
			...provided,
			width: "max-content",
			fontSize: "1.5rem",
			fontWeight: "600",
			padding: "0.342% 1.3%",
			background: "var(--background-color-2)",
			border: "3px solid var(--text-white)",
			outline: "none",
			borderRadius: "10px",
			cursor: "pointer",
			zIndex: 100,
			boxShadow: "none",
			"&:hover": {
				background: "var(--background-color-1)",
			}
		}),
		singleValue: (base: any) => ({
			...base,
			color: "var(--text-white)",
		}),
		indicator: (base: any) => ({
			...base,
			color: "var(--text-white)"
		}),
		dropdownIndicator: (base: any) => ({
			...base,
			color: "var(--text-white)",
			"&:hover": {
				color: "var(--text-white)"
			}
		}),
		menu: (base: any) => ({
			...base,
			padding: ".1% 3%",
			borderRadius: "5px",
		}),
		menuList: (base: any) => ({
			...base,
			borderRadius: "10px",
		}),
		option: (base: any, { isFocused, isSelected }: any) => {
			return {
				...base,
				fontSize: "1.2rem",
				fontWeight: "600",
				cursor: "pointer",
				outline: "none",
				border: "none",
				color: "var(--text-white)",
				backgroundColor: (isFocused || isSelected) ? "var(--background-color-1)" : "var(--background-color-2)",
				"&:hover": {
					backgroundColor: "var(--background-color-1)"
				}
			};
		}
	};

	const options = Object.entries(Maps).map(([, name]) => {
		return { value: name, label: name };
	});

	return (
		<>
			<Select
				className={ styles.select }
				options={ options }
				styles={ customStyles }
				isOptionSelected={ (option) => currentConfig.map.name == option.value }
				defaultValue={ { value: currentConfig.map.name, label: currentConfig.map.name } }
				isSearchable={ false }
			/>
		</>
	);
}