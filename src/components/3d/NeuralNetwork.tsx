import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Html } from '@react-three/drei'

type Node = {
  position: THREE.Vector3
  connections: number[]
  layer: number
  value?: number
}

type NeuralNetworkProps = {
  layers: number[]
  color?: string
  connectionColor?: string
  data?: number[]
}

export function NeuralNetwork({ 
  layers = [4, 6, 6, 4], 
  color = '#646cff',
  connectionColor = '#646cff33',
  data
}: NeuralNetworkProps) {
  const nodesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [activeConnections, setActiveConnections] = useState<Set<number>>(new Set())
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Set initialization flag after component mounts
    setIsInitialized(true);
    
    return () => {
      // Clean up any resources when component unmounts
      setIsInitialized(false);
    };
  }, []);

  const { nodes, connections, positions, linePositions } = useMemo(() => {
    try {
      const nodes: Node[] = []
      const connections: [number, number][] = []
      let nodeIndex = 0

      // Create nodes for each layer
      layers.forEach((layerSize, layerIndex) => {
        const layerOffset = (layers.length - 1) / 2
        const z = (layerIndex - layerOffset) * 2

        for (let i = 0; i < layerSize; i++) {
          const verticalOffset = (layerSize - 1) / 2
          const y = (i - verticalOffset) * 1
          nodes.push({
            position: new THREE.Vector3(0, y, z),
            connections: [],
            layer: layerIndex,
            value: data && layerIndex === 0 && i < data.length ? data[i] : 0
          })

          // Connect to next layer
          if (layerIndex < layers.length - 1) {
            for (let j = 0; j < layers[layerIndex + 1]; j++) {
              connections.push([
                nodeIndex,
                nodeIndex + layerSize + j
              ])
            }
          }
          nodeIndex++
        }
      })

      // Create positions for nodes and lines
      const positions = new Float32Array(nodes.length * 3)
      const linePositions = new Float32Array(connections.length * 6)

      nodes.forEach((node, i) => {
        positions[i * 3] = node.position.x
        positions[i * 3 + 1] = node.position.y
        positions[i * 3 + 2] = node.position.z
      })

      connections.forEach((connection, i) => {
        const start = nodes[connection[0]].position
        const end = nodes[connection[1]].position
        linePositions[i * 6] = start.x
        linePositions[i * 6 + 1] = start.y
        linePositions[i * 6 + 2] = start.z
        linePositions[i * 6 + 3] = end.x
        linePositions[i * 6 + 4] = end.y
        linePositions[i * 6 + 5] = end.z
      })

      return { nodes, connections, positions, linePositions }
    } catch (error) {
      console.error('Error creating neural network:', error);
      // Return empty data structures as fallback
      return { 
        nodes: [], 
        connections: [], 
        positions: new Float32Array(0), 
        linePositions: new Float32Array(0) 
      };
    }
  }, [layers, data])

  // Animation and interaction effects
  useFrame(({ clock, mouse, camera }) => {
    if (!isInitialized || !groupRef.current) return;
    
    try {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
      
      // Smooth rotation following mouse
      const targetRotationY = (mouse.x * Math.PI) / 8
      const targetRotationX = (mouse.y * Math.PI) / 8
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05

      // Animate connections
      if (linesRef.current && linesRef.current.material instanceof THREE.LineBasicMaterial) {
        const material = linesRef.current.material
        material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1
      }

      // Pulse effect for nodes
      if (nodesRef.current && nodesRef.current.material instanceof THREE.PointsMaterial) {
        const material = nodesRef.current.material
        material.size = 0.2 + Math.sin(clock.getElapsedTime() * 3) * 0.05
      }
    } catch (error) {
      console.error('Error in animation frame:', error);
    }
  })

  if (positions.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            normalized={false}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          sizeAttenuation={true}
          color={color}
          transparent
          opacity={0.8}
          alphaTest={0.5}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            normalized={false}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={connectionColor}
          transparent
          opacity={0.3}
          linewidth={1}
        />
      </lineSegments>

      {/* Node labels and tooltips */}
      {nodes.map((node, i) => (
        <group key={i} position={[node.position.x, node.position.y, node.position.z]}>
          {hoveredNode === i && (
            <Html distanceFactor={10}>
              <div className="bg-background/90 px-2 py-1 rounded-md text-xs backdrop-blur-sm border border-border/50">
                <div className="font-mono">Node {i}</div>
                <div className="text-primary">Value: {node.value?.toFixed(3)}</div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
} 