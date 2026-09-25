import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Line, Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Eye, Globe, Code, GraduationCap, ShieldCheck, AlertTriangle, CheckCircle2, Server, Database, Cloud, Cpu, ArrowRight, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CanvasFallback } from './CanvasFallback';

// ==========================================
// 0. COGNISYS AI CORE ANIMATION
// ==========================================
const AICoreSubScene = () => {
  const coreRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.7;
      coreRef.current.rotation.x = Math.sin(t * 0.6) * 0.2;
    }
    if (innerCoreRef.current) {
      const pulse = 1 + Math.sin(t * 3.5) * 0.08;
      innerCoreRef.current.scale.set(pulse, pulse, pulse);
      innerCoreRef.current.rotation.y -= delta * 1.2;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.8;
      ring1Ref.current.rotation.y += delta * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.6;
      ring2Ref.current.rotation.z += delta * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= delta * 0.5;
      ring3Ref.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2.5} floatIntensity={0.6}>
        {/* Outer Crystalline Neural Sphere */}
        <group ref={coreRef}>
          <Sphere args={[1.05, 32, 32]}>
            <meshStandardMaterial
              color="#0E343E"
              wireframe
              emissive="#F9BE4A"
              emissiveIntensity={1.8}
            />
          </Sphere>
        </group>

        {/* Inner Pulsating Quantum Energy Core */}
        <group ref={innerCoreRef}>
          <Sphere args={[0.65, 24, 24]}>
            <meshStandardMaterial
              color="#FFE18F"
              emissive="#FFE18F"
              emissiveIntensity={2.8}
            />
          </Sphere>
          <Box args={[0.7, 0.7, 0.7]}>
            <meshStandardMaterial
              color="#F9BE4A"
              wireframe
              emissive="#F9BE4A"
              emissiveIntensity={1.6}
            />
          </Box>
        </group>

        {/* Triple Gyroscopic Orbiting Neural Rings */}
        <group ref={ring1Ref}>
          <Torus args={[1.8, 0.035, 16, 64]}>
            <meshStandardMaterial color="#F9BE4A" emissive="#F9BE4A" emissiveIntensity={2.0} />
          </Torus>
        </group>
        <group ref={ring2Ref}>
          <Torus args={[2.2, 0.03, 16, 64]}>
            <meshStandardMaterial color="#FFE18F" emissive="#FFE18F" emissiveIntensity={1.8} />
          </Torus>
        </group>
        <group ref={ring3Ref}>
          <Torus args={[2.5, 0.025, 16, 64]}>
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
          </Torus>
        </group>

        {/* Neural Synapse Nodes */}
        {[
          [-1.8, 0.9, 0.5], [1.8, -0.8, 0.6], [0.9, 1.7, -0.7], [-1.0, -1.6, -0.5],
          [0.3, -1.9, 1.0], [-1.5, 1.2, -1.1]
        ].map((pos, idx) => (
          <group key={idx} position={pos}>
            <Sphere args={[0.09, 16, 16]}>
              <meshBasicMaterial color="#FFE18F" />
            </Sphere>
            <Line points={[[0, 0, 0], [-pos[0]*0.55, -pos[1]*0.55, -pos[2]*0.55]]} color="#F9BE4A" lineWidth={1.5} />
          </group>
        ))}

        {/* Holographic AI HUD Badge */}
        <Html position={[0, -1.9, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(7, 25, 30, 0.95)',
            border: '1.5px solid #F9BE4A',
            padding: '6px 16px',
            borderRadius: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            color: '#FFE18F',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 20px rgba(249, 190, 74, 0.4)'
          }}>
            COGNISYS // NEURAL ENGINE CORE
          </div>
        </Html>
      </Float>
    </group>
  );
};

