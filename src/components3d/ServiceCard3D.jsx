import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Sphere, Torus, Cylinder, Line } from '@react-three/drei';
import * as THREE from 'three';

// 1. FACE TRACKING & BIOMETRIC VISION ANIMATION (AI CCTV)
const FaceTrackingSystem = ({ isHovered }) => {
  const groupRef = useRef();
  const scanLineRef = useRef();
  const boundingBoxRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 1.2) * (isHovered ? 0.45 : 0.25);
      groupRef.current.rotation.x = Math.cos(t * 0.8) * 0.1;
    }
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(t * 3.0) * 0.7;
    }
    if (boundingBoxRef.current) {
      const scale = 1 + Math.sin(t * 4) * 0.03;
      boundingBoxRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Stylized Biometric Face Mesh */}
      <group position={[0, 0, 0]}>
        <Sphere args={[0.65, 16, 16]} scale={[0.85, 1.05, 0.75]}>
          <meshStandardMaterial
            color="#0F172A"
            wireframe
            emissive="#00B4D8"
            emissiveIntensity={isHovered ? 2.0 : 1.0}
          />
        </Sphere>
        
        <Box args={[0.55, 0.4, 0.4]} position={[0, -0.65, 0.1]}>
          <meshStandardMaterial
            color="#0F172A"
            wireframe
            emissive="#0284C7"
            emissiveIntensity={isHovered ? 1.8 : 0.8}
          />
        </Box>

        {/* Eyes Landmark Nodes */}
        <Sphere args={[0.07, 12, 12]} position={[-0.24, 0.12, 0.5]}>
          <meshBasicMaterial color="#00B4D8" />
        </Sphere>
        <Sphere args={[0.07, 12, 12]} position={[0.24, 0.12, 0.5]}>
          <meshBasicMaterial color="#00B4D8" />
        </Sphere>

        {/* Nose Landmark Point */}
        <Sphere args={[0.05, 12, 12]} position={[0, -0.1, 0.58]}>
          <meshBasicMaterial color="#7C3AED" />
        </Sphere>

        {/* Mouth Landmark Array */}
        <Sphere args={[0.04, 10, 10]} position={[-0.14, -0.38, 0.45]}>
          <meshBasicMaterial color="#00B4D8" />
        </Sphere>
        <Sphere args={[0.04, 10, 10]} position={[0, -0.4, 0.5]}>
          <meshBasicMaterial color="#0284C7" />
        </Sphere>
        <Sphere args={[0.04, 10, 10]} position={[0.14, -0.38, 0.45]}>
          <meshBasicMaterial color="#00B4D8" />
        </Sphere>
      </group>

      {/* Target Bounding Box */}
      <group ref={boundingBoxRef} position={[0, -0.05, 0.6]}>
        <Line points={[[-0.65, 0.6, 0], [-0.85, 0.6, 0], [-0.85, 0.4, 0]]} color="#00B4D8" lineWidth={2.5} />
        <Line points={[[0.65, 0.6, 0], [0.85, 0.6, 0], [0.85, 0.4, 0]]} color="#00B4D8" lineWidth={2.5} />
        <Line points={[[-0.65, -0.7, 0], [-0.85, -0.7, 0], [-0.85, -0.5, 0]]} color="#00B4D8" lineWidth={2.5} />
        <Line points={[[0.65, -0.7, 0], [0.85, -0.7, 0], [0.85, -0.5, 0]]} color="#00B4D8" lineWidth={2.5} />

        {/* Sweeping Laser Scan Line */}
        <group ref={scanLineRef}>
          <Line points={[[-0.8, 0, 0], [0.8, 0, 0]]} color="#7C3AED" lineWidth={3} />
        </group>
      </group>
    </group>
  );
};

// 2. WEB DEVELOPMENT ANIMATION
const WebDevSystem = ({ isHovered }) => {
  const windowRef = useRef();
  const codeTagRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (windowRef.current) {
      windowRef.current.rotation.y = Math.sin(t * 0.9) * 0.25;
      windowRef.current.rotation.x = Math.cos(t * 0.7) * 0.12;
    }
    if (codeTagRef.current) {
      codeTagRef.current.position.z = 0.35 + Math.sin(t * 2.5) * 0.08;
    }
  });

  return (
    <group ref={windowRef}>
      {/* Sleek Browser Window Pane */}
      <Box args={[1.7, 1.1, 0.08]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.2}
          metalness={0.8}
        />
      </Box>

      {/* Top Header Controls */}
      <Box args={[1.7, 0.18, 0.09]} position={[0, 0.46, 0.01]}>
        <meshStandardMaterial color="#1E293B" />
      </Box>
      <Sphere args={[0.035, 12, 12]} position={[-0.7, 0.46, 0.06]}>
        <meshBasicMaterial color="#ef4444" />
      </Sphere>
      <Sphere args={[0.035, 12, 12]} position={[-0.6, 0.46, 0.06]}>
        <meshBasicMaterial color="#f59e0b" />
      </Sphere>
      <Sphere args={[0.035, 12, 12]} position={[-0.5, 0.46, 0.06]}>
        <meshBasicMaterial color="#10b981" />
      </Sphere>

      {/* Code Brackets in Brand Cyan & Violet */}
      <group ref={codeTagRef} position={[0, -0.05, 0.3]}>
        <Line points={[[-0.35, 0.2, 0], [-0.5, 0, 0], [-0.35, -0.2, 0]]} color="#00B4D8" lineWidth={3.5} />
        <Line points={[[-0.1, -0.22, 0], [0.1, 0.22, 0]]} color="#7C3AED" lineWidth={3.5} />
        <Line points={[[0.35, 0.2, 0], [0.5, 0, 0], [0.35, -0.2, 0]]} color="#0284C7" lineWidth={3.5} />
      </group>

      {/* Floating 3D React Sphere */}
      <Sphere args={[0.1, 16, 16]} position={[0, -0.02, 0.15]}>
        <meshStandardMaterial color="#00B4D8" emissive="#00B4D8" emissiveIntensity={1.8} />
      </Sphere>
      <Torus args={[0.3, 0.018, 16, 48]} rotation={[Math.PI / 3, 0, 0]} position={[0, -0.02, 0.15]}>
        <meshBasicMaterial color="#00B4D8" wireframe />
      </Torus>
    </group>
  );
};

