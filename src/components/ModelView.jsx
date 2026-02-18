import {PerspectiveCamera, View } from '@react-three/drei'
import * as THREE from 'three'
import React from 'react'
import Lights from './Lights'
import { Suspense } from 'react'
import Iphone from './Iphone'

import { OrbitControls } from '@react-three/drei'
import Loader from './Loader'

const ModelView = ({index, groupRef, gsapType, controlRef, setRotationState, item, size}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute  ${ index ===2 ? '-right-full' : ''}`}
    >
      <ambientLight intensity={5} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      <OrbitControls 
        ref={controlRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}

      />
      <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0,0,0]}>
        <Suspense fallback={<Loader />}>
          <Iphone 
          scale={index === 1 ? [15,15,15] : [17,17,17]} 
          item={item}
          size={size}
          />
        </Suspense>

      </group>

      <Lights />
      
    </View>
  )
}

export default ModelView