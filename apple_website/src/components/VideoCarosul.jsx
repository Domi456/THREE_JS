import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../contants";

const VideoCarosul = () => {
    const videoRef = useRef([])
    const videoSpanRef = useRef([])
    const videoDivRef = useRef([])
    
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        isLastVideo: false,
        isPlaying: false,
        videoId: 0
    })

    const { isEnd, isLastVideo, startPlay, isPlaying, videoId } = video

    useEffect(() => {
        const currentProgress = 0;
        let span = videoSpanRef.current
        if(span[videoId]){
            let anim = gsap.to(span[videoId], {
                
            })
        }
    }, [videoId, startPlay])

    return(
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video id="video" playsInline={true} preload="auto" muted>
                                    <source src={list.video} type="video/mp4"/>
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text) => (
                                    <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default VideoCarosul