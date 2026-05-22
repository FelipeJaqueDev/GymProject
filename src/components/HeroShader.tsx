import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  uniform float uOpacity;
  varying vec2 vUv;

  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash3(i + vec2(0.0, 0.0)).x, hash3(i + vec2(1.0, 0.0)).x, u.x),
      mix(hash3(i + vec2(0.0, 1.0)).x, hash3(i + vec2(1.0, 1.0)).x, u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 18.0 - uTime * 2.5) * 0.012 * smoothstep(0.5, 0.0, dist);
    vec2 distort = uv;
    distort.x += noise(uv * 3.0 + uTime * 0.08) * 0.012;
    distort.y += noise(uv * 3.0 - uTime * 0.06) * 0.012;
    distort += ripple;

    vec4 col = texture2D(uTexture, distort);
    float vign = smoothstep(1.2, 0.3, distance(uv, vec2(0.5)));
    col.rgb *= mix(0.4, 1.0, vign);
    gl_FragColor = vec4(col.rgb, col.a * uOpacity);
  }
`;

function ShaderPlane({ src }: { src: string }) {
  const tex = useLoader(THREE.TextureLoader, src);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    const { x, y } = state.pointer;
    const tx = (x + 1) * 0.5;
    const ty = (y + 1) * 0.5;
    mouse.current.x += (tx - mouse.current.x) * 0.08;
    mouse.current.y += (ty - mouse.current.y) * 0.08;
    matRef.current.uniforms.uMouse.value = mouse.current;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTexture: { value: tex },
          uOpacity: { value: 1.0 },
        }}
        transparent
      />
    </mesh>
  );
}

export default function HeroShader({ src }: { src: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ShaderPlane src={src} />
    </Canvas>
  );
}
