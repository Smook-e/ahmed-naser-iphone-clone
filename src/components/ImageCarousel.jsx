import React from 'react'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useGSAP } from '@gsap/react'

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg } from "../utils";
const Imagecarousel = () => {
    
    const progressRef = useRef([]);
    const progressTween = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);


    useEffect(() => {
        if (isPaused) {
            progressTween.current?.pause();
            videoRef.current[currentIndex]?.pause();
        } else {
            progressTween.current?.play();
            videoRef.current[currentIndex]?.play();
        }
    }
        , [isPaused, currentIndex]);
    const [loadedData, setLoadedData] = useState([]);

    const videoRef = useRef([]);
    useGSAP(() => {
        gsap.to('.slider', {
            transform: `translateX(${-100 * currentIndex}%)`,
            duration: 1,
            ease: "power2.inOut",
        })
        gsap.to('.slider', {
            scrollTrigger: {
                trigger: '.slider',
                start: 'top 80%',
            },
            onComplete: () => {
                setIsPaused(false);
            }
        })
    }, [currentIndex]);
    useGSAP(() => {
        gsap.killTweensOf(progressRef.current);

        // Reset all dots to 0%
        gsap.set(progressRef.current, { width: "0%" });
        progressTween.current = gsap.to(progressRef.current[currentIndex],
            
            {
                width: "100%", duration: hightlightsSlides[currentIndex].videoDuration, ease: "none", paused: false, onComplete: () => {
                    setCurrentIndex(prev => (prev + 1) % hightlightsSlides.length);
                }
            }
        );
        // Reset all others

    }, [currentIndex]);
    useEffect(() => {
        if (loadedData.length > 3) {

            videoRef.current[currentIndex].play();

        }
    }, [loadedData, currentIndex]);
    const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);
    return (
        <>

            <div className='flex items-center mt-10 max-w-full ' onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                {hightlightsSlides.map((item, index) => (
                    <div key={index} className='pr-10 slider max-w-full'>
                        <div className='video-carousel_container relative max-w-full'>

                            <div className=" aspect-video h-full w-full rounded-3xl bg-black  flex items-center overflow-hidden justify-center ">
                                <video
                                    id="video"
                                    playsInline={true}
                                    className={`pointer-events-none `}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[index] = el)}

                                    onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                                >
                                    <source src={item.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute md:top-12 top-2 left-[5%] z-10">
                                {item.textLists.map((text, i) => (
                                    <p key={i} className="md:text-xl text-sm font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>


                    </div>
                ))}

            </div>

            <div className='flex flex-center relative mt-6'>

                <div className='flex justify-center items-center gap-5  bg-gray-100 rounded-full p-4 '>
                    {hightlightsSlides.map((_, index) => (
                        <div
                            key={index}
                            className={`relative ${index === currentIndex ? 'w-[10vh]' : 'w-4'}  transition-all duration-500 h-4 rounded-full ${index === currentIndex ? 'bg-gray-400' : 'bg-gray-300'} overflow-hidden cursor-pointer`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <div
                                ref={el => progressRef.current[index] = el}
                                className="absolute h-full left-0 rounded-full bg-gray-800 w-0"

                            />
                        </div>
                    ))}
                </div>
                <div className='flex-center'>

                    <button className='w-12 h-12 rounded-full bg-gray-300 ml-6 flex-center' onClick={() => setIsPaused(prev => !prev)}>
                        <img src={`${isPaused ? playImg : pauseImg}`} alt="" />
                    </button>
                </div>
            </div>





        </>
    )
}



export default Imagecarousel