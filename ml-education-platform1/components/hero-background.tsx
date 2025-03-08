"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Post-processing for cyberpunk glow effect
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85, // threshold
    )
    composer.addPass(bloomPass)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000

    const posArray = new Float32Array(particlesCount * 3)
    const colorArray = new Float32Array(particlesCount * 3)
    const sizeArray = new Float32Array(particlesCount)

    // Position, color, and size for each particle
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position (x, y, z) - create a more interesting distribution
      // Some particles in a sphere
      if (i % 9 === 0) {
        const radius = 15 + Math.random() * 10
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta)
        posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
        posArray[i + 2] = radius * Math.cos(phi)
      }
      // Some particles in a grid pattern
      else if (i % 9 === 3) {
        posArray[i] = Math.floor(Math.random() * 10) * 5 - 25
        posArray[i + 1] = Math.floor(Math.random() * 10) * 5 - 25
        posArray[i + 2] = Math.floor(Math.random() * 10) * 5 - 25
      }
      // Rest randomly distributed
      else {
        posArray[i] = (Math.random() - 0.5) * 60
        posArray[i + 1] = (Math.random() - 0.5) * 60
        posArray[i + 2] = (Math.random() - 0.5) * 60
      }

      // Color (r, g, b) - cyberpunk color palette
      // Randomly choose between purple, blue, and pink hues
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        // Purple
        colorArray[i] = 0.5 + Math.random() * 0.5 // R: 0.5-1.0
        colorArray[i + 1] = 0.0 + Math.random() * 0.3 // G: 0.0-0.3
        colorArray[i + 2] = 0.8 + Math.random() * 0.2 // B: 0.8-1.0
      } else if (colorChoice < 0.7) {
        // Blue
        colorArray[i] = 0.0 + Math.random() * 0.2 // R: 0.0-0.2
        colorArray[i + 1] = 0.5 + Math.random() * 0.3 // G: 0.5-0.8
        colorArray[i + 2] = 0.8 + Math.random() * 0.2 // B: 0.8-1.0
      } else {
        // Pink/Magenta
        colorArray[i] = 0.8 + Math.random() * 0.2 // R: 0.8-1.0
        colorArray[i + 1] = 0.0 + Math.random() * 0.2 // G: 0.0-0.2
        colorArray[i + 2] = 0.5 + Math.random() * 0.5 // B: 0.5-1.0
      }

      // Particle size - vary for more visual interest
      const index = i / 3
      sizeArray[index] = Math.random() * 0.1 + 0.03
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizeArray, 1))

    // Custom shader material for more control over particles
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute vec3 color;
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mousePosition;
        
        void main() {
          vColor = color;
          
          // Add some movement to particles
          vec3 pos = position;
          float noise = sin(pos.x * 0.05 + time) * cos(pos.y * 0.05 + time) * 0.5;
          pos.z += noise;
          
          // Mouse interaction - particles move away from mouse
          float dist = length(pos.xy - mousePosition);
          if (dist < 10.0) {
            vec2 direction = normalize(pos.xy - mousePosition);
            pos.xy += direction * (10.0 - dist) * 0.1;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create a circular particle with soft edges
          float r = 0.5 * length(gl_PointCoord - vec2(0.5, 0.5));
          float alpha = 1.0 - smoothstep(0.4, 0.5, r);
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Add some connecting lines between particles for a network effect
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x8844ff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    })

    const linesGeometry = new THREE.BufferGeometry()
    const linesPositions = []

    // Create lines between some particles that are close to each other
    for (let i = 0; i < particlesCount; i++) {
      const indexA = i * 3
      const posA = new THREE.Vector3(posArray[indexA], posArray[indexA + 1], posArray[indexA + 2])

      // Only create lines for some particles to avoid too many lines
      if (i % 20 !== 0) continue

      for (let j = i + 1; j < particlesCount; j++) {
        const indexB = j * 3
        const posB = new THREE.Vector3(posArray[indexB], posArray[indexB + 1], posArray[indexB + 2])

        // Only connect particles that are close to each other
        if (posA.distanceTo(posB) < 10) {
          linesPositions.push(posA.x, posA.y, posA.z)
          linesPositions.push(posB.x, posB.y, posB.z)
        }
      }
    }

    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linesPositions, 3))
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(linesMesh)

    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
    }

    window.addEventListener("mousemove", (event) => {
      // Update mouse position for shader
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update uniform in shader
      particlesMaterial.uniforms.mousePosition.value.set(mouse.x * 20, mouse.y * 20)
    })

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Update time uniform for shader
      particlesMaterial.uniforms.time.value = elapsedTime

      // Rotate particles
      particlesMesh.rotation.x += 0.0003
      particlesMesh.rotation.y += 0.0005

      // Mouse interaction
      particlesMesh.rotation.x += mouse.y * 0.0002
      particlesMesh.rotation.y += mouse.x * 0.0002

      // Render with post-processing
      composer.render()
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", () => {})
      containerRef.current?.removeChild(renderer.domElement)
      scene.remove(particlesMesh)
      scene.remove(linesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true" />
}

