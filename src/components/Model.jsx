import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect } from 'react'
import ModelView from './ModelView'
import { useState, useRef } from 'react'
import { yellowImg } from '../utils'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models } from '../constants'
import { sizes } from '../constants'
import { animateWithGsap } from '../constants/animations'
const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: "iPhone 15 Pro",
        color: ['#8f8a81', '#FFE7B9', '#E5E5E5'],
        img: yellowImg,
    });
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    const tl = gsap.timeline();

    useEffect(() => {

        if (size === 'large') {
            animateWithGsap(tl, small, smallRotation, '#view1', '#view2', {
                transform: 'translateX(-100%)',
                duration: 1
            })
        }
        if (size === 'small') {
            animateWithGsap(tl, large, largeRotation, '#view2', '#view1', {
                transform: 'translateX(0%)',
                duration: 1
            })
        }

    }, [size])









    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '#heading',
            }
        })
    }, [])
    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a Closer look.
                </h1>
            </div>
            <div className="flex flex-col items-center overflow-hidden mt-5">
                <div className="w-full h-[60vh] overflow-hidden relative md:h-[90vh] **overflow-x-hidden**">
                    <ModelView
                        index={1}
                        groupRef={small}
                        gsapType="view1"
                        controlRef={cameraControlSmall}
                        setRotationState={setSmallRotation}
                        item={model}
                        size={size}
                    />
                    <ModelView
                        index={2}
                        groupRef={large}
                        gsapType="view2"
                        controlRef={cameraControlLarge}
                        setRotationState={setLargeRotation}
                        item={model}
                        size={size}
                    />
                    <Canvas
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100vh',          // or '100%' if inside a full-height parent
                            overflow: 'hidden',
                            pointerEvents: 'none',    // scroll passes through to HTML
                                  // behind content if needed
                            touchAction: 'none',
                        }}
                        // Let it update on scroll but calm it down to reduce jitter
                        resize={{ debounce: { scroll: 50, resize: 0 } }}  // or try without resize prop
                        gl={{ antialias: true }}
                        dpr={[1, 1.5]}
                    // eventSource={document.getElementById('root')}  // ← remove temporarily to test
                    >
                        <View.Port />
                    </Canvas>
                </div>
                <div className='mx-auto w-full'>
                    <p className='text-sm font-light text-center mb-3'> {model.title}</p>

                    <div className='flex-center'>
                        <ul className='color-container'>
                            {models.map((item, i) => (
                                <li key={i} style={
                                    { backgroundColor: item.color[0] }
                                } className={`w-6 h-6 rounded-full mx-2 cursor-pointer ${item == model ? ' ring-2 border-2 border-black' : ''}`} onClick={() => setModel(item)}>

                                </li>
                            ))}
                        </ul>
                        <button className='size-btn-container'>
                            {sizes.map((item, i) => (
                                <span key={item.label} style={{
                                    color: size != item.value ? 'white' : 'black',
                                    backgroundColor: size == item.value ? 'white' : 'transparent',
                                }} className={` rounded-full  p-2  cursor-pointer transition-all duration-300 `} onClick={() => setSize(item.value)}>
                                    {item.label}
                                </span>
                            ))}
                        </button>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model