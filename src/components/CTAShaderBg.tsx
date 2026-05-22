import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;
  varying vec2 vUv;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865, 0.366025403, -0.577350269, 0.024390243);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0*fract(p*C.www)-1.0;
    vec3 h = abs(x)-0.5;
    vec3 ox = floor(x+0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x = a0.x*x0.x + h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = vUv;
    float n = snoise(uv*2.5 + uTime*0.12);
    float n2 = snoise(uv*1.5 - uTime*0.08);
    vec3 col = mix(uA, uB, smoothstep(-1.0, 1.0, n));
    col = mix(col, uC, smoothstep(-1.0, 1.0, n2)*0.55);
    col *= 0.9;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Mesh() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  useFrame((s) => {
    if (ref.current) ref.current.uniforms.uTime.value = s.clock.getElapsedTime();
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 0 },
          uA: { value: new THREE.Color("#0A0A0A") },
          uB: { value: new THREE.Color("#1a2960") },
          uC: { value: new THREE.Color("#E53935") },
        }}
      />
    </mesh>
  );
}

export default function CTAShaderBg() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Mesh />
    </Canvas>
  );
}
