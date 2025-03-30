import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../contants";
import { replayImg, pauseImg } from "../utils";

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

    const[loadedData, setLoadedData] = useState({

    })

    const { isEnd, isLastVideo, startPlay, isPlaying, videoId } = video

    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying){
                videoRef.current[videoId].pause()
            } else {
                startPlay && videoRef.current[videoId].play()
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])

    useEffect(() => {
        const currentProgress = 0;
        let span = videoSpanRef.current
        if(span[videoId]){
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {

                },
                onComplete: () => {

                }
            })
        }
    }, [videoId, startPlay])

    return(
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
                            <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                                <video id="video" playsInline={true} preload="auto" muted ref={(el) => (videoRef.current[i] = 
                                el)} 
                                onPlay={() => {setVideo((prevVideo) => ({
                                    ...prevVideo, isPlaying: true
                                }))}}>
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
            <div className="relative flex items-center justify-center mt-10">
                <div className="flex items-center justify-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full w-5 h-5">
                    {videoRef.current.map((_, i) => {
                        <span key={i} ref={(el) => (videoDivRef.current[i] = el)} 
                        className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                            <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)} />
                        </span>
                    })}
                </div>
                <button className="ml-4 p-4 rounded-full bg-gray-300 backdrop-blur flex items-center justify-center w-5 h-5">
                    <img src={isLastVideo ? replayImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
                    onClick={isLastVideo ? () => handleProcess('video-reset') : !isPlaying 
                    ? () => handleProcess('play') 
                    : () => handleProcess('pause')}/>
                </button>
            </div>
        </>
    )
}

export default VideoCarosul