// @ts-nocheck
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function StripedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 128, 128]} />
      <MeshDistortMaterial
        color="#22e07a"
        emissive="#0a8a3f"
        emissiveIntensity={0.4}
        metalness={0.9}
        roughness={0.15}
        wireframe={false}
        distort={0.15}
        speed={1.5}
      />
    </mesh>
  );
}

function GlowRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1.current) {
      ring1.current.rotation.z += 0.005;
      ring1.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= 0.003;
      ring2.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#22e07a" emissive="#22e07a" emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} rotation={[1.2, 0.5, 0]}>
        <torusGeometry args={[3.3, 0.015, 16, 100]} />
        <meshStandardMaterial color="#0a8a3f" emissive="#0a8a3f" emissiveIntensity={2} transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#22e07a" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

const HeroSphere = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#22e07a" />
          <pointLight position={[-5, -3, 3]} intensity={0.5} color="#0a8a3f" />
          <spotLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" angle={0.3} penumbra={0.5} />
          <StripedSphere />
          <GlowRings />
          <Particles />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroSphere;
