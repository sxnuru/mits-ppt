"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SimplexNoise2D } from "../../lib/simplex-noise";

// ── Terrain Generator (Marching Squares) ──────────────────────────────
function generateTerrainPaths(): THREE.Vector3[][] {
  const simplex = new SimplexNoise2D(0.42);
  const xMin = -35;
  const xMax = 35;
  const yMin = -35;
  const yMax = 35;
  const step = 0.45; // slightly larger steps for lighter vertex load in presentation
  const zScale = 4.2;

  const nx = Math.ceil((xMax - xMin) / step);
  const ny = Math.ceil((yMax - yMin) / step);

  // Precompute grid values
  const grid = new Float32Array((nx + 1) * (ny + 1));
  const getIndex = (i: number, j: number) => i * (ny + 1) + j;

  for (let i = 0; i <= nx; i++) {
    const x = xMin + i * step;
    for (let j = 0; j <= ny; j++) {
      const y = yMin + j * step;
      // 5 octaves of fBm for natural topography
      const rawNoise = simplex.fbm(x * 0.035, y * 0.035, 5, 0.48, 2.1);
      grid[getIndex(i, j)] = rawNoise;
    }
  }

  // Contour levels representing height lines
  const levels = [
    -0.85, -0.7, -0.55, -0.4, -0.25, -0.1, 0.05, 0.2, 0.35, 0.5, 0.65, 0.8,
  ];

  interface Point3D {
    x: number;
    y: number;
    z: number;
  }
  interface Segment {
    p1: Point3D;
    p2: Point3D;
  }

  const segmentsByLevel: Record<number, Segment[]> = {};
  levels.forEach((L) => {
    segmentsByLevel[L] = [];
  });

  for (let i = 0; i < nx; i++) {
    const x0 = xMin + i * step;
    const x1 = x0 + step;

    for (let j = 0; j < ny; j++) {
      const y0 = yMin + j * step;
      const y1 = y0 + step;

      const v0 = grid[getIndex(i, j)];
      const v1 = grid[getIndex(i + 1, j)];
      const v2 = grid[getIndex(i + 1, j + 1)];
      const v3 = grid[getIndex(i, j + 1)];

      const corners = [
        { x: x0, y: y0, v: v0 },
        { x: x1, y: y0, v: v1 },
        { x: x1, y: y1, v: v2 },
        { x: x0, y: y1, v: v3 },
      ];

      levels.forEach((L) => {
        const crossings: Point3D[] = [];

        for (let e = 0; e < 4; e++) {
          const cA = corners[e];
          const cB = corners[(e + 1) % 4];

          if ((cA.v >= L && cB.v < L) || (cA.v < L && cB.v >= L)) {
            const t = (L - cA.v) / (cB.v - cA.v);
            crossings.push({
              x: cA.x + t * (cB.x - cA.x),
              y: cA.y + t * (cB.y - cA.y),
              z: L * zScale,
            });
          }
        }

        if (crossings.length === 2) {
          segmentsByLevel[L].push({ p1: crossings[0], p2: crossings[1] });
        } else if (crossings.length === 4) {
          segmentsByLevel[L].push({ p1: crossings[0], p2: crossings[1] });
          segmentsByLevel[L].push({ p1: crossings[2], p2: crossings[3] });
        }
      });
    }
  }

  const allPaths: THREE.Vector3[][] = [];

  levels.forEach((L) => {
    const levelSegments = segmentsByLevel[L];
    if (levelSegments.length === 0) return;

    const adj = new Map<
      string,
      { point: Point3D; neighbors: { key: string; point: Point3D }[] }
    >();
    const getKey = (p: Point3D) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`;

    const addNode = (p: Point3D) => {
      const key = getKey(p);
      if (!adj.has(key)) {
        adj.set(key, { point: p, neighbors: [] });
      }
      return key;
    };

    levelSegments.forEach((seg) => {
      const k1 = addNode(seg.p1);
      const k2 = addNode(seg.p2);
      if (k1 === k2) return;
      adj.get(k1)!.neighbors.push({ key: k2, point: seg.p2 });
      adj.get(k2)!.neighbors.push({ key: k1, point: seg.p1 });
    });

    const visited = new Set<string>();

    for (const [startKey, node] of adj) {
      if (visited.has(startKey)) continue;
      if (node.neighbors.length !== 1) continue;

      const poly: THREE.Vector3[] = [
        new THREE.Vector3(node.point.x, node.point.y, node.point.z),
      ];
      visited.add(startKey);

      let curr = node.neighbors[0];
      while (curr && !visited.has(curr.key)) {
        poly.push(new THREE.Vector3(curr.point.x, curr.point.y, curr.point.z));
        visited.add(curr.key);
        const nextNode = adj.get(curr.key);
        curr = nextNode
          ? nextNode.neighbors.find((n) => !visited.has(n.key))!
          : null!;
      }

      if (poly.length >= 3) {
        const curve = new THREE.CatmullRomCurve3(poly, false, "centripetal");
        allPaths.push(curve.getPoints(poly.length * 2));
      }
    }

    for (const [startKey, node] of adj) {
      if (visited.has(startKey)) continue;

      const poly: THREE.Vector3[] = [
        new THREE.Vector3(node.point.x, node.point.y, node.point.z),
      ];
      visited.add(startKey);

      let curr = node.neighbors[0];
      while (curr && !visited.has(curr.key)) {
        poly.push(new THREE.Vector3(curr.point.x, curr.point.y, curr.point.z));
        visited.add(curr.key);
        const nextNode = adj.get(curr.key);
        curr = nextNode
          ? nextNode.neighbors.find((n) => !visited.has(n.key))!
          : null!;
      }

      if (poly.length >= 3) {
        const curve = new THREE.CatmullRomCurve3(poly, true, "centripetal");
        allPaths.push(curve.getPoints(poly.length * 2));
      }
    }
  });

  return allPaths;
}

// ── R3F Scene Content ──────────────────────────────────────────────────
function SceneContent({ current }: { current: number }) {
  const { camera } = useThree();
  const paths = useMemo(() => generateTerrainPaths(), []);
  const groupRef = useRef<THREE.Group>(null);

  // Smooth camera angles on mount
  useEffect(() => {
    camera.position.set(0, -14, 6);
    camera.lookAt(0, 0, 1.5);
  }, [camera]);

  // Translate and rotate group containing paths based on active slide (0 ➔ 1)
  const targetGroupPos = useMemo(() => {
    if (current === 0) return new THREE.Vector3(0, 0, 0);
    if (current === 1) return new THREE.Vector3(-4, 3, 0.5); // slide 2 transition shift
    return new THREE.Vector3(-7, 5, 0.8);
  }, [current]);

  const targetGroupRot = useMemo(() => {
    if (current === 0) return new THREE.Euler(0, 0, 0);
    if (current === 1) return new THREE.Euler(0.04, -0.04, 0.06); // slide 2 rotation shift
    return new THREE.Euler(0.08, -0.08, 0.1);
  }, [current]);

  // Compute separate geometries for the base lines (all paths) and trails (subset)
  const { baseGeometry, trailGeometry, curvesData } = useMemo(() => {
    const basePos: number[] = [];
    const trailPos: number[] = [];
    const ts: number[] = [];
    const offsets: number[] = [];
    const speeds: number[] = [];

    const curvesInfo: {
      path: THREE.Vector3[];
      lengths: number[];
      totalLength: number;
      pOffset: number;
      pSpeed: number;
    }[] = [];

    paths.forEach((path) => {
      let totalLength = 0;
      const lengths = [0];
      for (let i = 0; i < path.length - 1; i++) {
        const d = path[i].distanceTo(path[i + 1]);
        totalLength += d;
        lengths.push(totalLength);
      }

      // Add to base lines
      for (let i = 0; i < path.length - 1; i++) {
        const p1 = path[i];
        const p2 = path[i + 1];
        basePos.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }

      // Trail packets on a subset of lines for clean data-packet aesthetic
      if (Math.random() > 0.4) return;
      if (totalLength < 1.5) return;

      const pOffset = Math.random();
      const pSpeed = 0.03 + Math.random() * 0.06;

      curvesInfo.push({ path, lengths, totalLength, pOffset, pSpeed });

      for (let i = 0; i < path.length - 1; i++) {
        const p1 = path[i];
        const p2 = path[i + 1];
        const t1 = totalLength > 0 ? lengths[i] / totalLength : 0;
        const t2 = totalLength > 0 ? lengths[i + 1] / totalLength : 0;

        trailPos.push(p1.x, p1.y, p1.z);
        ts.push(t1);
        offsets.push(pOffset);
        speeds.push(pSpeed);

        trailPos.push(p2.x, p2.y, p2.z);
        ts.push(t2);
        offsets.push(pOffset);
        speeds.push(pSpeed);
      }
    });

    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(basePos), 3),
    );

    const tGeo = new THREE.BufferGeometry();
    tGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(trailPos), 3),
    );
    tGeo.setAttribute(
      "aLineT",
      new THREE.BufferAttribute(new Float32Array(ts), 1),
    );
    tGeo.setAttribute(
      "aPulseOffset",
      new THREE.BufferAttribute(new Float32Array(offsets), 1),
    );
    tGeo.setAttribute(
      "aPulseSpeed",
      new THREE.BufferAttribute(new Float32Array(speeds), 1),
    );

    return { baseGeometry: bGeo, trailGeometry: tGeo, curvesData: curvesInfo };
  }, [paths]);

  // Custom shader purely for the fading trail (moving data packet tail)
  const trailMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      fog: true,
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#00d4ff") },
        },
      ]),
      vertexShader: `
        #include <fog_pars_vertex>
        attribute float aLineT;
        attribute float aPulseOffset;
        attribute float aPulseSpeed;
        varying float vLineT;
        varying float vPulseOffset;
        varying float vPulseSpeed;
        void main() {
          vLineT = aLineT;
          vPulseOffset = aPulseOffset;
          vPulseSpeed = aPulseSpeed;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }
      `,
      fragmentShader: `
        #include <fog_pars_fragment>
        uniform float uTime;
        uniform vec3 uColor;
        varying float vLineT;
        varying float vPulseOffset;
        varying float vPulseSpeed;
        
        void main() {
          float progress = fract(uTime * vPulseSpeed + vPulseOffset);
          float dist = progress - vLineT;
          
          if (dist < 0.0) dist += 1.0;
          
          float trailLength = 0.28;
          float alpha = 0.0;
          
          if (dist < trailLength) {
            alpha = 1.0 - (dist / trailLength);
            alpha = pow(alpha, 2.2);
          }
          
          if (alpha <= 0.0) discard;
          gl_FragColor = vec4(uColor, alpha);
          #include <fog_fragment>
        }
      `,
    });
  }, []);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    trailMaterial.uniforms.uTime.value = time;

    // Smoothly lerp parent group translation and rotation
    if (groupRef.current) {
      groupRef.current.position.lerp(targetGroupPos, 1.5 * delta);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetGroupRot.x, 1.5 * delta);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetGroupRot.y, 1.5 * delta);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetGroupRot.z, 1.5 * delta);
    }

    // Calculate exact positions for packet heads
    if (meshRef.current) {
      curvesData.forEach((curve, i) => {
        const progress = (time * curve.pSpeed + curve.pOffset) % 1.0;
        const targetDist = progress * curve.totalLength;

        let idx = 0;
        for (let j = 0; j < curve.lengths.length - 1; j++) {
          if (
            targetDist >= curve.lengths[j] &&
            targetDist <= curve.lengths[j + 1]
          ) {
            idx = j;
            break;
          }
        }

        const p1 = curve.path[idx];
        const p2 = curve.path[idx + 1];

        if (!p1 || !p2) return;

        const segDist = targetDist - curve.lengths[idx];
        const segLen = curve.lengths[idx + 1] - curve.lengths[idx];
        const t = segLen > 0 ? segDist / segLen : 0;

        dummy.position.lerpVectors(p1, p2, t);
        dummy.updateMatrix();

        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={["#060b12", 8, 32]} />

      {/* Subtle topographic baseline curves */}
      <lineSegments geometry={baseGeometry}>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          fog={true}
        />
      </lineSegments>

      {/* Fading trail data-packet tails */}
      <lineSegments geometry={trailGeometry} material={trailMaterial} />

      {/* Glowing data packets (white heads) */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, curvesData.length]}
      >
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
          fog={true}
        />
      </instancedMesh>
    </group>
  );
}

// ── Main Exported Component ──────────────────────────────────────────
export default function TerrainBackground({ current }: { current: number }) {
  // Keep it visible and moving on all slides (0.35 on Cover, 0.22 on all subsequent slides)
  const opacity = current === 0 ? 0.35 : 0.22;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: opacity,
        transition: "opacity 1.8s ease-in-out",
      }}
    >
      <Canvas
        camera={{ position: [0, -14, 6], fov: 45 }}
        gl={{ antialias: true }}
      >
        <SceneContent current={current} />
      </Canvas>
    </div>
  );
}
