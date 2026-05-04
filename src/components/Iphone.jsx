

import React, { useRef, useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// Create Draco Loader (only once)
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');

useGLTF.preload('/models/scene.glb');

function Model(props) {
    const { nodes, materials } = useGLTF(
        '/models/scene.glb',
        true,           // useDraco
        true,           // useWorker
        (loader) => {
            loader.setDRACOLoader(dracoLoader);   // ← Draco enabled here
        }
    );

    const texture = useTexture(props.item.img);

    useEffect(() => {
        Object.entries(materials).forEach(([name, material]) => {
            // Skip materials that shouldn't change color
            if (
                name !== "zFdeDaGNRwzccye" &&
                name !== "ujsvqBWRMnqdwPx" &&
                name !== "hUlRcbieVuIiOXG" &&
                name !== "jlzuBkUzuJqgiAK" &&
                name !== "xNrofRCqOXXHVZt"
            ) {
                material.color = new THREE.Color(props.item.color[0]);
            }
            material.needsUpdate = true;
        });
    }, [materials, props.item]);

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.ttmRoLdJipiIOmf.geometry}
                material={materials.hUlRcbieVuIiOXG}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.DjsDkGiopeiEJZK.geometry}
                material={materials.PaletteMaterial001}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.buRWvyqhBBgcJFo.geometry}
                material={materials.PaletteMaterial002}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.MrMmlCAsAxJpYqQ_0.geometry}
                material={materials.dxCVrUCvYhjVxqy}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.wqbHSzWaUxBCwxY_0.geometry}
                material={materials.MHFGNLrDQbTNima}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.QvGDcbDApaGssma.geometry}
                material={materials.kUhjpatHUvkBwfM}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vFwJFNASGvEHWhs.geometry}
                material={materials.RJoymvEsaIItifI}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.evAxFwhaQUwXuua.geometry}
                material={materials.KSIxMqttXxxmOYl}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.USxQiqZgxHbRvqB.geometry}
                material={materials.mcPrzcBUcdqUybC}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.TvgBVmqNmSrFVfW.geometry}
                material={materials.pIhYLPqiSQOZTjn}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.GuYJryuYunhpphO.geometry}
                material={materials.eShKpuMNVJTRrgg}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pvdHknDTGDzVpwc.geometry}
                material={materials.xdyiJLYTYRfJffH}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.CfghdUoyzvwzIum.geometry}
                material={materials.jpGaQNgTtEGkTfo}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.DjdhycfQYjKMDyn.geometry}
                material={materials.ujsvqBWRMnqdwPx}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.usFLmqcyrnltBUr.geometry}
                material={materials.sxNzrmuTqVeaXdg}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.xXDHkMplTIDAXLN.geometry}
                material={materials.pIJKfZsazmcpEiU}
                scale={0.01}
            >
            <meshStandardMaterial roughness={1} map={texture} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vELORlCJixqPHsZ.geometry}
                material={materials.zFdeDaGNRwzccye}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.EbQGKrWAqhBHiMv.geometry}
                material={materials.TBLSREBUyLMVtJa}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.EddVrWkqZTlvmci.geometry}
                material={materials.xNrofRCqOXXHVZt}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.KSWlaxBcnPDpFCs.geometry}
                material={materials.yQQySPTfbEJufve}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.TakBsdEjEytCAMK.geometry}
                material={materials.PaletteMaterial003}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.IykfmVvLplTsTEW.geometry}
                material={materials.PaletteMaterial004}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.wLfSXtbwRlBrwof.geometry}
                material={materials.oZRkkORNzkufnGD}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.WJwwVjsahIXbJpU.geometry}
                material={materials.yhcAXNGcJWCqtIS}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.YfrJNXgMvGOAfzz.geometry}
                material={materials.bCgzXjHOanGdTFV}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.DCLCbjzqejuvsqH.geometry}
                material={materials.vhaEJjZoqGtyLdo}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.CdalkzDVnwgdEhS.geometry}
                material={materials.jlzuBkUzuJqgiAK}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.NtjcIgolNGgYlCg.geometry}
                material={materials.PpwUTnTFZJXxCoE}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.pXBNoLiaMwsDHRF.geometry}
                material={materials.yiDkEwDSyEhavuP}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.IkoiNqATMVoZFKD.geometry}
                material={materials.hiVunnLeAHkwGEo}
                scale={0.01}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.rqgRAGHOwnuBypi.geometry}
                material={materials.HGhEhpqSBZRnjHC}
                scale={0.01}
            />
        </group>
    );
}

export default Model;