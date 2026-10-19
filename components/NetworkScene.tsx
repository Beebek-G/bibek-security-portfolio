"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
import { assistantKnowledge, networkEdges, networkNodes } from "@/data/portfolio";

type NodeData = (typeof networkNodes)[number];
type Vec3 = [number, number, number];

type SceneProps = {
  selected: string;
  hovered: string | null;
  setSelected: (id: string) => void;
  setHovered: (id: string | null) => void;
};

const palette: Record<NodeData["kind"], string> = {
  core: "#f5f7f2",
  evidence: "#7ff2cf",
  signal: "#ffbf73",
  skill: "#74c9ff",
  trajectory: "#b9a8ff",
  future: "#95a8ae",
  assistant: "#ff8edb",
};

const satelliteMap: Record<string, string[]> = {
  forensics: ["WINDOWS", "LINUX", "MOBILE", "MEMORY", "NETWORK", "IR"],
  network: ["ACL", "VLAN", "VPN", "WIRESHARK", "NMAP"],
  ctf: ["KEAN / 2026", "THRIVEDX / 2022", "CRYPTO", "FORENSICS", "OSINT"],
  python: ["AUTOMATION", "CLI", "DATA", "SECURITY"],
  johnjay: ["CS", "INFOSEC", "RESEARCH", "CUNY"],
  research: ["FORENSICS", "TELEMETRY", "AI SECURITY", "IR"],
  home: ["KALI", "UBUNTU", "UTM", "VIRTUALBOX"],
  ask: ["PROJECTS", "ROLE FIT", "EVIDENCE", "CONNECT"],
  bibek: ["BUILD", "PROVE", "SHARE", "CONNECT"],
};

function makeLabelTexture(text: string, color: string) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "700 34px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "4px";
  ctx.shadowColor = "rgba(0,0,0,.95)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = color;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function LabelSprite({ text, color, y, scale = 1 }: { text: string; color: string; y: number; scale?: number }) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => {
    const next = makeLabelTexture(text, color);
    setTexture(next);
    return () => next?.dispose();
  }, [text, color]);
  if (!texture) return null;
  return (
    <sprite position={[0, y, 0]} scale={[3.2 * scale, 0.4 * scale, 1]} renderOrder={8}>
      <spriteMaterial map={texture} transparent depthWrite={false} depthTest={false} opacity={0.92} />
    </sprite>
  );
}

function Edge({ a, b, active }: { a: Vec3; b: Vec3; active: boolean }) {
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]), [a, b]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <lineSegments geometry={geometry} renderOrder={0}>
      <lineBasicMaterial color={active ? "#75e8ca" : "#274148"} transparent opacity={active ? 0.74 : 0.28} />
    </lineSegments>
  );
}

function Signal({ a, b, phase, color }: { a: Vec3; b: Vec3; phase: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const va = useMemo(() => new THREE.Vector3(...a), [a]);
  const vb = useMemo(() => new THREE.Vector3(...b), [b]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.085 + phase) % 1;
    ref.current.position.lerpVectors(va, vb, t);
    const pulse = 0.75 + Math.sin(clock.elapsedTime * 6 + phase * 10) * 0.22;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref} renderOrder={5}>
      <sphereGeometry args={[0.045, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

function SatelliteRing({ node }: { node: NodeData }) {
  const group = useRef<THREE.Group>(null);
  const labels = satelliteMap[node.id] ?? [];
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = clock.elapsedTime * 0.08;
  });
  return (
    <group ref={group} position={node.position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.006, 8, 96]} />
        <meshBasicMaterial color={palette[node.kind]} transparent opacity={0.22} />
      </mesh>
      {labels.map((label, index) => {
        const angle = (index / labels.length) * Math.PI * 2;
        const radius = 1.12;
        return (
          <group key={label} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(angle * 2) * 0.14]}>
            <mesh>
              <sphereGeometry args={[0.045, 10, 10]} />
              <meshBasicMaterial color={palette[node.kind]} transparent opacity={0.78} />
            </mesh>
            <LabelSprite text={label} color="#8ba3a8" y={-0.16} scale={0.44} />
          </group>
        );
      })}
    </group>
  );
}

