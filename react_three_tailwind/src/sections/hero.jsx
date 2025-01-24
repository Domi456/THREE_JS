import { PerspectiveCamera } from "@react-three/drei";
import React, { Suspense } from "react";
import HackerRoom from "../components/HackerRoom";
//import { AmbientLight, DirectionalLight } from "three";
import CanvasLoader from "../components/CanvasLoader";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";

const Hero = () => {
    const controls = useControls ('HackerRoom', {
        positionX: {
            value: 2.5,
            min: -10,
            max: 10
        },
        positionY: {
            value: 2.5,
            min: -10,
            max: 10
        },
        positionZ: {
            value: 2.5,
            min: -10,
            max: 10
        }
    })

    return(
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 sm:px-10 px-5 gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">Hi, I'm Domi
                    <span className="waving-hand">👋</span></p>
                <p className="text-center xl:text-6xl md:text-5xl sm:text-4xl text-3xl font-generalsans !leading-normal text-white">
                    This is a text
                </p>
            </div>
            <div className="w-full h-full absolute inset-0">
            <Leva/>
            <Canvas className="w-full h-full">
                <Suspense fallback={<CanvasLoader/>}>
                    <PerspectiveCamera makeDefault position={[0,0,30]}/>
                    <HackerRoom scale={[controls.positionX, controls.positionY, controls.positionZ]} position={[0,-4,0]} rotation={[0, 280,0]}/>
                    <ambientLight intensity={1}/>
                    <directionalLight position={[10,10,10]} intensity={0.5}/>
                </Suspense>
            </Canvas>
            </div>
        </section>
    )
}

export default Hero
