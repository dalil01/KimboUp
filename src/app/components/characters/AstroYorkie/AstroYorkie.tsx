import { Cylinder, useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo } from "react";
import { Files } from "@/app/vars/Files";
import { SkeletonUtils } from "three-stdlib";
import { MeshStandardMaterial } from "three";

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

	/*useEffect(() => {
		sceneClone.traverse((child: any) => {
			if (child.isMesh) {
				child.material = new MeshStandardMaterial({
					color: "orange",
					metalness: 0.7,
					roughness: 0.2,
				});
			}
		});
	}, [sceneClone]);
	 */

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