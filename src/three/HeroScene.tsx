/* "Neural shield": the hero visual that sits behind Bharath's photo.
   A neural network ring (AI) surrounds a hexagonal shield (security).
   Data packets stream in from the edge: safe ones (blue / purple) pass through
   the shield, malicious ones (red) are stopped at it and flash. */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const BLUE = new THREE.Color('#4f8cff')
const PURPLE = new THREE.Color('#a78bfa')
const RED = new THREE.Color('#ff3b4a')
const SHIELD_R = 1.85

/* Nodes in a flat ring (annulus) around the shield, with edges between near neighbours. */
function NeuralRing() {
  const ref = useRef<THREE.Group>(null)
  const { nodes, lines } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < 90; i++) {
      const a = Math.random() * Math.PI * 2
      const r = 2.25 + Math.random() * 1.35
      pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 0.8))
    }
    const seg: number[] = []
    pts.forEach((p, i) => {
      // Connect each node to its two nearest neighbours: reads as a network, not a hairball.
      pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((x, y) => x.d - y.d)
        .slice(0, 2)
        .forEach(({ j }) => seg.push(...p.toArray(), ...pts[j].toArray()))
    })
    return { nodes: new Float32Array(pts.flatMap((p) => p.toArray())), lines: new Float32Array(seg) }
  }, [])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.03
  })

  return (
    <group ref={ref}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6d8dff" transparent opacity={0.28} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#c7d2fe" size={0.07} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  )
}

/* Hexagon outline helper. */
function hexPoints(r: number) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6
    pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0))
  }
  return pts
}

function Shield() {
  const outer = useRef<THREE.Group>(null)
  const scan = useRef<THREE.Mesh>(null)
  const hex1 = useMemo(() => new THREE.BufferGeometry().setFromPoints(hexPoints(SHIELD_R)), [])
  const hex2 = useMemo(() => new THREE.BufferGeometry().setFromPoints(hexPoints(SHIELD_R + 0.12)), [])

  useFrame((state, dt) => {
    if (outer.current) {
      outer.current.rotation.z -= dt * 0.08
      outer.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12
      outer.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.25) * 0.12
    }
    if (scan.current) scan.current.rotation.z += dt * 1.2
  })

  return (
    <group ref={outer}>
      <lineLoop geometry={hex1}>
        <lineBasicMaterial color="#a78bfa" toneMapped={false} />
      </lineLoop>
      <lineLoop geometry={hex2}>
        <lineBasicMaterial color="#4f8cff" transparent opacity={0.5} toneMapped={false} />
      </lineLoop>
      {/* Rotating scan arc, like a radar sweep along the shield. */}
      <mesh ref={scan}>
        <ringGeometry args={[SHIELD_R + 0.2, SHIELD_R + 0.26, 64, 1, 0, Math.PI * 0.45]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

interface Packet {
  angle: number
  r: number
  speed: number
  bad: boolean
  hit: number // seconds since a bad packet hit the shield, -1 if not yet
}

function newPacket(start = false): Packet {
  return {
    angle: Math.random() * Math.PI * 2,
    r: start ? 2 + Math.random() * 3 : 4.6 + Math.random() * 0.8,
    speed: 0.6 + Math.random() * 0.7,
    bad: Math.random() < 0.3,
    hit: -1,
  }
}

/* Packets travel inward. Bad ones stop at the shield and flash red; good ones pass and fade. */
function Packets({ count = 46, reduced }: { count?: number; reduced: boolean }) {
  const packets = useMemo(() => Array.from({ length: count }, () => newPacket(true)), [count])
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const colors = useMemo(() => new Float32Array(count * 3), [count])
  const geo = useRef<THREE.BufferGeometry>(null)
  const c = useMemo(() => new THREE.Color(), [])

  useFrame((_, dt) => {
    const step = reduced ? 0 : Math.min(dt, 0.05)
    packets.forEach((p, i) => {
      if (p.hit >= 0) {
        p.hit += step
        if (p.hit > 0.6) Object.assign(p, newPacket())
      } else {
        p.r -= p.speed * step
        if (p.bad && p.r <= SHIELD_R + 0.15) {
          p.r = SHIELD_R + 0.15
          p.hit = 0
        }
        if (!p.bad && p.r < 1.1) Object.assign(p, newPacket())
      }
      positions[i * 3] = Math.cos(p.angle) * p.r
      positions[i * 3 + 1] = Math.sin(p.angle) * p.r
      positions[i * 3 + 2] = 0.2
      // Fade in from the edge; a blocked packet flashes bright then fades out.
      const edge = THREE.MathUtils.clamp((5 - p.r) / 1.2, 0, 1)
      const flash = p.hit >= 0 ? 1.8 * (1 - p.hit / 0.6) : 1
      c.copy(p.bad ? RED : i % 2 ? BLUE : PURPLE).multiplyScalar(edge * flash)
      if (!p.bad && p.r < SHIELD_R) c.multiplyScalar(THREE.MathUtils.clamp((p.r - 1.1) / 0.7, 0, 1))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    })
    if (geo.current) {
      geo.current.attributes.position.needsUpdate = true
      geo.current.attributes.color.needsUpdate = true
    }
  })

  return (
    <points>
      <bufferGeometry ref={geo}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.13} vertexColors sizeAttenuation transparent depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Scene({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    const g = group.current
    if (!g || reduced) return
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.25, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.2, 0.05)
  })
  return (
    <group ref={group}>
      <NeuralRing />
      <Shield />
      <Packets reduced={reduced} />
    </group>
  )
}

export default function HeroScene({ reduced, active }: { reduced: boolean; active: boolean }) {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reduced || !active ? 'demand' : 'always'}
      eventSource={document.body}
      eventPrefix="client"
    >
      <Scene reduced={reduced} />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur luminanceThreshold={0.2} intensity={0.8} radius={0.6} />
      </EffectComposer>
    </Canvas>
  )
}
