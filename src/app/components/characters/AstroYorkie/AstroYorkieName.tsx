import { Text } from "@react-three/drei";
import { MutableRefObject, useRef, forwardRef, useImperativeHandle, useState, SetStateAction } from "react";
import { GameStore, GameStoreState, PlayerState } from "@/app/stores/GameStore";
import { MultiPlayer } from "@/app/types/MultiPlayer";
import { useFrame } from "@react-three/fiber";

type AstroYorkieNameProps = {
	playerState: any
}

const AstroYorkieName = forwardRef(function AstroYorkieName({ playerState }: AstroYorkieNameProps, ref: any) {

	const [currentName, setCurrentName] = useState('');

	useFrame(() => {
		if (currentName) {
			return;
		}

		const username = playerState.getState(PlayerState.USERNAME);
		if (playerState.getState(PlayerState.USERNAME) && username != currentName) {
			setCurrentName(username);
		}
	});

	return (
		<>
			{ currentName &&
                <group ref={ ref }>
                    <Text
                        position-y={ 0.3 }
                        fontSize={ 0.06 }
						fontWeight={ 600 }
                        anchorX="center"
                        anchorY="middle"
                    >
						{ currentName }
                        <meshBasicMaterial color="white"/>
                    </Text>
                    <Text
                        position-y={ 0.292 }
                        position-x={ 0.005 }
                        position-z={ -0.01 }
                        fontSize={ 0.06 }
                        fontWeight={ 600 }
                        anchorX="center"
                        anchorY="middle"
                    >
						{ currentName }
                        <meshBasicMaterial color="black"/>
                    </Text>
                </group>
			}


		</>
	)
})

export default AstroYorkieName;