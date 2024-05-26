import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { Files } from "@/app/vars/Files";
import { SkeletonUtils } from "three-stdlib";

type AstroYorkieProps = {
	position?: [number, number, number];
	scale?: number;
	lights?: boolean;
}

export default function AstroYorkie(props: AstroYorkieProps) {

	const {
		position = [0, 0, 0],
		scale = 1,
		lights = true,
	} = props;

	const { scene, materials, animations } = useGLTF(Files.MODELS.ASTRO_YORKIE, Files.DRACO.GLTF);

	const sceneClone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	//const { nodes } = useGraph(sceneClone);

	return (
		<group position={ position }>
			<primitive
				object={ sceneClone }
				scale={ scale }
				castShadow={ true }
				receiveShadow={ true }
			/>
			{

				lights &&
                <>

                    <directionalLight
                        castShadow
                        position={ [15, 15, 1] }
                        intensity={ 5 }
                        shadow-mapSize={ [1024, 1024] }
                        shadow-camera-near={ 1 }
                        shadow-camera-far={ 10 }
                        shadow-camera-top={ 10 }
                        shadow-camera-right={ 10 }
                        shadow-camera-bottom={ -10 }
                        shadow-camera-left={ -10 }
                    />
                    <pointLight/>
                    <ambientLight
                        intensity={ 1.5 }
                    />
                </>
			}
		</group>
	)
}