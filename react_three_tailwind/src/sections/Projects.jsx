import React, { Suspense, useState } from "react";
import { myProjects } from "../constants";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader";
import DemoComputer from "../components/DemoComputer";

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const currentProject = myProjects[selectedProjectIndex];

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if(direction === 'previous') {
                return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1;
            }else{
                return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1;
            }
        })
    }

    return(
        <section className="sm:px-10 px-5 my-20" id="work">
            <p className="sm:text-4xl text-3xl font-semibold text-gray_gradient">My work</p>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mt-12 w-full">
                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
                    <div className="absolute top-0 right-0">
                        <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl"/>
                        {/* change the myProjects */}
                    </div>
                    <div className="p-3 backdrop-filter backdrop-blur-3xl rounded-lg" style={currentProject.logoStyle}>
                        <img src={currentProject.logo} alt="logo" className="w-10 h-10 shadow-sm"/>
                    </div>
                    <div className="flex flex-col gap-5 text-white-600 my-5">
                        <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
                        <p className="text-white animatedText">{currentProject.desc}</p>
                        <p className=" text-white animatedText">{currentProject.subdesc}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className="w-10 h-10 rounded-md p-2 bg-neutral-100 bg-opacity-10 backdrop-filter backdrop-blur-lg flex justify-center items-center">
                                    <img src={tag.path} alt={tag.name}/>
                                </div>
                            ))}
                        </div>
                        <a className="flex items-center gap-2 cursor-pointer text-white-600" href={currentProject.href} target="_blank" rel="noreferrer">
                            <p className="text-white">{ currentProject.href ? 'Check live site' : '' }</p>
                            { currentProject.href ? <img src="/assets/arrow-up.png" className="w-3 h-3" alt="arrow"/> : ''}
                        </a>
                    </div>
                    <div className="flex justify-between items-center mt-7">
                        <button className="w-10 h-10 p-3 cursor-pointer active:scale-95 transition-all rounded-full arrow-gradient" onClick={() => handleNavigation('previous')}>
                            <img src="/assets/left-arrow.png" alt="left" className="w-4 h-4"/>
                        </button>
                        <button className="w-10 h-10 p-3 cursor-pointer active:scale-95 transition-all rounded-full arrow-gradient" onClick={() => handleNavigation('next')}>
                            <img src="/assets/right-arrow.png" alt="right" className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
                <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                    <Canvas>
                        <ambientLight intensity={3} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader/>}>
                                <group scale={2} position={[0,-3,0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer texture={currentProject.texture}/>
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI/2} enableZoom={false}/>
                    </Canvas>
                </div>
            </div>
        </section>
    )
}

export default Projects;
