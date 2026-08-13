'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPFlipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const navStatusRef = useRef<HTMLDivElement>(null);
  const hudTLRef = useRef<HTMLDivElement>(null);
  const hudBRRef = useRef<HTMLDivElement>(null);
  const hudReadoutRef = useRef<HTMLDivElement>(null);
  const heroCoordsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useRef(true);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobileDevice(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;

    let animFrameId: number;
    let threeCleanup: (() => void) | null = null;

    // Detect mobile for hardware scaling
    const isMobile = window.innerWidth < 768;

    // ── Custom cursor logic (desktop only) ──────────────────────
    const cur = cursorRef.current;
    const ring = cursorRingRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let cursorAF: number;
    let isPointerActive = false;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      isPointerActive = true;
      if ('touches' in e && e.touches.length > 0) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      } else if ('clientX' in e) {
        mx = (e as MouseEvent).clientX;
        my = (e as MouseEvent).clientY;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    if (!isMobile && cur && ring) {
      (function loopCursor() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        cursorAF = requestAnimationFrame(loopCursor);
      })();
    }

    // ── HUD readout update ──────────────────────────────────────
    let clientX = 0, clientY = 0;
    let winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
    let winH = typeof window !== 'undefined' ? window.innerHeight : 800;
    let hudRaf: number | null = null;

    const onResizeWin = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;
    };
    window.addEventListener('resize', onResizeWin, { passive: true });

    const updateHUD = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (hudRaf === null) {
        hudRaf = requestAnimationFrame(() => {
          hudRaf = null;
          const w = winW || 1;
          const h = winH || 1;
          const x = ((clientX / w) * 2 - 1).toFixed(3);
          const y = (-(clientY / h) * 2 + 1).toFixed(3);
          if (hudReadoutRef.current) {
            hudReadoutRef.current.innerHTML =
              `X: ${Number(x) > 0 ? '+' : ''}${x}<br />Y: ${Number(y) > 0 ? '+' : ''}${y}<br />Z: +7.000`;
          }
          const phi = ((clientX / w) * 360).toFixed(2).padStart(6, '0');
          const theta = ((clientY / h) * 180).toFixed(2).padStart(6, '0');
          if (heroCoordsRef.current) {
            heroCoordsRef.current.innerHTML = `φ ${phi}° · θ ${theta}°<br />FRAGMENTS: ${isMobile ? '350+' : '1500+'}`;
          }
        });
      }
    };

    window.addEventListener('mousemove', updateHUD, { passive: true });
    window.addEventListener('touchmove', updateHUD, { passive: true });

    // ── THREE.JS HIGH PERFORMANCE SCENE ───────────────────────
    (() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x080808);
      const scrollGroup = new THREE.Group();
      scene.add(scrollGroup);
      const torusGroup = new THREE.Group();
      scrollGroup.add(torusGroup);

      // Camera - adjusted FOV and position for mobile
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = isMobile ? 8.5 : 7;

      // Renderer - cap pixel ratio at 1.0 for mobile to get 60 FPS
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      // Post-processing setup (Optimized for Mobile)
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      // Lighter Bloom settings on desktop; lightweight bloom on mobile
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(
          isMobile ? window.innerWidth / 2 : window.innerWidth,
          isMobile ? window.innerHeight / 2 : window.innerHeight
        ),
        isMobile ? 0.4 : 0.65,
        0.4,
        0.65
      );
      composer.addPass(bloomPass);

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enabled = false;

      // Lights - Brand Orange Theme (#FF6B00)
      scene.add(new THREE.AmbientLight(0x221100, 1.2));
      const dirLight = new THREE.DirectionalLight(0xFF8C00, 3.5);
      dirLight.position.set(3, 4, 5);
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(0xFF4500, 4.5, 25);
      pointLight.position.set(-2, -2, 4);
      scene.add(pointLight);

      // Textures - conditionally loaded only on desktop to eliminate 15MB payload on mobile
      let diffuse: THREE.Texture | null = null;
      let normalTex: THREE.Texture | null = null;
      let arm: THREE.Texture | null = null;

      if (!isMobile) {
        const textureLoader = new THREE.TextureLoader();
        const loadTex = (url: string) => textureLoader.load(url);
        diffuse = loadTex('https://raw.githubusercontent.com/danielyl123/person/refs/heads/main/diffuse.jpg');
        normalTex = loadTex('https://raw.githubusercontent.com/danielyl123/person/refs/heads/main/normal.jpg');
        arm = loadTex('https://raw.githubusercontent.com/danielyl123/person/refs/heads/main/arm.jpg');
        [diffuse, normalTex, arm].forEach((tex) => {
          tex.repeat.set(2, 2);
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        });
        diffuse.colorSpace = THREE.SRGBColorSpace;
      }

      // Barycentric wireframe inner torus
      function addBarycentricCoords(geo: THREE.BufferGeometry) {
        const g = geo.toNonIndexed();
        const count = g.attributes.position.count;
        const bary = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 3) {
          bary[i * 3] = 1; bary[i * 3 + 1] = 0; bary[i * 3 + 2] = 0;
          bary[(i + 1) * 3] = 0; bary[(i + 1) * 3 + 1] = 1; bary[(i + 1) * 3 + 2] = 0;
          bary[(i + 2) * 3] = 0; bary[(i + 2) * 3 + 1] = 0; bary[(i + 2) * 3 + 2] = 1;
        }
        g.setAttribute('barycentric', new THREE.BufferAttribute(bary, 3));
        return g;
      }

      const wireMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          attribute vec3 barycentric;
          varying vec3 vBary;
          void main() {
            vBary = barycentric;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vBary;
          float wireMask(vec3 b, float t) {
            vec3 d = fwidth(b);
            vec3 a = smoothstep(vec3(0.0), d * t, b);
            return 1.0 - min(a.x, min(a.y, a.z));
          }
          void main() {
            float wf = wireMask(vBary, 1.6);
            vec3 baseCol = vec3(0.09, 0.02, 0.0);
            vec3 orangeGlow = vec3(1.0, 0.42, 0.0);
            vec3 col = mix(baseCol, orangeGlow, wf);
            col = mix(col, vec3(1.0, 0.6, 0.0) * 2.5, wf * 0.65);
            gl_FragColor = vec4(col, 1.0);
          }
        `,
        side: THREE.DoubleSide,
      });

      // Segment resolution optimized for device capability & smaller ring scale
      const torusSegs = isMobile ? 40 : 70;
      const TORUS_R = 1.55, TORUS_r = 0.32;

      torusGroup.add(
        new THREE.Mesh(
          addBarycentricCoords(new THREE.TorusGeometry(TORUS_R, TORUS_r, torusSegs, torusSegs)),
          wireMaterial
        )
      );

      // Voronoi fragment count optimized for smooth 60fps
      const FRAG_SCALE = isMobile ? 22 : 40;

      function hash2(px: number, py: number): [number, number] {
        const a = Math.sin(px * 127.1 + py * 311.7) * 43758.5453;
        const b = Math.sin(px * 269.5 + py * 183.3) * 43758.5453;
        return [a - Math.floor(a), b - Math.floor(b)];
      }

      function cellSeed(u: number, v: number): [number, number] {
        const n = [Math.floor(u * FRAG_SCALE), Math.floor(v * FRAG_SCALE)];
        const f = [u * FRAG_SCALE - n[0], v * FRAG_SCALE - n[1]];
        let md = Infinity;
        let best = [...n];
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            const o = hash2(n[0] + i, n[1] + j);
            const r = [i + o[0] - f[0], j + o[1] - f[1]];
            const d = r[0] * r[0] + r[1] * r[1];
            if (d < md) { md = d; best = [n[0] + i + o[0], n[1] + j + o[1]]; }
          }
        }
        return [best[0] / FRAG_SCALE, best[1] / FRAG_SCALE];
      }

      const fragments = (() => {
        const baseGeo = new THREE.TorusGeometry(TORUS_R, TORUS_r, torusSegs, torusSegs);
        const nonIndexed = baseGeo.toNonIndexed();
        baseGeo.dispose();
        const pos = nonIndexed.attributes.position.array as Float32Array;
        const nrm = nonIndexed.attributes.normal.array as Float32Array;
        const uvData = nonIndexed.attributes.uv.array as Float32Array;
        const tris = pos.length / 9;

        const cellMap = new Map<string, { s: [number, number]; t: number[] }>();
        for (let t = 0; t < tris; t++) {
          const uc = (uvData[t * 6] + uvData[t * 6 + 2] + uvData[t * 6 + 4]) / 3;
          const vc = (uvData[t * 6 + 1] + uvData[t * 6 + 3] + uvData[t * 6 + 5]) / 3;
          const s = cellSeed(uc, vc);
          const k = `${s[0].toFixed(5)}_${s[1].toFixed(5)}`;
          if (!cellMap.has(k)) cellMap.set(k, { s, t: [] });
          cellMap.get(k)!.t.push(t);
        }

        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xFF6B00),
          map: diffuse, normalMap: normalTex, roughnessMap: arm,
          roughness: 0.45, metalness: 0.5, side: THREE.DoubleSide,
        });

        const list: THREE.Mesh[] = [];
        const TWO_PI = Math.PI * 2;

        for (const { s: seed, t: triList } of Array.from(cellMap.values())) {
          if (!triList.length) continue;
          const vertCount = triList.length * 3;
          const pArr = new Float32Array(vertCount * 3), nArr = new Float32Array(vertCount * 3), uvArr = new Float32Array(vertCount * 2);
          let vi = 0;
          for (const tri of triList) {
            for (let v = 0; v < 3; v++) {
              const sv = tri * 3 + v;
              pArr[vi * 3] = pos[sv * 3]; pArr[vi * 3 + 1] = pos[sv * 3 + 1]; pArr[vi * 3 + 2] = pos[sv * 3 + 2];
              nArr[vi * 3] = nrm[sv * 3]; nArr[vi * 3 + 1] = nrm[sv * 3 + 1]; nArr[vi * 3 + 2] = nrm[sv * 3 + 2];
              uvArr[vi * 2] = uvData[sv * 2]; uvArr[vi * 2 + 1] = uvData[sv * 2 + 1];
              vi++;
            }
          }

          const phi = seed[0] * TWO_PI, theta = seed[1] * TWO_PI;
          const cx = (TORUS_R + TORUS_r * Math.cos(theta)) * Math.cos(phi);
          const cy = (TORUS_R + TORUS_r * Math.cos(theta)) * Math.sin(phi);
          const cz = TORUS_r * Math.sin(theta);
          const cellCenter = new THREE.Vector3(cx, cy, cz);
          const majorPt = new THREE.Vector3(TORUS_R * Math.cos(phi), TORUS_R * Math.sin(phi), 0);
          const cellNormal = cellCenter.clone().sub(majorPt).normalize();

          const SHRINK = 0.96;
          for (let i = 0; i < pArr.length; i += 3) {
            pArr[i] = (pArr[i] - cx) * SHRINK;
            pArr[i + 1] = (pArr[i + 1] - cy) * SHRINK;
            pArr[i + 2] = (pArr[i + 2] - cz) * SHRINK;
          }

          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
          geo.setAttribute('normal', new THREE.BufferAttribute(nArr, 3));
          geo.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));

          const rnd = hash2(seed[0] * 137.53, seed[1] * 137.53);
          const up = Math.abs(cellNormal.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
          const tang = new THREE.Vector3().crossVectors(cellNormal, up).normalize();
          const bitang = new THREE.Vector3().crossVectors(cellNormal, tang);
          const aa = rnd[0] * TWO_PI;
          const rotAxis = tang.clone().multiplyScalar(Math.cos(aa)).addScaledVector(bitang, Math.sin(aa)).normalize();

          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.copy(cellCenter).addScaledVector(cellNormal, 0.015);
          mesh.userData = { cellCenter, cellNormal, rotAxis, maxAngle: 0.7 + rnd[1] * 0.9, lift: 0 };
          torusGroup.add(mesh);
          list.push(mesh);
        }

        nonIndexed.dispose();
        return list;
      })();

      // Raycaster mesh
      const rcMesh = new THREE.Mesh(
        new THREE.TorusGeometry(TORUS_R, TORUS_r, torusSegs, torusSegs),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      torusGroup.add(rcMesh);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(-999, -999);

      const updateMousePos = (clientX: number, clientY: number) => {
        mouse.x = (clientX / (winW || 1)) * 2 - 1;
        mouse.y = -(clientY / (winH || 1)) * 2 + 1;
      };

      const onMouseMoveThree = (e: MouseEvent) => updateMousePos(e.clientX, e.clientY);
      const onTouchMoveThree = (e: TouchEvent) => {
        if (e.touches.length > 0) updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      };

      window.addEventListener('mousemove', onMouseMoveThree, { passive: true });
      window.addEventListener('touchmove', onTouchMoveThree, { passive: true });

      const fragParams = { hoverRadius: isMobile ? 1.0 : 0.85, liftDist: 0.28, liftSpeedUp: 0.2, liftSpeedDown: 0.08 };
      const startTime = performance.now();
      let lastTime = 0;
      const hover = { point: new THREE.Vector3(), active: 0 };
      const _localHover = new THREE.Vector3();

      function smoothstepFn(min: number, max: number, v: number) {
        const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
        return t * t * (3 - 2 * t);
      }

      let isRunning = true;
      let isLoopActive = false;

      const tick = () => {
        if (!isRunning) {
          isLoopActive = false;
          return;
        }

        // Completely stop requestAnimationFrame when section is not visible
        if (!isSectionVisible.current) {
          isLoopActive = false;
          return;
        }

        isLoopActive = true;
        const elapsed = (performance.now() - startTime) / 1000;
        const delta = Math.min(elapsed - lastTime, 0.05);
        lastTime = elapsed;

        if (isPointerActive) {
          raycaster.setFromCamera(mouse, camera);
          const hits = raycaster.intersectObject(rcMesh);
          if (hits.length > 0) {
            torusGroup.worldToLocal(_localHover.copy(hits[0].point));
            hover.point.copy(_localHover);
            hover.active = Math.min(hover.active + delta * 6, 1);
          } else {
            hover.active = Math.max(hover.active - delta * 3, 0);
          }
        }

        if (hover.active > 0.001 || isPointerActive) {
          for (let i = 0; i < fragments.length; i++) {
            const frag = fragments[i];
            const { cellCenter, cellNormal, rotAxis, maxAngle } = frag.userData;
            let target = 0;
            if (hover.active > 0.01) {
              const dist = cellCenter.distanceTo(hover.point);
              target = (1 - smoothstepFn(0.3, fragParams.hoverRadius, dist)) * hover.active;
            }
            const speed = target > frag.userData.lift ? fragParams.liftSpeedUp : fragParams.liftSpeedDown;
            frag.userData.lift = THREE.MathUtils.lerp(frag.userData.lift, target, speed);
            const lift = frag.userData.lift;

            if (lift > 0.001 || target > 0) {
              frag.position.copy(cellCenter).addScaledVector(cellNormal, 0.015 + lift * fragParams.liftDist);
              frag.quaternion.setFromAxisAngle(rotAxis, lift * maxAngle);
            }
          }
        }

        composer.render();
        animFrameId = requestAnimationFrame(tick);
      };

      // Expose function to trigger RAF loop when scrolled into view
      (containerRef as any)._startFlipLoop = () => {
        if (!isLoopActive && isRunning) {
          tick();
        }
      };

      // ── GSAP scroll animations ──────────────────────────────
      gsap.set(scrollGroup.position, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroup.rotation, { x: 0.15, y: 0, z: 0 });
      gsap.from(scrollGroup.rotation, { y: Math.PI, duration: 2.0, ease: 'power3.out' });
      gsap.from(scrollGroup.position, { y: -2, duration: 2.0, ease: 'power3.out' });

      const idleTween = gsap.to(torusGroup.rotation, {
        y: Math.PI * 2, duration: 24, ease: 'none', repeat: -1, paused: true,
      });
      gsap.delayedCall(2.0, () => idleTween.play());

      const scrollShiftX = isMobile ? 0 : 2.2;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: isMobile ? 1.0 : 2.5, // Faster, smoother touch scroll scrub on mobile
          onToggle: (self) => {
            isSectionVisible.current = self.isActive;
            if (canvasRef.current) {
              canvasRef.current.style.opacity = self.isActive ? '1' : '0';
            }
            if (self.isActive && !isLoopActive && isRunning) {
              tick();
            }
          },
          onUpdate: (self) => {
            if (self.progress > 0.02) idleTween.pause();
            else idleTween.resume();
          },
        },
      });

      scrollTl
        .to(scrollGroup.position, { x: -scrollShiftX, y: isMobile ? -0.5 : 0, z: 0, duration: 1, ease: 'power1.inOut' }, 0)
        .to(scrollGroup.rotation, { x: Math.PI * 0.5, y: -Math.PI * 0.6, z: Math.PI * 0.25, duration: 1, ease: 'power1.inOut' }, 0)
        .to(scrollGroup.position, { x: scrollShiftX, y: isMobile ? 0.5 : 0, z: 0, duration: 1, ease: 'power1.inOut' }, 1)
        .to(scrollGroup.rotation, { x: -Math.PI * 0.5, y: Math.PI * 0.6, z: -Math.PI * 0.25, duration: 1, ease: 'power1.inOut' }, 1);

      // Resize handler
      const onResize = () => {
        const mobile = window.innerWidth < 768;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.position.z = mobile ? 8.5 : 7;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(mobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
        composer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', onResize);

      threeCleanup = () => {
        isRunning = false;
        cancelAnimationFrame(animFrameId);
        window.removeEventListener('mousemove', onMouseMoveThree);
        window.removeEventListener('touchmove', onTouchMoveThree);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        composer.dispose();
      };
    })();

    // ── GSAP HUD & Content Entrance Animations ───────────────
    const gsapCtx = gsap.context(() => {
      if (navStatusRef.current) gsap.to(navStatusRef.current, { opacity: 1, duration: 1, delay: 1.2 });
      gsap.to([hudTLRef.current, hudBRRef.current].filter(Boolean), { opacity: 1, duration: 1, delay: 1.0, stagger: 0.2 });

      const sidebarLabels = document.querySelectorAll('.gsapflip-sidebar-label');
      if (sidebarLabels.length > 0) {
        gsap.to(sidebarLabels, { opacity: 1, x: 0, duration: 0.6, delay: 1.2, stagger: 0.1 });
      }

      gsap.timeline({ delay: 0.3 })
        .to('.gsapflip-hero-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .to('.gsapflip-hero-meta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.gsapflip-hero-cta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .to('.gsapflip-hero-coords', { opacity: 1, duration: 0.4 }, '-=0.2')
        .to('.gsapflip-hover-hint', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.1');

      gsap.timeline({ scrollTrigger: { trigger: '#gsapflip-section-2', start: 'top 75%' } })
        .to('#gsapflip-section-2 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#gsapflip-section-2 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#gsapflip-section-2 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#gsapflip-section-2 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#gsapflip-section-2 .stats', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      gsap.timeline({ scrollTrigger: { trigger: '#gsapflip-section-3', start: 'top 75%' } })
        .to('#gsapflip-section-3 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#gsapflip-section-3 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#gsapflip-section-3 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#gsapflip-section-3 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#gsapflip-section-3 .feat-list', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      // Sidebar active state
      ['#gsapflip-section-1', '#gsapflip-section-2', '#gsapflip-section-3'].forEach((id, i) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => { if (self.isActive) setActiveSidebar(i); },
        });
      });

      // Hide HUD elements when leaving hero section
      ScrollTrigger.create({
        trigger: '#gsapflip-section-2',
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.gsapflip-hover-hint', { opacity: 0, duration: 0.3 });
          gsap.to([hudTLRef.current, hudBRRef.current, heroCoordsRef.current].filter(Boolean), { opacity: 0, duration: 0.3 });
          if (sidebarRef.current) gsap.to(sidebarRef.current, { opacity: 0, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to('.gsapflip-hover-hint', { opacity: 1, duration: 0.3 });
          gsap.to([hudTLRef.current, hudBRRef.current, heroCoordsRef.current].filter(Boolean), { opacity: 1, duration: 0.3 });
          if (sidebarRef.current) gsap.to(sidebarRef.current, { opacity: 1, duration: 0.3 });
        },
      });

      // Overlay visibility trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          isSectionVisible.current = true;
          (containerRef.current as any)?._startFlipLoop?.();
          gsap.to([canvasRef.current, scanlinesRef.current].filter(Boolean), { opacity: 1, duration: 0.4 });
        },
        onLeave: () => {
          isSectionVisible.current = false;
          gsap.to([canvasRef.current, scanlinesRef.current, navStatusRef.current, hudTLRef.current, hudBRRef.current, sidebarRef.current].filter(Boolean), { opacity: 0, duration: 0.3 });
        },
        onEnterBack: () => {
          isSectionVisible.current = true;
          (containerRef.current as any)?._startFlipLoop?.();
          gsap.to([canvasRef.current, scanlinesRef.current].filter(Boolean), { opacity: 1, duration: 0.3 });
        },
        onLeaveBack: () => {
          isSectionVisible.current = false;
          gsap.to([canvasRef.current, scanlinesRef.current, navStatusRef.current, hudTLRef.current, hudBRRef.current, sidebarRef.current].filter(Boolean), { opacity: 0, duration: 0.3 });
        },
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(cursorAF);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousemove', updateHUD);
      window.removeEventListener('touchmove', updateHUD);
      gsapCtx.revert();
      threeCleanup?.();
    };
  }, [mounted]);

  if (!mounted) return <section className="w-full h-screen" style={{ background: '#080808' }} />;

  return (
    <div
      ref={containerRef}
      id="services-section"
      className="relative w-full overflow-hidden"
      style={{ background: '#080808', color: '#eee8de', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {/* ── WebGL Canvas Background ─────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 1 }}
      />

      {/* ── Scanlines (Disabled for clean layout) ── */}
      <div
        ref={scanlinesRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          opacity: 0,
          background: 'none',
        }}
      />

      {/* ── Custom Cursor (Desktop Only) ──────────────────── */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none hidden md:block"
        style={{
          width: 10, height: 10, borderRadius: '50%', background: '#ff4d00',
          zIndex: 9999, transform: 'translate(-50%, -50%)', mixBlendMode: 'screen',
        }}
      />
      <div
        ref={cursorRingRef}
        className="fixed pointer-events-none hidden md:block"
        style={{
          width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,77,0,0.5)',
          zIndex: 9998, transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── Responsive Top Navigation Bar ──────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 flex justify-between items-center pointer-events-none px-5 md:px-12 py-4 md:py-7"
        style={{
          zIndex: 100,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: '#eee8de', opacity: 0.6 }}>
        </span>
        <div
          ref={navStatusRef}
          className="flex items-center gap-2.5"
          style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#ff4d00', opacity: 0 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4d00', animation: 'gsapflip-blink 1.4s ease-in-out infinite' }} />
        </div>
      </nav>

      {/* ── Sidebar Progress (Desktop Only) ────────────────── */}
      <div
        ref={sidebarRef}
        className="fixed hidden md:flex flex-col gap-6 items-start pointer-events-none"
        style={{ left: '2.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100, opacity: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center">
            <div style={{
              width: activeSidebar === i ? 32 : 20,
              height: 1,
              background: activeSidebar === i ? '#ff4d00' : 'rgba(255,255,255,0.15)',
              transition: 'width 0.4s, background 0.4s',
            }} />
          </div>
        ))}
      </div>

      {/* ── HUD Corner Decorations (Desktop & Tablet) ─────── */}
      <div
        ref={hudTLRef}
        className="fixed pointer-events-none hidden sm:block"
        style={{ top: '4.5rem', left: '2.5rem', zIndex: 100, opacity: 0 }}
      >
        <svg width="32" height="32" fill="none">
          <path d="M32 1H1v31" stroke="rgba(255,77,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      <div
        ref={hudBRRef}
        className="fixed pointer-events-none hidden sm:flex flex-col items-end"
        style={{ bottom: '2rem', right: '2.5rem', zIndex: 100, opacity: 0, gap: '0.5rem' }}
      >
        <div
          ref={hudReadoutRef}
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.2)',
            lineHeight: 1.8,
            textAlign: 'right',
          }}
        >
          X: +0.000<br />Y: +0.000<br />Z: +7.000
        </div>
        <svg width="32" height="32" fill="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M32 1H1v31" stroke="rgba(255,77,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Scrollable Sections Container ──────────────────── */}
      <div className="relative" style={{ zIndex: 10, pointerEvents: 'none' }}>

        {/* SECTION 1 — Hero */}
        <section
          id="gsapflip-section-1"
          className="min-h-screen mb-[30vh] md:mb-[60vh] flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 md:pt-32 pb-12 relative"
        >
          <div className="flex flex-col items-center pt-4 md:pt-[4vh]">
            <h2
              className="gsapflip-hero-title text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-center uppercase"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              The future<br />is <span style={{ color: '#ff4d00' }}>fracture.</span>
            </h2>

            <div
              className="gsapflip-hero-meta text-center mt-6 md:mt-8"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.68rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#ff4d00', display: 'block', marginBottom: '0.8rem' }}>
                Fullstack &amp; Web Development
              </span>
              <span className="text-base sm:text-lg md:text-xl text-white/90 font-normal max-w-[38ch] md:max-w-[42ch] leading-relaxed mx-auto block">
                Crafting modern web applications, high-converting platforms, and seamless digital solutions.
              </span>
            </div>
          </div>

          <div
            className="gsapflip-hover-hint absolute bottom-36 md:bottom-60 left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              opacity: 0,
            }}
          >
            ↑ Touch / move over surface to interact ↑
          </div>

          <div className="flex justify-center items-end relative w-full">
            <div
              className="gsapflip-hero-cta flex flex-col items-center gap-4 pointer-events-auto cursor-pointer"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(238,232,222,0.4)' }}>
                Scroll to explore
              </span>
              <div style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'gsapflip-float 2.5s ease-in-out infinite' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div
              ref={heroCoordsRef}
              className="gsapflip-hero-coords hidden sm:block absolute bottom-0 right-0"
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.58rem', letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.2)', textAlign: 'right',
                opacity: 0, lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: 'φ 000.00° · θ 000.00°<br />FRAGMENTS: 350+ · CELLS: 22×22' }}
            />
          </div>
        </section>

        {/* Separator Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* SECTION 2 — Architecture */}
        <section
          id="gsapflip-section-2"
          className="min-h-screen mb-[30vh] md:mb-[60vh] grid grid-cols-1 md:grid-cols-2"
        >
          <div className="hidden md:block min-h-screen" />
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-16 md:py-24 border-l-0 md:border-l border-white/5 bg-black/50 md:bg-transparent">
            <div className="sec-num" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem', opacity: 0 }}>
              02 / 03
            </div>
            <p className="sec-tag" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ff4d00', marginBottom: '1.2rem', opacity: 0, transform: 'translateY(15px)' }}>
              {"// Development Approach"}
            </p>
            <h2 className="sec-h2 text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight mb-6 text-white" style={{ opacity: 0, transform: 'translateY(25px)' }}>
              Clean Code.<br />Seamless Performance.
            </h2>
            <p className="sec-body text-base sm:text-lg leading-relaxed text-white/90 max-w-[42ch] mb-8 font-normal" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              Every project is engineered for speed, responsiveness, and business growth. I combine clean Next.js architecture with modern UI interactions to turn your vision into a production-ready web application.
            </p>
            <div className="stats grid grid-cols-3 border-t border-white/10 pt-6" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              {[{ n: '100%', l: 'Responsive' }, { n: '<1s', l: 'Fast Load' }, { n: 'SEO', l: 'Optimized' }].map((s) => (
                <div key={s.l}>
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#ff4d00] leading-none">{s.n}</div>
                  <div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: '0.4rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Separator Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* SECTION 3 — Interaction */}
        <section
          id="gsapflip-section-3"
          className="min-h-screen mb-[15vh] md:mb-[10vh] grid grid-cols-1 md:grid-cols-2"
        >
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-16 md:py-24 border-r-0 md:border-r border-white/5 bg-black/50 md:bg-transparent">
            <div className="sec-num" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem', opacity: 0 }}>
              03 / 03
            </div>
            <p className="sec-tag" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ff4d00', marginBottom: '1.2rem', opacity: 0, transform: 'translateY(15px)' }}>
              {"// Services & Value"}
            </p>
            <h2 className="sec-h2 text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight mb-6 text-white" style={{ opacity: 0, transform: 'translateY(25px)' }}>
              Custom Web Solutions.<br />Built For Growth.
            </h2>
            <p className="sec-body text-base sm:text-lg leading-relaxed text-white/90 max-w-[42ch] mb-8 font-normal" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              Whether you need a modern business website, custom web application, or high-converting landing page, I deliver scalable digital solutions crafted to attract and convert new clients.
            </p>
            <ul className="feat-list flex flex-col border-t border-white/10" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              {[
                'Fullstack Web Apps · Next.js & React',
                'Responsive & Mobile-First UI/UX Design',
                'SEO Optimization & High Performance',
                'Fast Turnaround & Dedicated Support',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 py-3.5 border-b border-white/10 text-sm sm:text-base text-white/90 font-medium" style={{ fontFamily: '"Courier New", Courier, monospace', letterSpacing: '0.05em' }}>
                  <span style={{ color: '#ff4d00' }}>→</span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block min-h-screen" />
        </section>

      </div>

      {/* ── Keyframe Animations ────────────────────────────── */}
      <style>{`
        @keyframes gsapflip-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes gsapflip-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
