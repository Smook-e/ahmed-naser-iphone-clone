import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useState, useRef, Suspense } from 'react'
import { yellowImg } from '../utils'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { View, Preload, AdaptiveDpr } from '@react-three/drei'
import { models, sizes } from '../constants'
import { animateWithGsap } from '../constants/animations'

// ✅ FIX 1: Lazy-load ModelView so Three.js doesn't block initial page render
const ModelView = React.lazy(() => import('./ModelView'))

const Model = () => {
    const [size, setSize] = useState('small')
    const [model, setModel] = useState({
        title: "iPhone 15 Pro",
        color: ['#8f8a81', '#FFE7B9', '#E5E5E5'],
        img: yellowImg,
    })

    // ✅ FIX 2: Don't initialize the Canvas until the section is visible
    // This is the biggest mobile win — Three.js is heavy on CPU startup
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect() // Only trigger once
                }
            },
            { threshold: 0.1 } // Trigger when 10% of section is visible
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const cameraControlSmall = useRef()
    const cameraControlLarge = useRef()

    const [smallRotation, setSmallRotation] = useState(0)
    const [largeRotation, setLargeRotation] = useState(0)

    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    // ✅ FIX 3: Move tl inside useEffect — creating it at render level
    // means a new timeline is created on every render, causing memory leaks
    useEffect(() => {
        const tl = gsap.timeline()
        if (size === 'large') {
            animateWithGsap(tl, small, smallRotation, '#view1', '#view2', {
                transform: 'translateX(-100%)',
                duration: 1,
            })
        }
        if (size === 'small') {
            animateWithGsap(tl, large, largeRotation, '#view2', '#view1', {
                transform: 'translateX(0%)',
                duration: 1,
            })
        }
        return () => tl.kill() // ✅ Cleanup timeline on unmount/re-run
    }, [size])

    useGSAP(() => {
        gsap.to('#heading', {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: '#heading' },
        })
    }, [])

    // ✅ FIX 4: Reduce DPR ceiling on mobile
    // dpr={[1, 2]} means on a Retina phone it renders at 2x — very expensive
    // Capping at 1.5 cuts GPU work by ~44% with barely visible quality difference
    const dpr = typeof window !== 'undefined' && window.innerWidth < 768
        ? [1, 1.5]
        : [1, 2]

    return (
        <section className='common-padding' ref={sectionRef}>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a Closer look.
                </h1>
            </div>

            <div className="flex flex-col items-center overflow-hidden">
                <div className="w-full h-[50vh] overflow-hidden relative md:h-[90vh] overflow-x-hidden">

                    {/* ✅ FIX 5: Only mount Canvas + ModelViews once section is visible */}
                    {isVisible && (
                        <Suspense fallback={
                            // ✅ FIX 6: Show a placeholder instead of null
                            // null fallback means layout shift when 3D loads in
                            <div className="w-full h-full flex items-center justify-center bg-black">
                                <p className="text-white text-sm">Loading 3D model...</p>
                            </div>
                        }>
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
                                    height: '100vh',
                                    overflow: 'hidden',
                                    pointerEvents: 'none',
                                    touchAction: 'none',
                                }}
                                resize={{ debounce: { scroll: 50, resize: 0 } }}
                                eventSource={document.getElementById('root')}
                                gl={{
                                    antialias: true,
                                    powerPreference: "high-performance",
                                    // ✅ FIX 7: Disable antialias on mobile — big GPU savings
                                    // with almost no visible difference on small screens
                                    ...(window.innerWidth < 768 && { antialias: false }),
                                }}
                                dpr={dpr}
                            >
                                <View.Port />
                                <AdaptiveDpr pixelated />
                                <Preload all />
                            </Canvas>
                        </Suspense>
                    )}
                </div>

                <div className='mx-auto w-full'>
                    <p className='text-sm font-light text-center mb-3'>{model.title}</p>
                    <div className='flex-center'>
                        <ul className='color-container'>
                            {models.map((item, i) => (
                                <li
                                    key={i}
                                    style={{ backgroundColor: item.color[0] }}
                                    className={`w-6 h-6 rounded-full mx-2 cursor-pointer ${item === model ? 'ring-2 border-2 border-black' : ''}`}
                                    onClick={() => setModel(item)}
                                />
                            ))}
                        </ul>
                        <button className='size-btn-container'>
                            {sizes.map((item) => (
                                <span
                                    key={item.label}
                                    style={{
                                        color: size !== item.value ? 'white' : 'black',
                                        backgroundColor: size === item.value ? 'white' : 'transparent',
                                    }}
                                    className='rounded-full p-2 cursor-pointer transition-all duration-300'
                                    onClick={() => setSize(item.value)}
                                >
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