import React from "react";

const Footer = () => {
    return(
        <section className="sm:px-10 px-5 pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black-300 border border-black-200">
                    <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2"/>
                </div>
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black-300 border border-black-200">
                    <img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2"/>
                </div>
            </div>
            <p className="text-white">©2025 | DomiDev</p>
        </section>
    )
}

export default Footer;
