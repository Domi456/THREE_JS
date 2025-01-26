import React from "react";
import { clientReviews } from "../constants/index.js";

const Clients = () => {
    return(
        <section className="sm:px-10 px-5">
            <h3 className="sm:text-4xl text-3xl font-semibold text-white">Hear from my clients</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-12">
                {clientReviews.map(({id, name, review, img, position}) => (
                    <div key={id} className="rounded-lg md:p-10 p-5 col-span-1 bg-black-300 bg-opacity-50">
                        <div>
                            <p className="text-white">{review}</p>
                        </div>
                        <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-5 mt-7">
                            <div className="flex gap-3">
                                <img src={img} alt={name} className="w-12 h-12 rounded-full"/>
                                <div className="flex flex-col">
                                    <p className="text-white font-semibold">{name}</p>
                                    <p className="text-white md:text-base text-sm">{position}</p>
                                </div>
                            </div>
                            <div className="flex self-end items-center gap-2">
                                {Array.from({length: 5}).map((_, index) => (
                                    <img key={index} src="/assets/star.png" alt="5-star" className="w-5 h-5"/>
                                ))};
                            </div>
                        </div>
                    </div>
                ))};
            </div>
        </section>
    )
}

export default Clients;
