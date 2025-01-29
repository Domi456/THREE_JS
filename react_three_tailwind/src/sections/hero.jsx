import { PerspectiveCamera } from "@react-three/drei";
import React, { Suspense } from "react";
import HackerRoom from "../components/HackerRoom";
import Target from '../components/Target';
import CanvasLoader from "../components/CanvasLoader";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import {useMediaQuery} from 'react-responsive';
import ReactLogo from "../components/ReactLogo";
import Cube from "../components/Cube";
import Rings from "../components/Rings";
import HeroCamera from "../components/HeroCamera";
import Button from "../components/Button";

const Hero = () => {
    const controls = useControls ('HackerRoom', {
        positionX: {
            value: 1.1,
            min: -10,
            max: 10
        },
        positionY: {
            value: -7.5,
            min: -10,
            max: 10
        },
        positionZ: {
            value: 2.5,
            min: -10,
            max: 10
        },
        rotationX: {
            value: 0,
            min: -10,
            max: 10
        },
        rotationY: {
            value: -3.2,
            min: -10,
            max: 10
        },
        rotationZ: {
            value: 0,
            min: -10,
            max: 10
        },
        scale: {
            value: 0.1,
            min: 0.1,
            max: 1
        }
    })

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const isSmall = useMediaQuery({ query: '(max-width: 440px)' })

    return(
        <section className="min-h-screen w-full flex flex-col relative" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 sm:px-10 px-5 gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">Hi, I'm Domi
                    <span className="waving-hand">👋</span></p>
                <p className="text-center xl:text-6xl md:text-5xl sm:text-4xl text-3xl font-generalsans !leading-normal text-white">
                    Let's look around
                </p>
            </div>
            <div className="w-full h-full absolute inset-0">
            <Leva hidden/>
                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0,0,30]}/>
                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom scale={isMobile ? 0.07 : 0.1}
                            position={[controls.positionX, controls.positionY, controls.positionZ]}
                            rotation={[0,-Math.PI, 0]}/>
                        </HeroCamera>
                        <group>
                            <Target position={[controls.positionX - 13, controls.positionY, controls.positionZ]}/>
                            <ReactLogo position={[controls.positionX + 10, controls.positionY + 13, controls.positionZ]}/>
                            <Cube position={[controls.positionX + 8, controls.positionY + 5, controls.positionZ]}/>
                            <Rings position={[controls.positionX - 22, controls.positionY + 14, controls.positionZ]}/>
                        </group>
                        <ambientLight intensity={1}/>
                        <directionalLight position={[10,10,10]} intensity={0.5}/>
                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute bottom-7 left-0 right-0 w-full z-10 sm:px-10 px-5">
                <a href="#about" className="w-fit">
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96 mx-auto"/>
                </a>
            </div>
        </section>
    )
}

export default Hero
