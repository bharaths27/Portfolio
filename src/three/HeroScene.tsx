/* The persistent 3D background: a glowing "neural core" wrapped in scan rings,
   a node network, and a shader particle field. It lives in a fixed canvas behind
   the whole page and reacts to the pointer and to scroll progress. */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { scrollState } from '../hooks/scrollState'

const PALETTE = [new THREE.Color('#5ee7ff'), new THREE.Color('#8b5cf6'), new THREE.Color('#fb923c'), new THREE.Color('#34d399')]

/* Pick a palette color for a 0..1 progress value, blending between stops. */
function paletteAt(t: number, out: THREE.Color) {
  const x = Math.min(Math.max(t, 0), 0.9999) * (PALETTE.length - 1)
  const i = Math.floor(x)
  return out.copy(PALETTE[i]).lerp(PALETTE[i + 1], x - i)
}

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uScroll;
  attribute float aScale;
  attribute float aRandom;
  varying float vRandom;
  void main() {
    vec3 p = position;
    float wave = sin(uTime * 0.6 + aRandom * 6.2831) * 0.08;
    p += normalize(p) * (wave + uScroll * 1.4 * aRandom);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
    vRandom = aRandom;
  }
`

const particleFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vRandom;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    vec3 c = mix(uColorA, uColorB, vRandom);
    gl_FragColor = vec4(c, a * 0.85);
  }
`

const coreVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    vec3 p = position;
    // Cheap layered sine "noise" so the core breathes without a noise library.
    float n = sin(p.x * 3.1 + uTime * 1.3) * sin(p.y * 2.7 + uTime * 1.1) * sin(p.z * 3.3 + uTime * 0.9);
    p += normal * n * 0.12;
    vec4 world = modelMatrix * vec4(p, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(cameraPosition - world.xyz);
    vPos = p;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uRim;
  uniform vec3 uRim2;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vPos;
  void main() {
    float fres = pow(1.0 - abs(dot(normalize(vNormal), vView)), 2.4);
    vec3 base = vec3(0.02, 0.025, 0.07);
    vec3 rim = mix(uRim, uRim2, 0.5 + 0.5 * sin(vPos.y * 2.0 + uTime));
    // A thin scan band sweeping over the surface.
    float band = smoothstep(0.03, 0.0, abs(fract(vPos.y * 0.6 - uTime * 0.25) - 0.5));
    vec3 col = base + rim * fres * 1.6 + uRim * band * 0.6;
    gl_FragColor = vec4(col, 1.0);
  }
`

function CoreMesh() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uRim: { value: new THREE.Color('#5ee7ff') }, uRim2: { value: new THREE.Color('#8b5cf6') } }),
    [],
  )
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame((_, dt) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value += dt
    mat.current.uniforms.uRim.value.lerp(paletteAt(scrollState.page, tmp), 0.05)
  })
  return (
    <mesh>
      <icosahedronGeometry args={[1.05, 32]} />
      <shaderMaterial ref={mat} vertexShader={coreVertex} fragmentShader={coreFragment} uniforms={uniforms} />
    </mesh>
  )
}

function ParticleField({ count }: { count: number }) {
  const { gl } = useThree()
  const mat = useRef<THREE.ShaderMaterial>(null)
  const pts = useRef<THREE.Points>(null)

  const [positions, scales, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sc = new Float32Array(count)
    const rnd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // Points on a thick spherical shell, denser toward the inside.
      const r = 3 + Math.pow(Math.random(), 2) * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sc[i] = 0.4 + Math.random() * 1.2
      rnd[i] = Math.random()
    }
    return [pos, sc, rnd]
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 38 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color('#5ee7ff') },
      uColorB: { value: new THREE.Color('#8b5cf6') },
    }),
    [gl],
  )

  const tmp = useMemo(() => new THREE.Color(), [])

  useFrame((_, dt) => {
    if (!mat.current || !pts.current) return
    const u = mat.current.uniforms
    u.uTime.value += dt
    u.uScroll.value = THREE.MathUtils.lerp(u.uScroll.value, scrollState.hero, 0.08)
    u.uColorA.value.lerp(paletteAt(scrollState.page, tmp), 0.05)
    pts.current.rotation.y += dt * 0.025
  })

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* A small graph of nodes with edges between close neighbours: the "network". */
function Network({ nodes = 70 }: { nodes?: number }) {
  const ref = useRef<THREE.Group>(null)
  const { nodePos, linePos } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < nodes; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(2.1 + Math.random() * 0.9)
      pts.push(v)
    }
    const lines: number[] = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < 1.15) lines.push(...pts[i].toArray(), ...pts[j].toArray())
      }
    }
    return {
      nodePos: new Float32Array(pts.flatMap((p) => p.toArray())),
      linePos: new Float32Array(lines),
    }
  }, [nodes])

  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y -= dt * 0.08
      ref.current.rotation.x += dt * 0.02
    }
  })

  return (
    <group ref={ref}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e0f2fe" size={0.06} sizeAttenuation transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  )
}

function Ring({ radius, speed, tilt, color }: { radius: number; speed: number; tilt: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed
  })
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.008, 8, 160, Math.PI * 1.6]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Core() {
  const group = useRef<THREE.Group>(null)
  const wire = useRef<THREE.Mesh>(null)
  const { viewport, size } = useThree()
  const mobile = size.width < 900

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    // Hero: core sits to the right on desktop. As you scroll it drifts and shrinks.
    const h = scrollState.hero
    const baseX = mobile ? 0 : Math.min(viewport.width * 0.22, 2.4)
    const targetX = baseX + (mobile ? 0 : h * 1.8)
    const targetY = mobile ? 2.1 - h * 1.2 : -h * 0.6
    const targetS = (mobile ? 0.6 : 1) * (1 - h * 0.45)
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06)
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.06)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetS, 0.06))
    // Pointer parallax and slow spin tied to page progress.
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.4 + scrollState.page * Math.PI * 2, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.3, 0.05)
    if (wire.current) {
      wire.current.rotation.x += dt * 0.15
      wire.current.rotation.y += dt * 0.1
    }
  })

  return (
    <group ref={group}>
      <CoreMesh />
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial color="#5ee7ff" wireframe transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <Ring radius={1.85} speed={0.4} tilt={[Math.PI / 2.2, 0, 0]} color="#5ee7ff" />
      <Ring radius={2.05} speed={-0.25} tilt={[Math.PI / 3, Math.PI / 5, 0]} color="#a78bfa" />
      <Ring radius={2.3} speed={0.18} tilt={[Math.PI / 1.7, -Math.PI / 6, 0]} color="#fb923c" />
      <Network nodes={mobile ? 45 : 70} />
    </group>
  )
}

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.5, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3, 0.04)
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ reduced }: { reduced: boolean }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 900
  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      frameloop={reduced ? 'demand' : 'always'}
      eventSource={document.body}
      eventPrefix="client"
    >
      <AdaptiveDpr pixelated />
      <ParticleField count={mobile ? 2200 : 5000} />
      <Core />
      <CameraRig />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={0.15} intensity={0.9} radius={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