// ==========================================
// 1. FACE TRACKING SYSTEM ANIMATION (AI CCTV)
// ==========================================
const FaceTrackingSubScene = ({ step = 0 }) => {
  const headMeshRef = useRef();
  const trackingBoxRef = useRef();
  const scanLaserRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (headMeshRef.current) {
      headMeshRef.current.rotation.y = Math.sin(t * 1.1) * 0.35;
      headMeshRef.current.position.x = Math.sin(t * 0.7) * 0.3;
    }
    if (scanLaserRef.current) {
      scanLaserRef.current.position.y = Math.sin(t * 2.8) * 1.2;
    }
    if (trackingBoxRef.current) {
      const pulse = 1 + Math.sin(t * 4.0) * 0.02;
      trackingBoxRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* 3D Biometric Human Face Structure */}
      <group ref={headMeshRef} position={[0, 0, 0]}>
        {/* Head Silhouette Contour */}
        <Sphere args={[1.05, 24, 24]} scale={[0.82, 1.15, 0.8]}>
          <meshStandardMaterial
            color="#0E343E"
            wireframe
            emissive="#F9BE4A"
            emissiveIntensity={0.9}
          />
        </Sphere>
        
        {/* Chin & Jaw Structure */}
        <Box args={[0.8, 0.6, 0.5]} position={[0, -1.0, 0.15]}>
          <meshStandardMaterial color="#0E343E" wireframe emissive="#FFE18F" emissiveIntensity={0.6} />
        </Box>

        {/* 68-Point Facial Biometric Keypoints */}
        {/* Eye Landmarks */}
        <Sphere args={[0.09, 12, 12]} position={[-0.35, 0.2, 0.7]}>
          <meshBasicMaterial color="#FFE18F" />
        </Sphere>
        <Sphere args={[0.09, 12, 12]} position={[0.35, 0.2, 0.7]}>
          <meshBasicMaterial color="#FFE18F" />
        </Sphere>

        {/* Eyebrow Arch Points */}
        <Line points={[[-0.55, 0.45, 0.65], [-0.35, 0.52, 0.7], [-0.15, 0.45, 0.68]]} color="#F9BE4A" lineWidth={2} />
        <Line points={[[0.15, 0.45, 0.68], [0.35, 0.52, 0.7], [0.55, 0.45, 0.65]]} color="#F9BE4A" lineWidth={2} />

        {/* Nose Bridge and Tip */}
        <Sphere args={[0.08, 12, 12]} position={[0, -0.12, 0.85]}>
          <meshBasicMaterial color="#F9BE4A" />
        </Sphere>
        <Line points={[[0, 0.3, 0.75], [0, -0.12, 0.85]]} color="#FFE18F" lineWidth={2} />

        {/* Cheekbone Landmark Nodes */}
        <Sphere args={[0.06, 10, 10]} position={[-0.65, -0.1, 0.6]}>
          <meshBasicMaterial color="#FFE18F" />
        </Sphere>
        <Sphere args={[0.06, 10, 10]} position={[0.65, -0.1, 0.6]}>
          <meshBasicMaterial color="#FFE18F" />
        </Sphere>

        {/* Lip Contour Landmarks */}
        <Line points={[[-0.28, -0.55, 0.68], [0, -0.50, 0.75], [0.28, -0.55, 0.68], [0, -0.62, 0.73], [-0.28, -0.55, 0.68]]} color="#F9BE4A" lineWidth={2} />

        {/* Dynamic Targeting HUD Bounding Box */}
        <group ref={trackingBoxRef} position={[0, 0, 0.95]}>
          {/* Top-Left Bracket */}
          <Line points={[[-1.1, 1.2, 0], [-1.35, 1.2, 0], [-1.35, 0.9, 0]]} color={step === 5 ? "#ef4444" : "#F9BE4A"} lineWidth={3.5} />
          {/* Top-Right Bracket */}
          <Line points={[[1.1, 1.2, 0], [1.35, 1.2, 0], [1.35, 0.9, 0]]} color={step === 5 ? "#ef4444" : "#F9BE4A"} lineWidth={3.5} />
          {/* Bottom-Left Bracket */}
          <Line points={[[-1.1, -1.3, 0], [-1.35, -1.3, 0], [-1.35, -1.0, 0]]} color={step === 5 ? "#ef4444" : "#F9BE4A"} lineWidth={3.5} />
          {/* Bottom-Right Bracket */}
          <Line points={[[1.1, -1.3, 0], [1.35, -1.3, 0], [1.35, -1.0, 0]]} color={step === 5 ? "#ef4444" : "#F9BE4A"} lineWidth={3.5} />

          {/* Sweeping Laser Beam */}
          <group ref={scanLaserRef}>
            <Line points={[[-1.3, 0, 0], [1.3, 0, 0]]} color="#FFE18F" lineWidth={3.5} />
          </group>

          {/* Real-time Tracking HUD Overlay Tag */}
          <Html position={[1.4, 0.8, 0]} distanceFactor={6} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: step === 5 ? 'rgba(239, 68, 68, 0.95)' : 'rgba(7, 25, 30, 0.95)',
              border: `1.5px solid ${step === 5 ? '#ef4444' : '#F9BE4A'}`,
              borderRadius: '8px',
              padding: '8px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#ffffff',
              boxShadow: '0 0 20px rgba(249, 190, 74, 0.45)',
              whiteSpace: 'nowrap'
            }}>
              {step === 5 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={15} color="#fff" />
                  <span>UNKNOWN VISITOR: ALERT SENT</span>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FFE18F', fontWeight: 700 }}>
                    <CheckCircle2 size={14} color="#F9BE4A" />
                    <span>FACE TRACKED: 99.4% MATCH</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '2px' }}>
                    TRACK_ID: #COG-8492 | Sub-50ms Vision Latency
                  </div>
                </div>
              )}
            </div>
          </Html>
        </group>
      </group>

      <gridHelper args={[10, 10, '#F9BE4A', '#0E343E']} position={[0, -1.8, 0]} />
    </group>
  );
};

