"use client"

import * as THREE from 'three'
import {Canvas} from '@react-three/fiber'
import {ContactShadows, Float, Environment} from '@react-three/drei'
import {Suspense, useEffect, useRef, useState} from 'react'
import {gsap} from 'gsap'

export function Shapes() {
  return (
    <div className="text-focus-in row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{antialias: true}}
        dpr={[1, 1.5]}
        camera={{position: [0, 0, 25], fov: 30, near: 1, far: 40}}
      >
        <Suspense fallback={null}>
          <Geometries/>
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio"/>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      rate: 0.3,
      geometry: new THREE.IcosahedronGeometry(3)
    },
    {
      position: [1, -0.75, 4],
      rate: 0.4,
      geometry: new THREE.CapsuleGeometry(0.4, 1.2, 2, 16)
    },
    {
      position: [-1.5, 2.3, -4],
      rate: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5)
    },
    {
      position: [-0.9, -0.75, 4.25],
      rate: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32)
    },
    {
      position: [1.6, 2.1, -4],
      rate: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5)
    },
    {
      position: [0.2, -1.1, 4.5],
      rate: 0.5,
      geometry: new THREE.TetrahedronGeometry(0.8)
    },
    {
      position: [2, 0.5, 1.7],
      rate: -0.5,
      geometry: new THREE.BoxGeometry(1.5, 1.5, 1.5)
    },
    {
      position: [-2.5, 0.2, -1],
      rate: 0.6,
      geometry: new THREE.SphereGeometry(1.25, 32, 32)
    },
    {
      position: [2.8, -0.9, -2],
      rate: 0.45,
      geometry: new THREE.CylinderGeometry(1, 1, 2, 16)
    }
  ]

  const materials = [
    new THREE.MeshStandardMaterial({color: 0x64748B, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({color: 0x0C1618, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({color: 0xF55D3E, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({color: 0xA4B494, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({color: 0xDEB841, roughness: 0.1 }),
  ]

  const soundEffects = [
    new Audio('/sounds/glass_000.ogg'),
    new Audio('/sounds/glass_001.ogg'),
    new Audio('/sounds/glass_002.ogg'),
    new Audio('/sounds/glass_003.ogg'),
  ]

  return geometries.map((props) => (
    <Geometry
      {...props}
      key={JSON.stringify(props.position)}
      position={props.position.map((p) => p * 2)}
      soundEffects={soundEffects}
      materials={materials}
    />
  ))
}

function Geometry({rate, position, geometry, materials, soundEffects}) {
  const meshRef = useRef()
  const [visible, setVisible] = useState(false)

  const startingMaterial = getRandomMaterial()

  function getRandomMaterial() {
    return gsap.utils.random(materials)
  }

  function getRandomSpin() {
    return gsap.utils.random(0, 2)
  }

  function handleClick(e) {
    const mesh = e.object

    const randomSound = gsap.utils.random(soundEffects)
    randomSound.volume = 0.05
    randomSound.play()

    gsap.to(mesh.rotation, {
      x: `+=${getRandomSpin()}`,
      y: `+=${getRandomSpin()}`,
      z: `+=${getRandomSpin()}`,
      duration: 1.3,
      ease: 'elastic.out(1, 0.3)',
      // yoyo: true
    })
    mesh.material = getRandomMaterial()
  }

  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    document.body.style.cursor = 'default'
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true)
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
        delay: 0.3
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * rate} rotationIntensity={8 * rate} floatIntensity={5 * rate}>
        <mesh
          geometry={geometry}
          material={startingMaterial}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
        />
      </Float>
    </group>
  )
}