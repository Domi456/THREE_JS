import React from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button";
import { useState } from "react";
import { navLinks } from "../constants";

const About = () => {

    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("domie488@gmail.com");
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false)}, 10000);
    }

    return(
        <section className="sm:px-10 px-5 my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-rows-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="w-full h-full border border-black-300 bg-black-200 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
                        <img src="/assets/huggingface.png" alt="grid-1" className="w-56 sm:h-[276px] h-fit self-center object-contain"/>
                        <div>
                            <p className="text-xl font-semibold mb-2 text-white font-generalsans">Hi, I'm Domi</p>
                            <p className="text-[#afb0b6] text-base font-generalsans">Student with 2 years of experience in the world of IT</p>

                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-3">
                    <div className="w-full h-full border border-black-300 bg-black-200 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
                        <div className="grid grid-cols-3 gap-2">
                            <img src="/assets/csharp.png" alt="grid-2" className="w-full h-auto object-contain bounce-image"/>
                            <img src="/assets/python.png" alt="grid-2" className="w-full h-auto object-contain bounce-image"/>
                            <img src="/assets/js.png" alt="grid-2" className="w-full h-auto object-contain bounce-image"/>
                            <img src="/assets/ollama.png" alt="grid-2" className="w-full h-auto object-contain rounded-2xl bounce-image"/>
                            <img src="/assets/django.png" alt="grid-2" className="w-full h-auto object-contain bounce-image"/>
                            <img src="/assets/react.png" alt="grid-2" className="w-full h-auto object-contain bounce-image"/>
                        </div>
                        <div>
                            <p className="text-xl font-semibold mb-2 text-white font-generalsans">Tech Stack</p>
                            <p className="text-[#afb0b6] text-base font-generalsans">I have experience in C#, Python, and web development. I'm fond of AI and machine learning too 🤖</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-4">
                    <div className="w-full h-full border border-black-300 bg-black-200 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit justify-center items-center">
                            <Globe  height={326} width={326} backgroundColor="rgba(0,0,0,0)" showAtmosphere showGraticules globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg" bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" labelsData={[{lat: 47.497913, lng: 19.040236, text: "I'm here", color: 'white', size: 550}]}/>
                        </div>
                        <div>
                            <p className="text-xl font-semibold mb-2 text-white font-generalsans">I can work across multiple timezones</p>
                            <p className="text-[#afb0b6] text-base font-generalsans">I'm based in Budapest, 🇭🇺</p>
                            <Button href={navLinks[3].href} name="Contact Me" isBeam containerClass="w-full mt-10"/>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="w-full h-full border border-black-300 bg-black-200 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="text-xl font-semibold mb-2 text-white font-generalsans">My passion for coding</p>
                            <p className="text-[#afb0b6] text-base font-generalsans">I love solving problems and building things</p>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="w-full h-full border border-black-300 bg-black-200 rounded-lg sm:p-7 p-4 flex flex-col gap-5">
                        <img src="/assets/grid4.png" alt="grid-4" className="w-full sm:h-[276px] md:h-[126px] h-fit object-cover sm:object-top"/>
                        <div className="space-y-2">
                            <p className="text-[#afb0b6] text-base font-generalsans text-center">Contact me</p>
                            <div className="cursor-pointer flex justify-center items-center gap-2" onClick={handleCopy}>
                                <img src={hasCopied ? '/assets/tick.svg' : 'assets/copy.svg'} alt="copy"/>
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">domie488@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