// ==========================================
// 2. MODERN WEB DEVELOPMENT ANIMATION
// ==========================================
const WebDevSubScene = () => {
  const browserRef = useRef();
  const mobileRef = useRef();
  const codeTagRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (browserRef.current) {
      browserRef.current.rotation.y = Math.sin(t * 0.5) * 0.15 - 0.1;
      browserRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    }
    if (mobileRef.current) {
      mobileRef.current.rotation.y = -Math.sin(t * 0.6) * 0.15 + 0.2;
      mobileRef.current.position.y = Math.cos(t * 1.4) * 0.06;
    }
    if (codeTagRef.current) {
      codeTagRef.current.rotation.z += delta * 1.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Desktop Browser Window Frame */}
      <group ref={browserRef} position={[-0.8, 0, 0]}>
        <Box args={[3.2, 2.1, 0.1]}>
          <meshStandardMaterial color="#0E343E" metalness={0.8} roughness={0.2} />
        </Box>

        {/* Browser Header / Title Bar */}
        <Box args={[3.16, 0.28, 0.12]} position={[0, 0.9, 0.02]}>
          <meshStandardMaterial color="#07191E" metalness={0.9} />
        </Box>

        {/* macOS Window Controls */}
        <Sphere args={[0.05, 12, 12]} position={[-1.4, 0.9, 0.09]}>
          <meshBasicMaterial color="#ef4444" />
        </Sphere>
        <Sphere args={[0.05, 12, 12]} position={[-1.25, 0.9, 0.09]}>
          <meshBasicMaterial color="#F9BE4A" />
        </Sphere>
        <Sphere args={[0.05, 12, 12]} position={[-1.1, 0.9, 0.09]}>
          <meshBasicMaterial color="#10b981" />
        </Sphere>

        {/* Browser URL Bar */}
        <Box args={[1.5, 0.14, 0.12]} position={[0, 0.9, 0.04]}>
          <meshStandardMaterial color="#0E343E" emissive="#FFE18F" emissiveIntensity={0.2} />
        </Box>

        {/* Web Viewport Content Layout */}
        {/* Navigation Bar */}
        <Box args={[2.9, 0.18, 0.11]} position={[0, 0.62, 0.02]}>
          <meshStandardMaterial color="#07191E" emissive="#F9BE4A" emissiveIntensity={0.4} />
        </Box>

        {/* Hero Section Banner */}
        <Box args={[2.9, 0.65, 0.11]} position={[0, 0.12, 0.02]}>
          <meshStandardMaterial color="#07191E" emissive="#22d3ee" emissiveIntensity={0.5} />
        </Box>

        {/* 3 Column Feature Cards */}
        <Box args={[0.9, 0.45, 0.11]} position={[-0.98, -0.52, 0.02]}>
          <meshStandardMaterial color="#0E343E" wireframe emissive="#FFE18F" emissiveIntensity={0.8} />
        </Box>
        <Box args={[0.9, 0.45, 0.11]} position={[0, -0.52, 0.02]}>
          <meshStandardMaterial color="#0E343E" wireframe emissive="#F9BE4A" emissiveIntensity={0.8} />
        </Box>
        <Box args={[0.9, 0.45, 0.11]} position={[0.98, -0.52, 0.02]}>
          <meshStandardMaterial color="#0E343E" wireframe emissive="#10b981" emissiveIntensity={0.8} />
        </Box>
      </group>

      {/* Companion Responsive Mobile Viewport */}
      <group ref={mobileRef} position={[1.9, -0.2, 0.4]}>
        {/* Phone Body */}
        <Box args={[1.0, 1.9, 0.08]}>
          <meshStandardMaterial color="#0E343E" metalness={0.9} roughness={0.1} />
        </Box>
        {/* Screen */}
        <Box args={[0.92, 1.76, 0.09]} position={[0, 0, 0.01]}>
          <meshStandardMaterial color="#07191E" emissive="#FFE18F" emissiveIntensity={0.3} />
        </Box>
        {/* Mobile Header & Content Wireframe */}
        <Box args={[0.8, 0.15, 0.1]} position={[0, 0.72, 0.02]}>
          <meshStandardMaterial color="#F9BE4A" />
        </Box>
        <Box args={[0.8, 0.4, 0.1]} position={[0, 0.35, 0.02]}>
          <meshStandardMaterial color="#22d3ee" wireframe />
        </Box>
        <Box args={[0.8, 0.3, 0.1]} position={[0, -0.1, 0.02]}>
          <meshStandardMaterial color="#10b981" wireframe />
        </Box>
        <Box args={[0.8, 0.3, 0.1]} position={[0, -0.5, 0.02]}>
          <meshStandardMaterial color="#FFE18F" wireframe />
        </Box>
      </group>

      {/* Floating 3D Code Symbol (< / >) */}
      <group ref={codeTagRef} position={[1.4, 1.1, 0.6]}>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
          <Torus args={[0.3, 0.05, 16, 32]}>
            <meshStandardMaterial color="#F9BE4A" emissive="#F9BE4A" emissiveIntensity={2.5} />
          </Torus>
          <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '14px',
              color: '#FFE18F',
              textShadow: '0 0 10px rgba(249, 190, 74, 0.8)'
            }}>
              &lt;/&gt;
            </div>
          </Html>
        </Float>
      </group>

      {/* Web Technology Indicator Badge */}
      <Html position={[-0.8, -1.35, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(7, 25, 30, 0.95)',
          border: '1.5px solid #22d3ee',
          padding: '6px 16px',
          borderRadius: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#22d3ee',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
        }}>
          RESPONSIVE WEB PLATFORMS // REACT & FASTAPI
        </div>
      </Html>
    </group>
  );
};