function NodeMesh({ node, active, related, hovered, onSelect, onHover }: {
  node: NodeData;
  active: boolean;
  related: boolean;
  hovered: boolean;
  onSelect: (node: NodeData) => void;
  onHover: (id: string | null) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const color = palette[node.kind];
  const radius = node.kind === "core" ? 0.34 : node.kind === "assistant" ? 0.29 : 0.2;

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.55 + node.position[0]) * 0.045;
    const target = active ? 1.48 : hovered ? 1.28 : related ? 1.1 : 1;
    m.scale.lerp(new THREE.Vector3(target * pulse, target * pulse, target * pulse), 0.12);
    m.rotation.x += 0.0018;
    m.rotation.y += 0.003;
    if (halo.current) {
      const haloPulse = active ? 2.2 + Math.sin(clock.elapsedTime * 1.7) * 0.15 : hovered ? 1.65 : 1.28;
      halo.current.scale.lerp(new THREE.Vector3(haloPulse, haloPulse, haloPulse), 0.1);
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={mesh}
        onClick={(event) => { event.stopPropagation(); onSelect(node); }}
        onPointerOver={(event) => { event.stopPropagation(); onHover(node.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { onHover(null); document.body.style.cursor = "default"; }}
      >
        <icosahedronGeometry args={[radius, node.kind === "core" ? 3 : 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 2.4 : hovered ? 1.55 : related ? 0.9 : 0.45}
          metalness={0.2}
          roughness={0.24}
        />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[radius * 1.55, 22, 22]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.12 : hovered ? 0.09 : 0.035} depthWrite={false} />
      </mesh>
      {active && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 3.15, 0.012, 8, 92]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
      )}
      <LabelSprite text={node.label} color={active ? "#ffffff" : color} y={-(radius + 0.43)} scale={node.kind === "core" ? 0.86 : 0.68} />
    </group>
  );
}

function Dust() {
  const points = useMemo(() => {
    let seed = 7331;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const positions = new Float32Array(480 * 3);
    for (let i = 0; i < 480; i++) {
      positions[i * 3] = (random() - 0.5) * 24;
      positions[i * 3 + 1] = (random() - 0.5) * 15;
      positions[i * 3 + 2] = (random() - 0.5) * 16 - 2;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  useEffect(() => () => points.dispose(), [points]);
  return (
    <points geometry={points}>
      <pointsMaterial color="#8fb3ad" size={0.018} transparent opacity={0.34} depthWrite={false} />
    </points>
  );
}

function CameraControls({ selected }: { selected: NodeData }) {
  const { camera, gl } = useThree();
  const controls = useRef<OrbitControlsImpl | null>(null);
  const focusStart = useRef(0);
  const fromTarget = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());
  const fromCamera = useRef(new THREE.Vector3());
  const toCamera = useRef(new THREE.Vector3());

  useEffect(() => {
    const next = new OrbitControlsImpl(camera, gl.domElement);
    next.enableDamping = true;
    next.dampingFactor = 0.055;
    next.enablePan = false;
    // Do not capture the mouse wheel. Normal wheel/trackpad gestures should
    // always move the visitor through the page rather than trap them in 3D.
    next.enableZoom = false;
    next.minDistance = 5.7;
    next.maxDistance = 14.5;
    next.rotateSpeed = 0.48;

    // On touch devices, scrolling is more important than free-orbit control.
    // Keep nodes tappable, but reserve vertical gestures for the document.
    const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    if (coarsePointer) {
      next.enableRotate = false;
      gl.domElement.style.touchAction = "pan-y";
    } else {
      gl.domElement.style.touchAction = "auto";
    }

    next.target.set(0, 0, 0);
    next.update();
    controls.current = next;
    return () => {
      gl.domElement.style.touchAction = "";
      next.dispose();
    };
  }, [camera, gl]);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    focusStart.current = performance.now();
    fromTarget.current.copy(c.target);
    toTarget.current.set(...selected.position);
    fromCamera.current.copy(camera.position);
    const direction = camera.position.clone().sub(c.target).normalize();
    const distance = selected.id === "bibek" ? 10.6 : 7.3;
    toCamera.current.copy(toTarget.current).add(direction.multiplyScalar(distance));
  }, [selected, camera]);

  useFrame(() => {
    const c = controls.current;
    if (!c) return;
    const elapsed = (performance.now() - focusStart.current) / 1000;
    if (elapsed < 0.9) {
      const raw = Math.min(1, elapsed / 0.9);
      const t = 1 - Math.pow(1 - raw, 3);
      c.target.lerpVectors(fromTarget.current, toTarget.current, t);
      camera.position.lerpVectors(fromCamera.current, toCamera.current, t);
    }
    c.update();
  });
  return null;
}

