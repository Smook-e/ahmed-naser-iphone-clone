import React, { use } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils'
import { useState, useEffect } from 'react'

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 768 ? smallHeroVideo : heroVideo);
    useGSAP(() => {
        gsap.to('.hero-title', {opacity: 1, duration: 1.5, ease: 'power1.out', delay: 0.5});
        gsap.to('.buy', {opacity: 1, y: 0, duration: 1.5, ease: 'power1.out', delay: 1.5, stagger: 0.3});
    }, [])

    const handleVideoResize = () =>{
        window.innerWidth < 768 ? setVideoSrc(smallHeroVideo) : setVideoSrc(heroVideo);
    }
    useEffect(() => {

        window.addEventListener('resize', handleVideoResize);
        return () => {
            window.removeEventListener('resize', handleVideoResize);
        }
    }, [ ]);


  return (
    <section className='w-full nav-height bg-black '>
        <div className='md:h-4/6 h-5/6 w-full flex-center flex-col'>
            <p className='hero-title'>
                iPhone 15 pro
            </p>
            <div className='lg:w-9/12 w-7/12'>
                <video className='pointer-events-none' autoPlay loop muted playsInline={true} key={videoSrc}>
                    <source src={videoSrc} type='video/mp4' />
                </video>
            </div>
        </div>
        <div id='cta'  className='flex flex-col items-center '>
            <a href="#highlights" className='btn buy font-bold opacity-0 translate-y-20'>Buy</a>
            <p className='font-normal  text-xl buy opacity-0 translate-y-20'>From $999</p>
        </div>


    </section>
  )
}

export default Hero