// ==========================================
// 3. CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE ANIMATION
// ==========================================
const SoftwareSubScene = () => {
  const rackRef = useRef();
  const packet1Ref = useRef();
  const packet2Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (rackRef.current) {
      rackRef.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    }
    if (packet1Ref.current) {
      packet1Ref.current.position.x = -1.2 + ((t * 1.5) % 2.4);
      packet1Ref.current.position.y = 0.8 - ((t * 0.8) % 1.6);
    }
    if (packet2Ref.current) {
      packet2Ref.current.position.x = 1.2 - ((t * 1.2) % 2.4);
      packet2Ref.current.position.y = -0.5 + ((t * 0.6) % 1.2);
    }
  });

  return (
    <group ref={rackRef} position={[0, 0, 0]}>
      {/* Central Microservices Server Rack Cluster */}
      <group position={[-1.4, 0, 0]}>
        {/* Server Rack Frame */}
        <Box args={[1.2, 2.4, 1.0]}>
          <meshStandardMaterial color="#0E343E" metalness={0.8} roughness={0.2} />
        </Box>
        {/* 4 Stacked Blade Servers */}
        {[-0.8, -0.25, 0.3, 0.85].map((y, idx) => (
          <group key={idx} position={[0, y, 0.05]}>
            <Box args={[1.1, 0.4, 0.95]}>
              <meshStandardMaterial color="#07191E" emissive="#F9BE4A" emissiveIntensity={0.5} />
            </Box>
            {/* Blinking Status LEDs */}
            <Sphere args={[0.04, 10, 10]} position={[-0.4, 0, 0.5]}>
              <meshBasicMaterial color="#10b981" />
            </Sphere>
            <Sphere args={[0.04, 10, 10]} position={[-0.28, 0, 0.5]}>
              <meshBasicMaterial color="#FFE18F" />
            </Sphere>
            <Sphere args={[0.04, 10, 10]} position={[-0.16, 0, 0.5]}>
              <meshBasicMaterial color="#22d3ee" />
            </Sphere>
          </group>
        ))}
      </group>

      {/* API Gateway & Orchestration Core */}
      <group position={[0.6, 0.6, 0]}>
        <Float speed={2} floatIntensity={0.4}>
          <Box args={[1.0, 1.0, 1.0]}>
            <meshStandardMaterial color="#0E343E" wireframe emissive="#F9BE4A" emissiveIntensity={1.8} />
          </Box>
          <Box args={[0.6, 0.6, 0.6]}>
            <meshStandardMaterial color="#FFE18F" emissive="#FFE18F" emissiveIntensity={2.0} />
          </Box>
          <Html position={[0, -0.75, 0]} center style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(7, 25, 30, 0.94)',
              border: '1px solid #F9BE4A',
              padding: '3px 10px',
              borderRadius: '4px',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: '#FFE18F',
              whiteSpace: 'nowrap'
            }}>
              API GATEWAY / FASTAPI
            </div>
          </Html>
        </Float>
      </group>

      {/* Database Cluster Cylinder Stack */}
      <group position={[1.8, -0.6, 0]}>
        <Cylinder args={[0.55, 0.55, 0.35, 24]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#0E343E" emissive="#10b981" emissiveIntensity={0.8} metalness={0.8} />
        </Cylinder>
        <Cylinder args={[0.55, 0.55, 0.35, 24]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color="#0E343E" emissive="#10b981" emissiveIntensity={0.8} metalness={0.8} />
        </Cylinder>
        <Cylinder args={[0.55, 0.55, 0.35, 24]} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#0E343E" emissive="#10b981" emissiveIntensity={0.8} metalness={0.8} />
        </Cylinder>
        <Html position={[0, -0.85, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(7, 25, 30, 0.94)',
            border: '1px solid #10b981',
            padding: '3px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: '#10b981',
            whiteSpace: 'nowrap'
          }}>
            POSTGRESQL & REDIS DB
          </div>
        </Html>
      </group>

      {/* Network Pipeline Lines */}
      <Line points={[[-0.8, 0.6, 0], [0.1, 0.6, 0]]} color="#F9BE4A" lineWidth={2.5} />
      <Line points={[[0.6, 0.1, 0], [1.8, -0.2, 0]]} color="#10b981" lineWidth={2.5} />
      <Line points={[[-0.8, -0.5, 0], [1.3, -0.5, 0]]} color="#22d3ee" lineWidth={2} />

      {/* Glowing Data Packets in Motion */}
      <Sphere ref={packet1Ref} args={[0.09, 12, 12]} position={[-0.4, 0.6, 0]}>
        <meshBasicMaterial color="#FFE18F" />
      </Sphere>
      <Sphere ref={packet2Ref} args={[0.09, 12, 12]} position={[1.0, -0.5, 0]}>
        <meshBasicMaterial color="#22d3ee" />
      </Sphere>

      {/* System Telemetry Badge */}
      <Html position={[0, -1.6, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(7, 25, 30, 0.95)',
          border: '1.5px solid #10b981',
          padding: '6px 16px',
          borderRadius: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#10b981',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
        }}>
          MICROSERVICES & CLOUD ARCHITECTURE // 99.9% UPTIME
        </div>
      </Html>
    </group>
  );
};

