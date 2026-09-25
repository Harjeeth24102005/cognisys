import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';
import { Eye, Globe, Code, GraduationCap, ArrowRight, Sparkles, Move3d } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CanvasFallback } from './CanvasFallback';

// Pointer-reactive Light for Interactive Specular Highlights
const InteractivePointerLight = () => {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      const { x, y } = state.pointer;
      lightRef.current.position.x = x * 4;
      lightRef.current.position.y = y * 3;
      lightRef.current.position.z = 4.5;
    }
  });
  return <pointLight ref={lightRef} intensity={2.8} color="#00B4D8" distance={10} />;
};

// Holographic Particle Field (Cyan, Violet, Sapphire)
const CrystallineParticleGalaxy = ({ count = 220 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color('#00B4D8'); // Vibrant Cyan
    const c2 = new THREE.Color('#7C3AED'); // Royal Violet
    const c3 = new THREE.Color('#0284C7'); // Sapphire Blue

    for (let i = 0; i < count; i++) {
      const radius = 1.9 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }
    return { positions: p, colors };
  }, [count]);

  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
      pointsRef.current.rotation.x += delta * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.positions.length / 3}
          array={points.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={points.colors.length / 3}
          array={points.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.036}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

// 3D Polygonal Geometric Crystalline Brain Model (Directly Inspired by Cognisys Logo)
const PolygonalBrainCrystal = ({ activeColor = '#00B4D8' }) => {
  const crystalGroupRef = useRef();
  const leftHemisphereRef = useRef();
  const rightHemisphereRef = useRef();
  const innerEyeRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (crystalGroupRef.current) {
      crystalGroupRef.current.rotation.y += delta * 0.22;
      crystalGroupRef.current.rotation.x = Math.sin(t * 0.5) * 0.06;
    }
    if (innerEyeRef.current) {
      const s = 1.0 + Math.sin(t * 2.5) * 0.08;
      innerEyeRef.current.scale.set(s, s, s);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.32;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.26;
  });

  return (
    <group ref={crystalGroupRef}>
      {/* Inner Glowing Cyan Eye Sphere (Representing Cognisys 'O' and Core Intelligence) */}
      <Sphere ref={innerEyeRef} args={[0.55, 32, 32]}>
        <meshStandardMaterial
          color="#00B4D8"
          emissive="#00B4D8"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      {/* Left Hemisphere: Royal Violet & Amethyst Polygonal Facets */}
      <group ref={leftHemisphereRef} position={[-0.32, 0.05, 0]} scale={[1.05, 0.95, 1.1]}>
        <Icosahedron args={[0.9, 1]}>
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#4C1D95"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            flatShading
            transparent
            opacity={0.92}
          />
        </Icosahedron>
        {/* Wireframe Neural Synapses */}
        <Icosahedron args={[0.92, 1]}>
          <meshBasicMaterial
            color="#C4B5FD"
            wireframe
            transparent
            opacity={0.35}
          />
        </Icosahedron>
      </group>

      {/* Right Hemisphere: Vibrant Cyan & Cerulean Polygonal Facets */}
      <group ref={rightHemisphereRef} position={[0.32, 0.05, 0]} scale={[1.05, 0.95, 1.1]}>
        <Icosahedron args={[0.9, 1]}>
          <meshStandardMaterial
            color="#00B4D8"
            emissive="#0284C7"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            flatShading
            transparent
            opacity={0.92}
          />
        </Icosahedron>
        {/* Wireframe Neural Synapses */}
        <Icosahedron args={[0.92, 1]}>
          <meshBasicMaterial
            color="#BAE6FD"
            wireframe
            transparent
            opacity={0.35}
          />
        </Icosahedron>
      </group>

      {/* Lower Brain Stem & Lobe: Deep Obsidian Midnight Navy */}
      <group position={[0, -0.65, -0.1]} scale={[0.65, 0.55, 0.65]}>
        <Icosahedron args={[0.7, 1]}>
          <meshStandardMaterial
            color="#0B132B"
            emissive="#1E1B4B"
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.9}
            flatShading
          />
        </Icosahedron>
      </group>

      {/* Gyroscopic Synaptic Orbital Rings with Reactive Luminescence */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.022, 16, 100]} />
          <meshStandardMaterial
            color="#00B4D8"
            emissive="#00B4D8"
            emissiveIntensity={1.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={1.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
};

// Scene Root with Ambient Studio Lighting
const HeroScene = ({ isMobile }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const { x, y } = state.pointer;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.2, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.12, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[10, 10, 8]} intensity={1.9} color="#FFFFFF" />
      <directionalLight position={[-10, 8, 5]} intensity={1.2} color="#BAE6FD" />
      <pointLight position={[0, -5, 2]} intensity={1.0} color="#C4B5FD" />
      <InteractivePointerLight />

      <PolygonalBrainCrystal />
      <CrystallineParticleGalaxy count={isMobile ? 120 : 220} />
    </group>
  );
};

