import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

function AnimatedPlane({ imageUrl }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const texture = useTexture(imageUrl);

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.2;
    materialRef.current.uniforms.uTime.value = t;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.7, 1.8, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 }, uTexture: { value: texture } }}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin((pos.x * 4.0) + uTime) * 0.03;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          void main() {
            vec2 waveUv = vUv;
            waveUv.x += sin((vUv.y * 14.0) + uTime) * 0.006;
            gl_FragColor = texture2D(uTexture, waveUv);
          }
        `}
      />
    </mesh>
  );
}

export default function AnimatedWallpaperPreview({ imageUrl }) {
  return (
    <div className="preview-shell">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[1.5, 2, 2.5]} intensity={1} />
        <AnimatedPlane imageUrl={imageUrl} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
