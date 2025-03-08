import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { ParticleBackground } from './ParticleBackground'
import { NeuralNetwork } from './NeuralNetwork'

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMouse({
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      })
    }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 -z-10"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          {/* Background particles */}
          <ParticleBackground 
            count={2000} 
            mouse={mouse} 
            color="hsl(var(--primary))"
          />

          {/* Neural network visualization */}
          <group position={[0, 0, -5]}>
            <NeuralNetwork 
              layers={[3, 4, 4, 3]} 
              color="hsl(var(--secondary))"
              connectionColor="hsl(var(--secondary) / 0.3)"
            />
          </group>

          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        </Suspense>
      </Canvas>
    </div>
  )
} 