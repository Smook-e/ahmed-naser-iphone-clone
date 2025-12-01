import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'

const Highlights = () => {
    useGSAP(() => {
        gsap.to('#title', {opacity: 1, y: 0, duration: 1})
        gsap.to('.link', {opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.5})
    }, [])
  return (
    <section id="highlights" className='w-screen overflow-hidden h-full common-padding bg-zinc '>
        <div className='screen-max-width'>
            <div className='flex  mb-12 w-full justify-between'>
                <h1 id="title" className='section-heading'>
                    Get the Highlight.
                </h1>
                <div className='flex flex-wrap items-center gap-5'>
                    <p className='link text-sm'>
                        Watch the film
                        <img src={watchImg} alt="watch" className='ml-2' />
                    </p>
                    <p className='link text-sm'>
                        Watch the event
                        <img src={rightImg} alt="watch" className='ml-2' />
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Highlights
