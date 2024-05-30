import { Text } from "@react-three/drei";
import { MutableRefObject, useRef, forwardRef } from "react";
import { GameStore, GameStoreState } from "@/app/stores/GameStore";

type AstroYorkieNameProps = {
}

const AstroYorkieName = forwardRef(function AstroYorkieName({ }: AstroYorkieNameProps, ref: any) {

	const { user } = GameStore((state: GameStoreState) => ({
		user: state.user,
	}));

	return (
		<>
			{ user?.username &&
                <group ref={ ref }>
                    <Text
                        position-y={ 0.3 }
                        fontSize={ 0.06 }
						fontWeight={ 600 }
                        anchorX="center"
                        anchorY="middle"
                    >
						{ user.username }
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
						{ user.username }
                        <meshBasicMaterial color="black"/>
                    </Text>
                </group>
			}


		</>
	)
})

export default AstroYorkieName;