// 3. ENTERPRISE SOFTWARE ARCHITECTURE ANIMATION
const SoftwareSystem = ({ isHovered }) => {
  const stackRef = useRef();
  const c1Ref = useRef();
  const c2Ref = useRef();
  const c3Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (stackRef.current) {
      stackRef.current.rotation.y += delta * (isHovered ? 0.8 : 0.4);
    }
    if (c1Ref.current) c1Ref.current.position.y = 0.45 + Math.sin(t * 2) * 0.04;
    if (c2Ref.current) c2Ref.current.position.y = 0.0;
    if (c3Ref.current) c3Ref.current.position.y = -0.45 - Math.sin(t * 2) * 0.04;
  });

  return (
    <group ref={stackRef}>
      {/* Top API Layer */}
      <group ref={c1Ref}>
        <Cylinder args={[0.65, 0.65, 0.18, 24]}>
          <meshStandardMaterial
            color="#0F172A"
            emissive="#00B4D8"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </Cylinder>
        <Torus args={[0.67, 0.015, 16, 40]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00B4D8" />
        </Torus>
      </group>

      {/* Middle Microservices Layer */}
      <group ref={c2Ref}>
        <Cylinder args={[0.75, 0.75, 0.18, 24]}>
          <meshStandardMaterial
            color="#0F172A"
            emissive="#7C3AED"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </Cylinder>
        <Torus args={[0.77, 0.015, 16, 40]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#7C3AED" />
        </Torus>
      </group>

      {/* Bottom Database Core Layer */}
      <group ref={c3Ref}>
        <Cylinder args={[0.85, 0.85, 0.18, 24]}>
          <meshStandardMaterial
            color="#0B132B"
            emissive="#0284C7"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </Cylinder>
        <Torus args={[0.87, 0.015, 16, 40]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#0284C7" />
        </Torus>
      </group>
    </group>
  );
};

// 4. STUDENT PROJECTS & ROBOTICS ANIMATION
const StudentProjectsSystem = ({ isHovered }) => {
  const boardRef = useRef();
  const ledRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (boardRef.current) {
      boardRef.current.rotation.y = Math.sin(t * 0.8) * 0.3;
      boardRef.current.rotation.x = 0.25 + Math.cos(t * 0.6) * 0.15;
    }
    if (ledRef.current) {
      ledRef.current.scale.setScalar(1 + Math.sin(t * 6) * 0.3);
    }
  });

  return (
    <group ref={boardRef}>
      {/* PCB Base Board */}
      <Box args={[1.5, 1.1, 0.08]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
      </Box>

      {/* Central Microcontroller IC */}
      <Box args={[0.45, 0.45, 0.12]} position={[0, 0, 0.06]}>
        <meshStandardMaterial color="#00B4D8" emissive="#0284C7" emissiveIntensity={0.8} />
      </Box>

      {/* Header Pins */}
      <Box args={[1.3, 0.08, 0.12]} position={[0, 0.45, 0.04]}>
        <meshStandardMaterial color="#7C3AED" metalness={0.9} />
      </Box>
      <Box args={[1.3, 0.08, 0.12]} position={[0, -0.45, 0.04]}>
        <meshStandardMaterial color="#7C3AED" metalness={0.9} />
      </Box>

      {/* Blinking Indicator LEDs */}
      <Sphere ref={ledRef} args={[0.04, 12, 12]} position={[0.5, 0.2, 0.08]}>
        <meshBasicMaterial color="#00B4D8" />
      </Sphere>
      <Sphere args={[0.04, 12, 12]} position={[0.5, 0.05, 0.08]}>
        <meshBasicMaterial color="#7C3AED" />
      </Sphere>
    </group>
  );
};

export const ServiceCard3D = ({ slug }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        height: '190px',
        position: 'relative',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.06) 0%, #FFFFFF 85%)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        transition: 'border-color 0.25s, box-shadow 0.25s'
      }}
    >
      <Suspense fallback={<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7', fontSize: '0.8rem' }}>Loading 3D Visualizer...</div>}>
        <Canvas
          camera={{ position: [0, 0, 3.1], fov: 42 }}
          dpr={[1, 1.2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color="#ffffff" />
          <pointLight position={[-3, -3, 2]} intensity={0.9} color="#00B4D8" />
          <Float speed={2.2} rotationIntensity={0.3} floatIntensity={0.4}>
            {slug === 'ai-cctv' && <FaceTrackingSystem isHovered={isHovered} />}
            {slug === 'web-development' && <WebDevSystem isHovered={isHovered} />}
            {slug === 'software-development' && <SoftwareSystem isHovered={isHovered} />}
            {slug === 'student-projects' && <StudentProjectsSystem isHovered={isHovered} />}
            {!['ai-cctv', 'web-development', 'software-development', 'student-projects'].includes(slug) && (
              <SoftwareSystem isHovered={isHovered} />
            )}
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
};
