"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getMood } from "@/lib/mood";

// The paper-craft pressure cooker.
// Normal: calm office worker with glasses. Typing builds pressure (swelling, red,
// grimace, steam). At full pressure, or on send, the head bursts into paper scraps,
// then pops back to normal and the cycle starts again.

const NORMAL = new THREE.Color("#C9CED8");
const RAGE = new THREE.Color("#A4262C");
const SCRAP_COLORS = ["#FBFBFA", "#E6E8EC", "#A4262C", "#A4262C", "#FF7A1F"].map(
  (c) => new THREE.Color(c)
);

const CHARS_TO_EXPLODE = 280; // typed characters from calm to blow-up
const SCRAP_COUNT = 80;
const STEAM_COUNT = 5;
const BURST_TIME = 1.5; // seconds the head stays gone
const REBUILD_TIME = 0.6;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

type Mode = "alive" | "burst" | "rebuild";

const Face: React.FC<{ animate: boolean }> = ({ animate }) => {
  const face = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const glasses = useRef<THREE.Group>(null);
  const browL = useRef<THREE.Mesh>(null);
  const browR = useRef<THREE.Mesh>(null);
  const mouth = useRef<THREE.Mesh>(null);
  const eyes = useRef<(THREE.Group | null)[]>([]);
  const pupils = useRef<(THREE.Mesh | null)[]>([]);
  const steam = useRef<(THREE.Mesh | null)[]>([]);
  const scraps = useRef<THREE.InstancedMesh>(null);
  const lenses = useRef<(THREE.Mesh | null)[]>([]);
  const fireball = useRef<THREE.Mesh>(null);
  const shock = useRef<THREE.Mesh>(null);
  const flash = useRef<THREE.PointLight>(null);

  const mode = useRef<Mode>("alive");
  const modeT = useRef(0);
  const lastBurst = useRef(getMood().burst);
  const baseChars = useRef(0);
  const pressure = useRef(0);
  const smile = useRef(0); // eased "calm result" smile

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const sim = useMemo(
    () => ({
      pos: new Float32Array(SCRAP_COUNT * 3),
      vel: new Float32Array(SCRAP_COUNT * 3),
      rot: new Float32Array(SCRAP_COUNT * 3),
      spin: new Float32Array(SCRAP_COUNT * 3),
      size: new Float32Array(SCRAP_COUNT),
      lensPos: new Float32Array(6),
      lensVel: new Float32Array(6),
      lensSpin: new Float32Array(6),
    }),
    []
  );

  const explode = () => {
    mode.current = "burst";
    modeT.current = 0;
    for (let i = 0; i < SCRAP_COUNT; i++) {
      // random direction on a sphere, biased a little upward
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const dx = r * Math.cos(a), dy = u + 0.25, dz = r * Math.sin(a);
      const speed = 2.2 + Math.random() * 3.6;
      sim.pos.set([dx * 0.8, dy * 0.8, dz * 0.8], i * 3);
      sim.vel.set([dx * speed, dy * speed, dz * speed], i * 3);
      sim.rot.set([Math.random() * 6, Math.random() * 6, Math.random() * 6], i * 3);
      sim.spin.set(
        [(Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14],
        i * 3
      );
      sim.size[i] = 0.7 + Math.random() * 0.9;
      scraps.current?.setColorAt(i, SCRAP_COLORS[Math.floor(Math.random() * SCRAP_COLORS.length)]);
    }
    if (scraps.current?.instanceColor) scraps.current.instanceColor.needsUpdate = true;
    // the glasses fly off as two spinning rings
    sim.lensPos.set([-0.36, 0.2, 0.95, 0.36, 0.2, 0.95]);
    sim.lensVel.set([-2.6, 3.2, 3.4, 2.4, 3.6, 3.0]);
    sim.lensSpin.set([6, 9, 4, -5, 7, -8]);
    if (scraps.current) scraps.current.visible = true;
  };

  useFrame((state, delta) => {
    const m = getMood();
    const t = state.clock.elapsedTime;
    const k = Math.min(1, delta * 4);
    if (!face.current) return;

    // ---------- pressure (0 calm .. 1 about to blow) ----------
    if (m.chars < baseChars.current) baseChars.current = m.chars;
    const target =
      !animate || m.phase !== "typing"
        ? 0
        : clamp01((m.chars - baseChars.current) / CHARS_TO_EXPLODE);
    pressure.current = lerp(pressure.current, target, target > pressure.current ? k * 0.6 : k * 1.5);
    const p = pressure.current;
    smile.current = lerp(smile.current, m.phase === "calm" ? 1 : 0, k);

    // ---------- explosion triggers ----------
    if (!animate) lastBurst.current = m.burst;
    if (animate && mode.current === "alive") {
      const forced = m.burst !== lastBurst.current;
      if (forced || (m.phase === "typing" && target >= 0.999)) {
        lastBurst.current = m.burst;
        baseChars.current = m.chars; // pressure restarts from here
        pressure.current = 0;
        explode();
      }
    }

    // ---------- burst / rebuild ----------
    const bursting = mode.current === "burst";
    if (animate) modeT.current += delta;
    face.current.visible = !bursting;
    if (scraps.current) scraps.current.visible = bursting;
    [fireball.current, shock.current].forEach((o) => o && (o.visible = bursting));
    lenses.current.forEach((l) => l && (l.visible = bursting));

    if (bursting) {
      const bt = modeT.current;
      // scraps: ballistic with gravity and drag, shrink away at the end
      const life = 1 - smoothstep(0.7, BURST_TIME, bt);
      for (let i = 0; i < SCRAP_COUNT; i++) {
        const i3 = i * 3;
        sim.vel[i3 + 1] -= 5 * delta;
        for (let a = 0; a < 3; a++) {
          sim.vel[i3 + a] *= 1 - 0.9 * delta;
          sim.pos[i3 + a] += sim.vel[i3 + a] * delta;
          sim.rot[i3 + a] += sim.spin[i3 + a] * delta;
        }
        dummy.position.set(sim.pos[i3], sim.pos[i3 + 1], sim.pos[i3 + 2]);
        dummy.rotation.set(sim.rot[i3], sim.rot[i3 + 1], sim.rot[i3 + 2]);
        dummy.scale.setScalar(Math.max(sim.size[i] * life, 0.0001));
        dummy.updateMatrix();
        scraps.current?.setMatrixAt(i, dummy.matrix);
      }
      if (scraps.current) scraps.current.instanceMatrix.needsUpdate = true;
      // glasses
      lenses.current.forEach((l, i) => {
        if (!l) return;
        const i3 = i * 3;
        sim.lensVel[i3 + 1] -= 5 * delta;
        for (let a = 0; a < 3; a++) sim.lensPos[i3 + a] += sim.lensVel[i3 + a] * delta;
        l.position.set(sim.lensPos[i3], sim.lensPos[i3 + 1], sim.lensPos[i3 + 2]);
        l.rotation.x += sim.lensSpin[i3] * delta;
        l.rotation.y += sim.lensSpin[i3 + 1] * delta;
        l.scale.setScalar(Math.max(life, 0.0001));
      });
      // fireball flash + shockwave ring
      if (fireball.current) {
        const f = clamp01(bt / 0.4);
        fireball.current.scale.setScalar(0.4 + f * 2.6);
        (fireball.current.material as THREE.MeshBasicMaterial).opacity = (1 - f) * 0.9;
      }
      if (shock.current) {
        const s = clamp01(bt / 0.7);
        shock.current.scale.setScalar(0.6 + s * 4.5);
        (shock.current.material as THREE.MeshBasicMaterial).opacity = (1 - s) * 0.8;
      }
      if (flash.current) flash.current.intensity = 30 * Math.max(0, 1 - bt / 0.35);
      if (bt > BURST_TIME) {
        mode.current = "rebuild";
        modeT.current = 0;
      }
      return;
    }
    if (flash.current) flash.current.intensity = 0;

    // ---------- the face itself ----------
    const rebuilding = mode.current === "rebuild";
    const rb = rebuilding ? clamp01(modeT.current / REBUILD_TIME) : 1;
    if (rebuilding && rb >= 1) mode.current = "alive";
    const pop = rebuilding ? easeOutBack(rb) : 1;

    // colour and swelling
    if (head.current) {
      (head.current.material as THREE.MeshStandardMaterial).color
        .copy(NORMAL)
        .lerp(RAGE, smoothstep(0, 0.85, p));
    }
    const swell = 1 + 0.4 * Math.pow(p, 1.4);
    const pulse = animate ? 1 + p * p * 0.03 * Math.sin(t * (6 + 10 * p)) : 1;
    face.current.scale.setScalar(Math.max(swell * pulse * pop, 0.0001));

    // expression
    const slant = 0.75 * smoothstep(0.05, 0.9, p);
    if (browL.current) {
      browL.current.rotation.z = -slant;
      browL.current.position.y = 0.52 - 0.05 * p;
    }
    if (browR.current) {
      browR.current.rotation.z = slant;
      browR.current.position.y = 0.52 - 0.05 * p;
    }
    // mouth: slight smile (calm) -> flat -> frown (angry); big smile when result is ready
    const mood01 = lerp(lerp(0.45, -1, smoothstep(0.05, 0.8, p)), 1, smile.current);
    if (mouth.current) {
      mouth.current.rotation.z = mood01 >= 0 ? Math.PI : 0;
      mouth.current.scale.set(1, Math.max(Math.abs(mood01), 0.06), 1);
      mouth.current.position.y = -0.34 - 0.12 * Math.max(-mood01, 0) + 0.04 * Math.max(mood01, 0) * -1;
    }
    eyes.current.forEach((e) => e?.scale.setScalar(1 + 0.3 * p));
    pupils.current.forEach((pu) => pu?.scale.setScalar(1 - 0.45 * p));

    // glasses slip down the nose and rattle as pressure rises
    if (glasses.current) {
      const slip = smoothstep(0.45, 1, p);
      glasses.current.position.y = -0.1 * slip;
      glasses.current.rotation.z = animate ? Math.sin(t * 30) * 0.05 * slip : 0;
    }

    if (!animate) return;

    // shake grows with pressure
    const shake = 0.002 + 0.035 * p * p;
    face.current.position.x = Math.sin(t * 55) * shake;
    face.current.position.y = Math.cos(t * 47) * shake;
    face.current.rotation.z = Math.sin(t * 38) * shake * 1.5;
    // "counting to ten" nod while the request is running
    const nod = m.phase === "loading" ? Math.sin(t * 3) * 0.12 : 0;
    face.current.rotation.y += (state.pointer.x * 0.5 - face.current.rotation.y) * k;
    face.current.rotation.x += (-state.pointer.y * 0.35 + nod - face.current.rotation.x) * k;

    // steam from the ears once things get heated
    const heat = smoothstep(0.45, 1, p);
    steam.current.forEach((s, i) => {
      if (!s) return;
      const side = i % 2 === 0 ? -1 : 1;
      const ph = ((t * (0.35 + heat * 0.5) + i * 0.37) % 1 + 1) % 1;
      s.position.set(side * (1.05 + ph * 0.15), 0.1 + ph * 1.1, 0);
      s.scale.setScalar(Math.max((0.08 + ph * 0.16) * heat, 0.0001));
      (s.material as THREE.MeshBasicMaterial).opacity = (1 - ph) * 0.7 * heat;
    });
  });

  return (
    <group>
      <group ref={face}>
        <mesh ref={head}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#C9CED8" roughness={0.55} />
        </mesh>

        {/* eyes */}
        {[-0.36, 0.36].map((x, i) => (
          <group
            key={x}
            position={[x, 0.2, 0.84]}
            ref={(el) => {
              eyes.current[i] = el;
            }}
          >
            <mesh scale={[1, 1, 0.45]}>
              <sphereGeometry args={[0.21, 24, 24]} />
              <meshStandardMaterial color="#FBFBFA" roughness={0.4} />
            </mesh>
            <mesh
              position={[x > 0 ? -0.03 : 0.03, -0.01, 0.08]}
              ref={(el) => {
                pupils.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#1C1F26" roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* eyebrows */}
        <mesh ref={browL} position={[-0.36, 0.52, 0.88]}>
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#1C1F26" roughness={0.6} />
        </mesh>
        <mesh ref={browR} position={[0.36, 0.52, 0.88]}>
          <boxGeometry args={[0.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#1C1F26" roughness={0.6} />
        </mesh>

        {/* mouth: half torus, flipped and flattened to change expression */}
        <mesh ref={mouth} position={[0, -0.34, 0.9]}>
          <torusGeometry args={[0.26, 0.05, 12, 32, Math.PI]} />
          <meshStandardMaterial color="#1C1F26" roughness={0.6} />
        </mesh>

        {/* round office glasses */}
        <group ref={glasses}>
          {[-0.36, 0.36].map((x) => (
            <mesh key={x} position={[x, 0.2, 0.97]}>
              <torusGeometry args={[0.26, 0.03, 10, 36]} />
              <meshStandardMaterial color="#1C1F26" roughness={0.4} />
            </mesh>
          ))}
          <mesh position={[0, 0.22, 0.97]}>
            <boxGeometry args={[0.16, 0.03, 0.03]} />
            <meshStandardMaterial color="#1C1F26" roughness={0.4} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.64, 0.2, 0.74]} rotation={[0, -s * 0.6, 0]}>
              <boxGeometry args={[0.03, 0.03, 0.42]} />
              <meshStandardMaterial color="#1C1F26" roughness={0.4} />
            </mesh>
          ))}
        </group>

        {/* steam */}
        {Array.from({ length: STEAM_COUNT * 2 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              steam.current[i] = el;
            }}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#FBFBFA" transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* ---- explosion pieces (hidden until the burst) ---- */}
      <instancedMesh
        ref={scraps}
        args={[undefined, undefined, SCRAP_COUNT]}
        visible={false}
        frustumCulled={false}
      >
        <planeGeometry args={[0.14, 0.2]} />
        <meshBasicMaterial side={THREE.DoubleSide} />
      </instancedMesh>
      {[0, 1].map((i) => (
        <mesh
          key={i}
          visible={false}
          ref={(el) => {
            lenses.current[i] = el;
          }}
        >
          <torusGeometry args={[0.26, 0.03, 10, 36]} />
          <meshStandardMaterial color="#1C1F26" roughness={0.4} />
        </mesh>
      ))}
      <mesh ref={fireball} visible={false}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#FF7A1F"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={shock} visible={false}>
        <ringGeometry args={[0.92, 1, 64]} />
        <meshBasicMaterial
          color="#FBFBFA"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight ref={flash} position={[0, 0, 2]} color="#FFB02E" intensity={0} distance={8} />
    </group>
  );
};

const RageFace: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduce, setReduce] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const motionQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sizeQ = window.matchMedia("(max-width: 767px)");
    const sync = () => {
      setReduce(motionQ.matches);
      setCompact(sizeQ.matches);
    };
    sync();
    motionQ.addEventListener("change", sync);
    sizeQ.addEventListener("change", sync);

    // only render while on screen
    const el = wrap.current;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (el) io.observe(el);
    return () => {
      motionQ.removeEventListener("change", sync);
      sizeQ.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        key={compact ? "compact" : "wide"}
        dpr={compact ? [1, 1.5] : [1, 2]}
        // closer camera on phones: the canvas is short, so the face needs to stay a good size
        camera={{ position: [0, 0, compact ? 4.6 : 6], fov: 40 }}
        frameloop={visible ? "always" : "demand"}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2.5, 3, 4]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} intensity={8} color="#FBFBFA" />
        <Face animate={visible && !reduce} />
      </Canvas>
    </div>
  );
};

export default RageFace;
