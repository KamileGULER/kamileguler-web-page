import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, LineBasicMaterial, Vector3 } from "three";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

type Node = {
  origin: {
    x: number;
    y: number;
    z: number;
    distanceTo: (other: unknown) => number;
  };
  amplitude: number;
  speed: number;
  seed: number;
};

function createNetwork(count: number) {
  const nodes: Node[] = [];
  const positions = new Float32Array(count * 3);
  const lineVertices: number[] = [];

  for (let index = 0; index < count; index += 1) {
    const theta = (index / count) * Math.PI * 2;
    const radius = 2.4 + Math.sin(index * 0.7) * 0.55 + Math.random() * 0.5;
    const y = (Math.random() - 0.5) * 2.8;
    const origin = new Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius * 0.7);

    nodes.push({
      origin,
      amplitude: 0.08 + Math.random() * 0.08,
      speed: 0.2 + Math.random() * 0.45,
      seed: Math.random() * Math.PI * 2,
    });

    positions.set([origin.x, origin.y, origin.z], index * 3);
  }

  for (let a = 0; a < nodes.length; a += 1) {
    for (let b = a + 1; b < nodes.length; b += 1) {
      if (nodes[a].origin.distanceTo(nodes[b].origin) < 1.8) {
        lineVertices.push(
          nodes[a].origin.x,
          nodes[a].origin.y,
          nodes[a].origin.z,
          nodes[b].origin.x,
          nodes[b].origin.y,
          nodes[b].origin.z,
        );
      }
    }
  }

  return {
    nodes,
    pointPositions: positions,
    linePositions: new Float32Array(lineVertices),
  };
}

function NetworkField({ mobile }: { mobile: boolean }) {
  const groupRef = useRef<any>(null);
  const pointsRef = useRef<any>(null);
  const pointCount = mobile ? 24 : 48;
  const network = useMemo(() => createNetwork(pointCount), [pointCount]);
  const pointGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(network.pointPositions, 3));
    return geometry;
  }, [network.pointPositions]);
  const lineGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(network.linePositions, 3));
    return geometry;
  }, [network.linePositions]);
  const lineMaterial = useMemo(
    () =>
      new LineBasicMaterial({
        color: "#5CE1E6",
        transparent: true,
        opacity: mobile ? 0.12 : 0.18,
      }),
    [mobile],
  );

  useFrame(({ clock, mouse, camera }) => {
    const elapsed = clock.getElapsedTime();

    network.nodes.forEach((node, index) => {
      const x = node.origin.x + Math.sin(elapsed * node.speed + node.seed) * node.amplitude;
      const y = node.origin.y + Math.cos(elapsed * (node.speed + 0.1) + node.seed) * node.amplitude;
      const z = node.origin.z + Math.sin(elapsed * (node.speed + 0.15) + node.seed) * node.amplitude;

      network.pointPositions[index * 3] = x;
      network.pointPositions[index * 3 + 1] = y;
      network.pointPositions[index * 3 + 2] = z;
    });

    const lineArray = lineGeometry.attributes.position.array;
    if (lineArray instanceof Float32Array) {
      let cursor = 0;

      for (let a = 0; a < network.nodes.length; a += 1) {
        for (let b = a + 1; b < network.nodes.length; b += 1) {
          const ax = network.pointPositions[a * 3];
          const ay = network.pointPositions[a * 3 + 1];
          const az = network.pointPositions[a * 3 + 2];
          const bx = network.pointPositions[b * 3];
          const by = network.pointPositions[b * 3 + 1];
          const bz = network.pointPositions[b * 3 + 2];

          if (Math.hypot(ax - bx, ay - by, az - bz) < 1.9) {
            lineArray[cursor++] = ax;
            lineArray[cursor++] = ay;
            lineArray[cursor++] = az;
            lineArray[cursor++] = bx;
            lineArray[cursor++] = by;
            lineArray[cursor++] = bz;
          }
        }
      }

      for (; cursor < lineArray.length; cursor += 1) {
        lineArray[cursor] = 9999;
      }

      lineGeometry.attributes.position.needsUpdate = true;
    }

    if (pointsRef.current?.geometry.attributes.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    camera.position.x += (mouse.x * 0.18 - camera.position.x) * 0.03;
    camera.position.y += (mouse.y * 0.12 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={pointGeometry}>
        <pointsMaterial
          size={mobile ? 0.018 : 0.024}
          color={new Color("#d8f7fb")}
          transparent
          opacity={0.84}
          blending={AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <lineSegments geometry={lineGeometry}>
        <primitive object={lineMaterial} attach="material" />
      </lineSegments>
    </group>
  );
}

export default function UniverseScene() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const webglEnabled = typeof window !== "undefined" ? supportsWebGL() : false;
  const mobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  if (prefersReducedMotion || !webglEnabled) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(92,225,230,0.08),transparent_28%),radial-gradient(circle_at_75%_12%,rgba(120,108,246,0.14),transparent_22%),linear-gradient(180deg,#05070A_0%,#090D12_55%,#05070A_100%)]"
      >
        <div className="absolute inset-0 bg-hero-grid bg-[length:72px_72px] opacity-[0.05]" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, mobile ? 1.2 : 1.6]} camera={{ position: [0, 0, 5.8], fov: 50 }}>
        <color attach="background" args={["#05070A"]} />
        <fog attach="fog" args={["#05070A", 5.8, 9.5]} />
        <ambientLight intensity={0.7} />
        <NetworkField mobile={mobile} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(92,225,230,0.06),transparent_24%),linear-gradient(180deg,rgba(5,7,10,0.12),rgba(5,7,10,0.82))]" />
    </div>
  );
}