export const HeroAICore = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDomain, setActiveDomain] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const serviceDomains = [
    {
      id: 'ai-cctv',
      title: 'AI CCTV Surveillance',
      shortTitle: 'AI CCTV',
      icon: Eye,
      color: '#00B4D8',
      path: '/services/ai-cctv',
      desc: 'Sub-50ms biometric & multi-stream tracking'
    },
    {
      id: 'web-development',
      title: 'Modern 3D Web Apps',
      shortTitle: 'Web Dev',
      icon: Globe,
      color: '#0284C7',
      path: '/services/web-development',
      desc: 'React, Vite, 3D WebGL & FastAPI'
    },
    {
      id: 'software-development',
      title: 'Custom Software Systems',
      shortTitle: 'Software',
      icon: Code,
      color: '#7C3AED',
      path: '/services/software-development',
      desc: 'Scalable microservices, APIs & databases'
    },
    {
      id: 'student-projects',
      title: 'Student Innovation Lab',
      shortTitle: 'Student Lab',
      icon: GraduationCap,
      color: '#0891B2',
      path: '/services/student-projects',
      desc: 'Full IEEE source code & viva preparation'
    }
  ];

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* 3D Canvas Stage */}
      <div style={{
        width: '100%',
        height: isMobile ? '320px' : '440px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'pan-y'
      }}>
        <Suspense fallback={<CanvasFallback title="Initializing 3D Neural Engine..." />}>
          <Canvas
            camera={{ position: [0, 0, isMobile ? 4.9 : 4.3], fov: 45 }}
            style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.75]}
          >
            <HeroScene isMobile={isMobile} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.8}
              autoRotate
              autoRotateSpeed={0.9}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.5}
              touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
            />
          </Canvas>
        </Suspense>

        {/* Minimal High-Contrast Drag/Touch Indicator Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '6px 14px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #CBD5E1',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          color: '#0A0F1D',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)'
        }}>
          <Move3d size={14} color="#00B4D8" />
          <span>DRAG OR SWIPE 3D CORE</span>
        </div>
      </div>

      {/* Clean, Mobile-Interactive Domain Selector Dock */}
      <div style={{
        width: '100%',
        maxWidth: '560px',
        marginTop: '-12px',
        padding: '0 8px',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px'
        }}>
          {serviceDomains.map((domain) => {
            const Icon = domain.icon;
            const isHovered = activeDomain === domain.id;
            return (
              <div
                key={domain.id}
                onClick={() => navigate(domain.path)}
                onMouseEnter={() => setActiveDomain(domain.id)}
                onMouseLeave={() => setActiveDomain(null)}
                style={{
                  background: '#FFFFFF',
                  border: `1.5px solid ${isHovered ? domain.color : '#E2E8F0'}`,
                  borderRadius: '14px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  boxShadow: isHovered 
                    ? `0 10px 24px -4px ${domain.color}33, 0 2px 6px rgba(15, 23, 42, 0.04)`
                    : '0 4px 12px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-2px)' : 'none',
                  userSelect: 'none'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${domain.color}15`,
                  border: `1px solid ${domain.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: domain.color,
                  flexShrink: 0
                }}>
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    color: '#0A0F1D',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {isMobile ? domain.shortTitle : domain.title}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: '#475569',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 500
                  }}>
                    {domain.desc}
                  </div>
                </div>
                <ArrowRight size={14} color={isHovered ? domain.color : '#94A3B8'} style={{ flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