function Graph({ selected, hovered, setSelected, setHovered }: SceneProps) {
  const map = useMemo(() => Object.fromEntries(networkNodes.map((node) => [node.id, node])), []);
  const selectedNode = map[selected] as NodeData;
  const relationSet = useMemo(() => new Set(networkEdges.filter(([a, b]) => a === selected || b === selected).flat()), [selected]);
  const hoverRelationSet = useMemo(() => new Set(networkEdges.filter(([a, b]) => a === hovered || b === hovered).flat()), [hovered]);

  const choose = (node: NodeData) => {
    setSelected(node.id);
    if (node.id === "ask") window.dispatchEvent(new CustomEvent("open-network-assistant"));
  };

  return (
    <>
      <color attach="background" args={["#04090c"]} />
      <fog attach="fog" args={["#04090c", 11, 25]} />
      <ambientLight intensity={0.62} />
      <pointLight position={[5, 7, 8]} intensity={28} color="#8ff2d2" distance={34} />
      <pointLight position={[-7, -4, 6]} intensity={18} color="#a99aff" distance={28} />
      <pointLight position={[0, -2, 6]} intensity={10} color="#ff82d6" distance={22} />
      <Dust />
      <CameraControls selected={selectedNode} />

      {networkEdges.map(([a, b]) => (
        <Edge key={`${a}-${b}`} a={(map[a] as NodeData).position} b={(map[b] as NodeData).position} active={a === selected || b === selected || a === hovered || b === hovered} />
      ))}

      <Signal a={map.bibek.position} b={map.forensics.position} phase={0.12} color="#79efcd" />
      <Signal a={map.forensics.position} b={map.ctf.position} phase={0.52} color="#ffc07a" />
      <Signal a={map.bibek.position} b={map.ask.position} phase={0.74} color="#ff8edb" />
      <Signal a={map.johnjay.position} b={map.research.position} phase={0.31} color="#b9a8ff" />

      {networkNodes.map((node) => (
        <NodeMesh
          key={node.id}
          node={node}
          active={selected === node.id}
          hovered={hovered === node.id}
          related={relationSet.has(node.id) || hoverRelationSet.has(node.id)}
          onSelect={choose}
          onHover={setHovered}
        />
      ))}
      <SatelliteRing node={selectedNode} />
    </>
  );
}

export default function NetworkScene() {
  const [selected, setSelected] = useState("bibek");
  const [hovered, setHovered] = useState<string | null>(null);
  const node = networkNodes.find((item) => item.id === selected) ?? networkNodes[0];
  const knowledge = assistantKnowledge.find((item) => item.id === node.knowledgeId);

  const activate = (id: string) => {
    setSelected(id);
    if (id === "ask") window.dispatchEvent(new CustomEvent("open-network-assistant"));
  };

  return (
    <div className="network-v6-shell">
      <Canvas
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.3, 10.6], fov: 43, near: 0.1, far: 80 }}
        onPointerMissed={() => setSelected("bibek")}
      >
        <Graph selected={selected} hovered={hovered} setSelected={setSelected} setHovered={setHovered} />
      </Canvas>

      <div className="network-v6-vignette" aria-hidden="true" />

      <div className="network-v6-dock" aria-label="Select a network node">
        {networkNodes.map((item, index) => (
          <button key={item.id} className={selected === item.id ? "active" : ""} onClick={() => activate(item.id)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </div>

      <aside className="network-v6-hud" aria-live="polite">
        <div className="network-v6-status"><span>FOCUS / {node.label}</span><i /></div>
        <h2>{knowledge?.title}</h2>
        <p>{knowledge?.body}</p>
        <div className="network-v6-actions">
          {node.id === "ask" ? (
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-network-assistant"))}>OPEN CONCIERGE ↗</button>
          ) : (
            <a href={node.href}>{knowledge?.cta ?? "Open evidence"} ↗</a>
          )}
          <button className="network-reset" onClick={() => setSelected("bibek")}>RESET FIELD</button>
        </div>
      </aside>

      <div className="network-v6-instruction" aria-hidden="true">
        <span>DRAG TO ORBIT</span><i /><span>CLICK TO FOCUS</span><i /><span>SCROLL TO EXPLORE</span>
      </div>
    </div>
  );
}
