import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { AmbientLight, DirectionalLightHelper } from "three";

export default function CarCityLights()
{

    const directionalLightRef = useRef<any>();
    const ambientLightRef = useRef<any>();

    /*
    useHelper(directionalLightRef, DirectionalLightHelper, 1, "red")

     */

    useFrame((state) => {
       // const directionalLight = directionalLightRef.current;

        //directionalLight.position.z = state.camera.position.z + 1 - 4;
        //directionalLight.target.position.z = state.camera.position.z - 4;
        //directionalLight.target.updateMatrixWorld();
    });

    /*
    {x: -50.01984786987305, y: 22.94029998779297, z: 87.03223419189453}
     */

    return <>
        <directionalLight
            ref={ directionalLightRef }
            castShadow
            position={ [ 15, 15, 1 ] }
            intensity={ 5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 10 }
            shadow-camera-top={ 10 }
            shadow-camera-right={ 10 }
            shadow-camera-bottom={ - 10 }
            shadow-camera-left={ - 10 }
        />
        <pointLight/>
        <ambientLight
            ref={ ambientLightRef }
            intensity={ 1.5 }
        />
    </>
}