// ==========================================
// 4. STUDENT PROJECTS & TECHNICAL SOLUTIONS ANIMATION
// ==========================================
const StudentLabSubScene = ({ activeDomain = 0 }) => {
  const domains = [
    { title: "AI & Computer Vision Capstone", tech: "PyTorch, YOLOv11, OpenCV", color: "#F9BE4A" },
    { title: "IoT & Embedded Hardware", tech: "Raspberry Pi, ESP32, Sensors", color: "#FFE18F" },
    { title: "Full-Stack Web Engineering", tech: "FastAPI, React, PostgreSQL", color: "#22d3ee" },
    { title: "Robotics & Automation", tech: "ROS2, Microcontrollers, Motors", color: "#10b981" },
    { title: "Machine Learning & Analytics", tech: "Scikit-Learn, Predictive Models", color: "#c084fc" },
    { title: "IEEE Documentation & Viva Prep", tech: "Complete Code, Diagrams, Report", color: "#FFE18F" }
  ];

  const boardRef = useRef();
  const ledPulseRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (boardRef.current) {
      boardRef.current.rotation.y = Math.sin(t * 0.6) * 0.3;
      boardRef.current.rotation.x = 0.45 + Math.sin(t * 0.5) * 0.1;
    }
    if (ledPulseRef.current) {
      const p = 1 + Math.sin(t * 6.0) * 0.2;
      ledPulseRef.current.scale.set(p, p, p);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Hardware Prototype Development Board in Center */}
      <group ref={boardRef} position={[0, 0.3, 0]}>
        <Float speed={2.5} floatIntensity={0.4}>
          {/* Main PCB Board Base */}
          <Box args={[2.5, 1.7, 0.1]}>
            <meshStandardMaterial color="#0E343E" metalness={0.8} roughness={0.2} emissive="#07191E" />
          </Box>

          {/* Central Microprocessor / SoC Chip */}
          <Box args={[0.7, 0.7, 0.14]} position={[-0.2, 0.05, 0.05]}>
            <meshStandardMaterial color="#07191E" emissive="#F9BE4A" emissiveIntensity={1.8} metalness={0.9} />
          </Box>
          <Box args={[0.55, 0.55, 0.16]} position={[-0.2, 0.05, 0.06]}>
            <meshStandardMaterial color="#FFE18F" wireframe />
          </Box>

          {/* GPIO Pin Header Strips */}
          <Box args={[2.1, 0.12, 0.15]} position={[0, 0.7, 0.05]}>
            <meshStandardMaterial color="#07191E" metalness={1.0} />
          </Box>
          <Box args={[2.1, 0.12, 0.15]} position={[0, -0.7, 0.05]}>
            <meshStandardMaterial color="#07191E" metalness={1.0} />
          </Box>

          {/* Sensor Capacitors & Hardware Crystals */}
          <Cylinder args={[0.1, 0.1, 0.25, 16]} position={[-0.9, 0.3, 0.1]}>
            <meshStandardMaterial color="#F9BE4A" emissive="#F9BE4A" emissiveIntensity={0.9} />
          </Cylinder>
          <Cylinder args={[0.1, 0.1, 0.25, 16]} position={[-0.9, -0.1, 0.1]}>
            <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} />
          </Cylinder>

          {/* Blinking Status LEDs */}
          <Sphere ref={ledPulseRef} args={[0.06, 12, 12]} position={[0.8, 0.35, 0.09]}>
            <meshBasicMaterial color="#10b981" />
          </Sphere>
          <Sphere args={[0.06, 12, 12]} position={[0.8, 0.15, 0.09]}>
            <meshBasicMaterial color="#F9BE4A" />
          </Sphere>
          <Sphere args={[0.06, 12, 12]} position={[0.8, -0.05, 0.09]}>
            <meshBasicMaterial color="#ef4444" />
          </Sphere>

          {/* PCB Circuit Traces */}
          <Line points={[[-0.6, 0.05, 0.06], [-0.9, 0.05, 0.06], [-0.9, 0.2, 0.06]]} color="#FFE18F" lineWidth={2} />
          <Line points={[[0.2, 0.05, 0.06], [0.7, 0.05, 0.06], [0.7, 0.25, 0.06]]} color="#F9BE4A" lineWidth={2} />
        </Float>
      </group>

      {/* Orbiting Project Domain Nodes */}
      {domains.map((d, index) => {
        const angle = (index / domains.length) * Math.PI * 2;
        const radius = 3.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius * 0.4;
        const y = -0.7 + Math.sin(angle * 2) * 0.25;
        const isActive = activeDomain === index;

        return (
          <group key={index} position={[x, y, z]}>
            <mesh scale={isActive ? 1.3 : 1.0}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial
                color={d.color}
                emissive={d.color}
                emissiveIntensity={isActive ? 2.5 : 1.0}
              />
            </mesh>
            <Html position={[0, -0.5, 0]} center style={{ pointerEvents: 'none' }}>
              <div style={{
                background: 'rgba(7, 25, 30, 0.94)',
                border: `1px solid ${d.color}`,
                borderRadius: '6px',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#fff',
                whiteSpace: 'nowrap',
                transform: isActive ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>
                {d.title}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Student Capstone Badge */}
      <Html position={[0, -1.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(7, 25, 30, 0.95)',
          border: '1.5px solid #F9BE4A',
          padding: '6px 16px',
          borderRadius: '20px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#FFE18F',
          whiteSpace: 'nowrap',
          boxShadow: '0 0 20px rgba(249, 190, 74, 0.4)'
        }}>
          STUDENT CAPSTONES // COMPLETE IEEE CODE & WORKING PROTOTYPES
        </div>
      </Html>
    </group>
  );
};

// ==========================================
// MASTER STORY EXPERIENCE WRAPPER
// ==========================================
export const AboutStoryExperience = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [cctvSubStep, setCctvSubStep] = useState(2);
  const [studentDomain, setStudentDomain] = useState(0);

  useEffect(() => {
    if (activeStage === 1) {
      const interval = setInterval(() => {
        setCctvSubStep(prev => (prev + 1) % 6);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [activeStage]);

  useEffect(() => {
    if (activeStage === 4) {
      const interval = setInterval(() => {
        setStudentDomain(prev => (prev + 1) % 6);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeStage]);

  const stages = [
    {
      id: 0,
      title: "COGNISYS AI CORE",
      subtitle: "INTELLIGENCE IN MOTION",
      desc: "Explore how cognisys bridges state-of-the-art artificial intelligence, computer vision, and modern software architectures.",
      cta: "Explore Capabilities",
      component: <AICoreSubScene />
    },
    {
      id: 1,
      title: "AI CCTV MONITORING & INTELLIGENT SURVEILLANCE",
      subtitle: "REAL-TIME FACE TRACKING & BIOMETRICS",
      desc: "Watch as incoming camera feeds are processed with sub-50ms latency. Detect human presence, track facial landmarks in real time, verify identity against secure databases, and automate attendance while triggering instant security alarms.",
      cta: "Explore AI CCTV Solution",
      link: "/services/ai-cctv",
      component: <FaceTrackingSubScene step={cctvSubStep} />
    },
    {
      id: 2,
      title: "HIGH-PERFORMANCE WEB DEVELOPMENT",
      subtitle: "MODERN WEB PLATFORMS & CLOUD APPLICATIONS",
      desc: "Modern digital products designed for speed, security, and visual excellence. From responsive React frontends to scalable Python FastAPI REST backends and PostgreSQL database clusters.",
      cta: "Explore Web Development",
      link: "/services/web-development",
      component: <WebDevSubScene />
    },
    {
      id: 3,
      title: "CUSTOM SOFTWARE SYSTEMS & CLOUD ARCHITECTURE",
      subtitle: "DISTRIBUTED MICROSERVICES & AUTOMATION",
      desc: "End-to-end software engineering for mission-critical operations. Asynchronous queues, containerized microservices, automated CI/CD pipelines, and high-concurrency database architectures.",
      cta: "Explore Software Systems",
      link: "/services/software-development",
      component: <SoftwareSubScene />
    },
    {
      id: 4,
      title: "STUDENT INNOVATION LAB & CAPSTONES",
      subtitle: "FROM IDEA TO WORKING IEEE PROTOTYPE",
      desc: "Complete hands-on development, mentoring, and source code for university final-year engineering projects in AI/ML, Computer Vision, Data Science, IoT, Robotics, and Full-Stack Engineering.",
      cta: "Discuss Your Project",
      link: "/services/student-projects",
      component: <StudentLabSubScene activeDomain={studentDomain} />
    }
  ];

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Interactive Stage Scrub Navigation Bar */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 30,
        background: 'rgba(7, 25, 30, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 0'
      }}>
        <div className="container-custom" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflowX: 'auto',
          gap: '12px',
          paddingBottom: '4px'
        }}>
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                style={{
                  background: isActive ? 'rgba(0, 180, 216, 0.22)' : 'rgba(255, 255, 255, 0.08)',
                  border: isActive ? '1.5px solid #00B4D8' : '1px solid rgba(255, 255, 255, 0.18)',
                  color: isActive ? '#38BDF8' : '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ color: isActive ? '#38BDF8' : '#00B4D8' }}>0{stage.id + 1}.</span>
                <span>{stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Stage Viewport */}
      <div style={{
        minHeight: '620px',
        height: '75vh',
        width: '100%',
        position: 'relative',
        background: 'radial-gradient(circle at center, rgba(0, 180, 216, 0.06) 0%, #FFFFFF 80%)',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div className="scanline-effect" />

        {/* Canvas Viewport */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <Suspense fallback={<CanvasFallback title="Rendering Interactive Environment..." />}>
            <Canvas
              camera={{ position: [0.8, 1.0, 5.8], fov: 42 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={1.1} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFE18F" />
              <pointLight position={[-5, -2, -2]} intensity={0.9} color="#0E343E" />
              
              <group position={[0.7, 0.2, 0]}>
                {stages[activeStage].id === 0 && <AICoreSubScene />}
                {stages[activeStage].id === 1 && <FaceTrackingSubScene step={cctvSubStep} />}
                {stages[activeStage].id === 2 && <WebDevSubScene />}
                {stages[activeStage].id === 3 && <SoftwareSubScene />}
                {stages[activeStage].id === 4 && <StudentLabSubScene activeDomain={studentDomain} />}
              </group>
            </Canvas>
          </Suspense>
        </div>

        {/* HUD Overlay Details Card */}
        <div className="story-hud-card hud-card dark-panel bg-dark" style={{
          position: 'absolute',
          bottom: '28px',
          left: '28px',
          maxWidth: '440px',
          background: 'rgba(7, 25, 30, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(0, 180, 216, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '22px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.85)',
          zIndex: 20
        }}>
          <div className="badge" style={{ marginBottom: '10px', background: 'rgba(0, 180, 216, 0.2)', color: '#38BDF8', borderColor: 'rgba(0, 180, 216, 0.4)' }}>
            STAGE 0{stages[activeStage].id + 1} OF 05
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '4px', fontWeight: 800 }}>
            {stages[activeStage].title}
          </h2>
          <div style={{
            fontSize: '0.85rem',
            color: '#38BDF8',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            {stages[activeStage].subtitle}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#FFFFFF', lineHeight: 1.6, marginBottom: '18px', opacity: 0.95 }}>
            {stages[activeStage].desc}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {stages[activeStage].link ? (
              <Link to={stages[activeStage].link} className="btn-primary" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
                <span>{stages[activeStage].cta}</span>
                <ArrowRight size={14} />
              </Link>
            ) : (
              <button
                onClick={() => setActiveStage(prev => (prev + 1) % stages.length)}
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '8px 18px' }}
              >
                <span>Next Experience</span>
                <ArrowRight size={14} />
              </button>
            )}

            {stages[activeStage].id === 1 && (
              <button
                onClick={() => setCctvSubStep(prev => (prev + 1) % 6)}
                className="btn-secondary-light"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                Simulate Detection ({cctvSubStep + 1}/6)
              </button>
            )}

            {stages[activeStage].id === 4 && (
              <button
                onClick={() => setStudentDomain(prev => (prev + 1) % 6)}
                className="btn-secondary-light"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                Next Project Domain ({studentDomain + 1}/6)
              </button>
            )}
          </div>
        </div>

        {/* Navigation Step Arrows */}
        <div className="story-nav-arrows" style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          display: 'flex',
          gap: '8px',
          zIndex: 25
        }}>
          <button
            onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
            disabled={activeStage === 0}
            className="btn-secondary"
            style={{ padding: '10px 14px', borderRadius: '50%', opacity: activeStage === 0 ? 0.3 : 1 }}
          >
            ←
          </button>
          <button
            onClick={() => setActiveStage(prev => Math.min(stages.length - 1, prev + 1))}
            disabled={activeStage === stages.length - 1}
            className="btn-secondary"
            style={{ padding: '10px 14px', borderRadius: '50%', opacity: activeStage === stages.length - 1 ? 0.3 : 1 }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
