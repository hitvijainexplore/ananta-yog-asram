import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function MountainScene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.06, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * -0.025, 0.03);
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.16) * 0.03;
  });
  return <group ref={group} position={[0, -0.6, -2]}><mesh position={[0, -0.2, -1.3]} rotation={[-0.04, 0, 0]}><planeGeometry args={[11, 4, 1, 1]} /><meshBasicMaterial color="#c9c5a9" transparent opacity={0.23} /></mesh><mesh position={[-1.8, 0.3, -0.5]} rotation={[0, 0.16, 0.02]}><coneGeometry args={[2.5, 2.8, 3]} /><meshBasicMaterial color="#52604b" transparent opacity={0.28} /></mesh><mesh position={[2, 0.1, -0.7]} rotation={[0, -0.12, -0.01]}><coneGeometry args={[3.2, 2.4, 3]} /><meshBasicMaterial color="#354b42" transparent opacity={0.35} /></mesh><Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.24}><mesh position={[0, 0.8, 0.4]} rotation={[0, 0, Math.PI / 4]}><torusGeometry args={[0.55, 0.035, 8, 32]} /><meshBasicMaterial color="#c4a76a" transparent opacity={0.5} /></mesh></Float><Sparkles count={35} scale={[9, 4, 4]} size={1.2} speed={0.16} color="#e8dbb6" /></group>;
}

export default function Scene() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="hero-canvas" aria-hidden="true">{visible && <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 42 }}><fog attach="fog" args={['#516054', 4, 11]} /><ambientLight intensity={0.7} /><MountainScene /></Canvas>}</div>;
}
