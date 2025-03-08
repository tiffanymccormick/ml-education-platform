import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ParticleProps = {
  count: number
  mouse: { x: number; y: number }
  color?: string
  speed?: number
  size?: number
  depth?: number
  interactive?: boolean
  emotionMode?: 'happiness' | 'anger' | 'sadness' | 'jealousy' | 'fear' | 'disgust'
}

type HSL = {
  h: number
  s: number
  l: number
}

// Updated mecha-inspired colors
const mechaColors = {
  happiness: '#FFC700', // Caution yellow
  anger: '#FF0012',     // Warning red
  sadness: '#00C3FF',   // Interface blue
  jealousy: '#007F00',  // Terminal green
  fear: '#5900B3',      // NERV purple
  disgust: '#FF5E00'    // Alert orange
};

export function ParticleBackground({ 
  count = 5000, 
  mouse, 
  color = '#00C3FF',
  speed = 0.2,
  size = 0.1,
  depth = 50,
  interactive = true,
  emotionMode
}: ParticleProps) {
  try {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const clock = useRef<THREE.Clock>(new THREE.Clock())
    
    // Create particles in a spherical distribution
    const particles = useMemo(() => {
      const temp = []
      // Use spherical coordinates for more natural distribution
      for (let i = 0; i < count; i++) {
        // Spherical coordinates
        const radius = Math.random() * depth
        const theta = Math.random() * Math.PI * 2 // Azimuthal angle
        const phi = Math.acos((Math.random() * 2) - 1) // Polar angle
        
        // Convert to Cartesian coordinates
        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)
        
        // Random velocities
        const vx = (Math.random() - 0.5) * 0.01 * speed
        const vy = (Math.random() - 0.5) * 0.01 * speed
        const vz = (Math.random() - 0.5) * 0.01 * speed
        
        // Initial scale
        const scale = Math.random() * 0.5 + 0.5
        
        // Color gradient based on index
        const colorIndex = i / count
        
        temp.push({ 
          x, y, z, vx, vy, vz, scale, colorIndex,
          // Store original position for return force
          ox: x, oy: y, oz: z
        })
      }
      return temp
    }, [count, depth, speed])
    
    useFrame(() => {
      if (!mesh.current) return
      
      const time = clock.current.getElapsedTime()
      
      // Update each particle
      particles.forEach((particle, i) => {
        let { x, y, z, vx, vy, vz, ox, oy, oz, scale, colorIndex } = particle
        
        // Apply wave motion
        const waveX = Math.sin(time * 0.4 + x * 0.2) * 0.1
        const waveY = Math.cos(time * 0.4 + y * 0.2) * 0.1
        const waveZ = Math.sin(time * 0.4 + z * 0.2) * 0.1
        
        // Mouse interaction - repel particles when mouse is near
        if (interactive && mouse) {
          const mouseX = (mouse.x * window.innerWidth / 2) * 0.05
          const mouseY = (mouse.y * window.innerHeight / 2) * 0.05
          
          const dx = x - mouseX
          const dy = y - mouseY
          const dz = z
          
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
          
          if (distance < 5) {
            const force = 5 / (distance * distance)
            vx += dx * force * 0.01
            vy += dy * force * 0.01
            vz += dz * force * 0.005
          }
        }
        
        // Return force to original position
        vx += (ox - x) * 0.001
        vy += (oy - y) * 0.001
        vz += (oz - z) * 0.001
        
        // Update position with velocity
        x += vx + waveX
        y += vy + waveY
        z += vz + waveZ
        
        // Apply some drag
        vx *= 0.98
        vy *= 0.98
        vz *= 0.98
        
        // Update the particle
        particle.x = x
        particle.y = y
        particle.z = z
        particle.vx = vx
        particle.vy = vy
        particle.vz = vz
        
        // Scale based on distance from center and time
        const distance = Math.sqrt(x * x + y * y + z * z)
        const normalizedDistance = Math.min(distance / depth, 1)
        const pulseScale = scale * (1 + Math.sin(time * 2 + i * 0.1) * 0.2)
        const finalScale = size * pulseScale * (1 - normalizedDistance * 0.5)
        
        // Position and scale the dummy
        dummy.position.set(x, y, z)
        dummy.scale.set(finalScale, finalScale, finalScale)
        dummy.updateMatrix()
        
        // Update the instanced mesh
        if (mesh.current) {
          mesh.current.setMatrixAt(i, dummy.matrix)
        }
      })
      
      // Ensure no rotation is applied
      if (mesh.current) {
        mesh.current.rotation.set(0, 0, 0)
        mesh.current.instanceMatrix.needsUpdate = true
      }
    })
    
    return (
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial 
          color={emotionMode ? mechaColors[emotionMode] : color}
          transparent
          opacity={emotionMode === 'sadness' ? 0.7 : 0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    )
  } catch (error) {
    console.error("Error in ParticleBackground:", error);
    return null;
  }
} 