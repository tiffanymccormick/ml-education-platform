import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const NetworkGraph = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    const container = containerRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create neural network visualization
    const createNeuron = (x, y, z) => {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshPhongMaterial({ color: 0x6366f1 });
      const neuron = new THREE.Mesh(geometry, material);
      neuron.position.set(x, y, z);
      return neuron;
    };

    const createLayer = (neurons, x) => {
      const group = new THREE.Group();
      neurons.forEach((_, i) => {
        const neuron = createNeuron(x, i * 0.3 - (neurons.length - 1) * 0.15, 0);
        group.add(neuron);
      });
      return group;
    };

    // Create a simple network with 3 layers
    const layer1 = createLayer([1, 2, 3, 4], -1);
    const layer2 = createLayer([1, 2, 3], 0);
    const layer3 = createLayer([1, 2], 1);

    scene.add(layer1);
    scene.add(layer2);
    scene.add(layer3);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}; 