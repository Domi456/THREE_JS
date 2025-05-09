import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const SpinningObj = () => {
    const boxRef = useRef();
    useFrame(() => {
        if(boxRef.current){
            boxRef.current.rotation.x += 0.01;
            boxRef.current.rotation.y += 0.01;
        }
    });

    return(
        <mesh ref={boxRef} position={[0,0,0]}>
            <torusGeometry args={[2, 0.8, 16, 100]}/>
            <meshPhysicalMaterial color="rgb(68, 15, 184)"/>
        </mesh>
    )
}

const Footer = () => {

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const handleClick = (e) => {
        if (isMobile) {
            e.preventDefault();
        }
    };

    return(
        <section className="sm:px-10 px-5 pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black-300 border border-black-200">
                    <a href="https://github.com/Domi456" target="_blank"><img src="/assets/github.svg" title="More stuff" alt="github" className="w-1/2 h-1/2"/></a>
                </div>
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black-300 border border-black-200">
                    <a href="https://www.instagram.com/domi_._ka/" target="_blank"><img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2"/></a>
                </div>
            </div>
            <div className="flex-gap-3">
                <a href="/hiddenGame/index.html" className={`lg:block ${isMobile ? 'pointer-events-none opacity-50 cursor-default' : 'cursor-default'}`} onClick={handleClick}><div className="w-20 h-20 rounded-full flex justify-center items-center bg-black-300 border border-black-200">
                    <Canvas>
                        <ambientLight intensity={2}/>
                        <directionalLight position={[10,10,5]}/>
                        <SpinningObj/>
                    </Canvas>
                </div></a>
            </div>
            <p className="text-white">©2025 | Domi456</p>
        </section>
    )
}

export default Footer;
