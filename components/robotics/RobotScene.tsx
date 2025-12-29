'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function RobotModel() {
  const geom = useLoader(STLLoader, '/models/wall-e.stl')
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    // Otomatik dönüş kaldırıldı, kontrol kullanıcıda.
  })

  return (
    <mesh ref={meshRef} geometry={geom} scale={0.012} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <meshStandardMaterial
        color="#f97316"
        roughness={0.4}
        metalness={0.7}
      />
    </mesh>
  )
}

export default function RobotScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#020617']} />

        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#f97316" />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color="#22d3ee" castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#ffffff" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <RobotModel />
        </Float>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.2}
          makeDefault
        />

        {/* Background Grid */}
        <gridHelper args={[30, 30, 0x1e293b, 0x0f172a]} position={[0, -2, 0]} />

        {/* Environment Glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.05} />
        </mesh>
      </Canvas>
    </div>
  )
}
