import { Maps } from "@/app/components/maps/Maps";

import CarCity from "@/app/components/maps/CarCity/CarCity";

export class MapFactory {

	public static create(map: Maps, props: any = {}): JSX.Element | null {
		let mapComponent: null | JSX.Element = null;

		switch (map) {
			case Maps.CAR_CITY:
				mapComponent = <CarCity { ...props } />
				break;
		}

		return mapComponent;
	}

}