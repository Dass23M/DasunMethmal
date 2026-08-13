'use client';

import { useEffect, useRef } from 'react';
// Type-only import — resolved at compile time only, zero runtime bundle impact
import type * as THREE from 'three';


// ─── Gallery media – uses the site's own poster + editorial images ─────────────
const MEDIA = [
  { src: '/images/poster-5.png',   title: 'BRAND VISUAL',       meta: 'POSTER DESIGN' },
  { src: '/images/poster-1.png',   title: 'SOCIAL PROMO',       meta: 'CAMPAIGN ADS' },
  { src: '/images/poster-2.png',   title: 'TYPOGRAPHY POSTER',  meta: 'EDITORIAL' },
  { src: '/images/poster-3.jpg',   title: 'MINIMALIST CAMPAIGN',meta: 'BRAND VISUAL' },
  { src: '/images/poster-4.png',   title: 'PRODUCT LAUNCH',     meta: 'LAUNCH CREATIVE' },
  { src: '/images/editorial_1.png',title: 'EDITORIAL 01',       meta: 'VISUAL DESIGN' },
  { src: '/images/editorial_2.png',title: 'EDITORIAL 02',       meta: 'VISUAL DESIGN' },
  { src: '/images/editorial_3.png',title: 'EDITORIAL 03',       meta: 'VISUAL DESIGN' },
  { src: '/images/editorial_4.png',title: 'EDITORIAL 04',       meta: 'VISUAL DESIGN' },
  { src: '/images/dm_1.png',       title: 'DIGITAL MARKETING',  meta: 'PERFORMANCE ADS' },
  { src: '/images/dm_2.png',       title: 'DM CAMPAIGN',        meta: 'GROWTH ADS' },
  { src: '/images/dm_3.png',       title: 'SOCIAL CREATIVE',    meta: 'META ADS' },
  { src: '/images/dm_4.png',       title: 'AD CREATIVE',        meta: 'CONVERSION' },
  { src: '/images/post-1.png',     title: 'SOCIAL POST 01',     meta: 'SOCIAL MEDIA' },
  { src: '/images/post-2.png',     title: 'SOCIAL POST 02',     meta: 'SOCIAL MEDIA' },
  { src: '/images/post-3.png',     title: 'SOCIAL POST 03',     meta: 'SOCIAL MEDIA' },
  { src: '/images/post-4.png',     title: 'SOCIAL POST 04',     meta: 'SOCIAL MEDIA' },
  { src: '/images/digitalmarketing.png', title: 'DIGITAL MARKETING', meta: 'STRATEGY' },
];

const TOTAL = MEDIA.length;

export default function InfiniteGallery3D() {
  const mountRef   = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    let cancelled = false;

    // ── Dynamically import Three.js + GSAP (no SSR) ─────────────────────────
    Promise.all([
      import('three'),
      import('gsap'),
    ]).then(([THREE, { gsap }]) => {
      if (cancelled || !mountRef.current) return;

      const container = mountRef.current;

      // ── Config ─────────────────────────────────────────────────────────────
      const SEG          = 380;
      const HW           = 3.0;
      const HH           = 3.0;
      const STATIONS     = TOTAL;
      const RING_RADIUS  = 88;
      const SPEED        = 0.0055;
      const MOUSE_AMP    = 0.10;
      const FADE_FAR     = 55;
      const PANEL_FAR    = 62;
      const CELL         = 0.75;

      // ── Scene / Renderer ───────────────────────────────────────────────────
      const scene    = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      const camera   = new THREE.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        160,
      );

      const canvas   = document.createElement('canvas');
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;z-index:0;';
      container.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;

      // ── Deterministic RNG ──────────────────────────────────────────────────
      let seed = 20260813;
      function rand() {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
      }

      // ── Curved path ────────────────────────────────────────────────────────
      const pathPoints: THREE.Vector3[] = [];
      const RING_POINTS = 24;
      for (let i = 0; i < RING_POINTS; i++) {
        const a = (i / RING_POINTS) * Math.PI * 2;
        const r = RING_RADIUS * (1 + Math.sin(a * 3) * 0.13 + (rand() - 0.5) * 0.05);
        pathPoints.push(new THREE.Vector3(
          Math.cos(a) * r,
          Math.sin(a * 2) * 6 + Math.sin(a * 5) * 2,
          Math.sin(a) * r,
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pathPoints, true, 'catmullrom', 0.5);
      curve.arcLengthDivisions = 4000;
      const totalLength = curve.getLength();
      const frames      = curve.computeFrenetFrames(SEG, true);
      const ringPoints: THREE.Vector3[] = [];
      for (let i = 0; i <= SEG; i++) ringPoints.push(curve.getPointAt((i % SEG) / SEG));
      const cellV = totalLength / Math.round(totalLength / CELL);

      // ── Tunnel geometry ────────────────────────────────────────────────────
      const FACES = [
        { off: [HW,  0], a: [0, -HH * (1)], b: [0, HH * (1)] },
        { off: [-HW, 0], a: [0, -HH * (1)], b: [0, HH * (1)] },
        { off: [0,  HH], a: [-HW * (1), 0], b: [HW * (1), 0] },
        { off: [0, -HH], a: [-HW * (1), 0], b: [HW * (1), 0] },
      ];

      function buildTunnel() {
        const pos: number[] = [], uv: number[] = [], edge: number[] = [], idx: number[] = [];
        const tmp = new THREE.Vector3();
        FACES.forEach(face => {
          const base = pos.length / 3;
          const span = Math.hypot(face.b[0] - face.a[0], face.b[1] - face.a[1]);
          for (let i = 0; i <= SEG; i++) {
            const p = ringPoints[i];
            const N = frames.normals[i % SEG];
            const B = frames.binormals[i % SEG];
            const v = (i / SEG) * totalLength;
            for (let k = 0; k < 2; k++) {
              const c = k === 0 ? face.a : face.b;
              tmp.copy(p).addScaledVector(B, face.off[0] + c[0]).addScaledVector(N, face.off[1] + c[1]);
              pos.push(tmp.x, tmp.y, tmp.z);
              uv.push(k * span, v);
              edge.push(k);
            }
          }
          for (let i = 0; i < SEG; i++) {
            const a = base + i * 2;
            idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
          }
        });
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uv, 2));
        geo.setAttribute('aEdge',    new THREE.Float32BufferAttribute(edge, 1));
        geo.setIndex(idx);
        return geo;
      }

      // ── Grid tunnel shader – orange accent instead of ice-blue ─────────────
      const gridMat = new THREE.ShaderMaterial({
        uniforms: {
          uCellU:    { value: CELL },
          uCellV:    { value: cellV },
          uColor:    { value: new THREE.Color(0x4a3520) },   // warm dark amber
          uAccent:   { value: new THREE.Color(0xFF6B00) },   // brand orange
          uIntensity:{ value: 0.55 },
          uTime:     { value: 0 },
          uFar:      { value: FADE_FAR },
          uHeadV:    { value: 0 },
          uLoop:     { value: totalLength },
        },
        vertexShader: /* glsl */`
          attribute float aEdge;
          varying vec2 vUv; varying float vEdge; varying float vDist;
          void main() {
            vUv = uv; vEdge = aEdge;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vDist = -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */`
          uniform float uCellU, uCellV, uIntensity, uTime, uFar, uHeadV, uLoop;
          uniform vec3 uColor, uAccent;
          varying vec2 vUv; varying float vEdge; varying float vDist;

          float gridLine(float x, float cell) {
            float c = x / cell;
            float d = abs(fract(c - 0.5) - 0.5) / max(fwidth(c), 1e-5);
            return 1.0 - clamp(d, 0.0, 1.0);
          }
          void main() {
            float lu = gridLine(vUv.x, uCellU);
            float lv = gridLine(vUv.y, uCellV);
            float line = max(lu, lv);
            float e   = min(vEdge, 1.0 - vEdge);
            float rim = 1.0 - clamp(e / max(fwidth(vEdge), 1e-5), 0.0, 1.0);
            float wave = 0.5 + 0.5 * sin(vUv.y * 0.05 - uTime * 0.3);
            float dv = mod(vUv.y - uHeadV + uLoop * 0.5, uLoop) - uLoop * 0.5;
            float win = smoothstep(-16.0, -7.0, dv) * (1.0 - smoothstep(uFar * 0.3, uFar, dv));
            float fadeNear = smoothstep(0.6, 7.0, vDist);
            float fade = win * fadeNear;
            float a = (line * 0.75 + rim * 0.9) * uIntensity * fade;
            a *= mix(0.75, 1.1, wave);
            if (a < 0.002) discard;
            vec3 col = mix(uColor, uAccent, rim * 0.6 + wave * 0.15);
            gl_FragColor = vec4(col, a);
          }
        `,
        transparent: true,
        depthWrite:  false,
        side:        THREE.DoubleSide,
        blending:    THREE.AdditiveBlending,
      });

      const tunnel = new THREE.Mesh(buildTunnel(), gridMat);
      tunnel.frustumCulled = false;
      scene.add(tunnel);

      // ── Panel shader ───────────────────────────────────────────────────────
      const panelVert = /* glsl */`
        varying vec2 vUv; varying float vDist;
        void main() {
          vUv = uv;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vDist = -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `;
      const panelFrag = /* glsl */`
        uniform sampler2D uMap;
        uniform vec2 uCrop;
        uniform vec3 uFrame;
        uniform float uHover, uFar;
        varying vec2 vUv; varying float vDist;
        void main() {
          vec2 uv = 0.5 + (vUv - 0.5) * uCrop;
          vec3 col = texture2D(uMap, uv).rgb;
          vec2 d = min(vUv, 1.0 - vUv);
          float edge = 1.0 - smoothstep(0.0, 0.012, min(d.x, d.y));
          float halo = 1.0 - smoothstep(0.012, 0.06, min(d.x, d.y));
          col *= mix(1.0, 1.18, uHover);
          col += uFrame * edge * mix(0.2, 0.9, uHover);
          col += uFrame * halo * mix(0.03, 0.18, uHover);
          float fade = 1.0 - smoothstep(uFar * 0.55, uFar, vDist);
          gl_FragColor = vec4(col * fade, 1.0);
        }
      `;

      // ── Build panels ───────────────────────────────────────────────────────
      const panels: {
        index: number;
        mesh: THREE.Mesh;
        material: THREE.ShaderMaterial;
        t: number;
        center: THREE.Vector3;
        inward: THREE.Vector3;
        up: THREE.Vector3;
        w: number; h: number;
        media: typeof MEDIA[0];
      }[] = [];

      const textureLoader = new THREE.TextureLoader();
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const texCache = new Map<string, THREE.Texture>();

      const CELLS_ACROSS = Math.round((2 * HW) / CELL);
      const FACE_ORDER = [0, 1, 2, 0, 1, 3, 0, 1, 2, 0, 3, 1, 0, 2, 1, 0, 3, 2];

      const _p  = new THREE.Vector3();
      const _n  = new THREE.Vector3();
      const _b  = new THREE.Vector3();
      const _v  = new THREE.Vector3();

      function frameAt(t: number, outP: THREE.Vector3, outN: THREE.Vector3, outB: THREE.Vector3) {
        const tt = ((t % 1) + 1) % 1;
        const f  = tt * SEG;
        const i0 = Math.floor(f) % SEG;
        const i1 = (i0 + 1) % SEG;
        const k  = f - Math.floor(f);
        outP.copy(curve.getPointAt(tt));
        outN.copy(frames.normals[i0]).lerp(frames.normals[i1], k).normalize();
        outB.copy(frames.binormals[i0]).lerp(frames.binormals[i1], k).normalize();
      }

      function surfacePoint(faceId: number, v: number, across: number, out: THREE.Vector3) {
        frameAt(v / totalLength, _p, _n, _b);
        out.copy(_p);
        if (faceId === 0)      out.addScaledVector(_b, HW - 0.04).addScaledVector(_n, across);
        else if (faceId === 1) out.addScaledVector(_b, -(HW - 0.04)).addScaledVector(_n, across);
        else if (faceId === 2) out.addScaledVector(_n, HH - 0.04).addScaledVector(_b, across);
        else                   out.addScaledVector(_n, -(HH - 0.04)).addScaledVector(_b, across);
        return out;
      }

      function buildPanelGeo(faceId: number, v0: number, v1: number, a0: number, a1: number) {
        const wall  = faceId < 2;
        const steps = Math.max(2, Math.ceil(Math.abs(v1 - v0) / (cellV * 0.35)));
        const pos: number[] = [], uv: number[] = [], idx: number[] = [];
        for (let j = 0; j <= steps; j++) {
          const s = j / steps;
          const v = v0 + (v1 - v0) * s;
          for (let k = 0; k < 2; k++) {
            const a = k === 0 ? a0 : a1;
            surfacePoint(faceId, v, a, _v);
            pos.push(_v.x, _v.y, _v.z);
            if (wall) uv.push(faceId === 0 ? 1 - s : s, k);
            else      uv.push(faceId === 2 ? 1 - k : k, s);
          }
        }
        for (let j = 0; j < steps; j++) {
          const b = j * 2;
          idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uv, 2));
        geo.setIndex(idx);
        geo.computeBoundingSphere();
        return geo;
      }

      const WALL_FP = [[3,5],[4,6],[6,4],[5,5],[3,4],[7,4],[4,5]];
      const CAP_FP  = [[5,3],[4,4],[6,4],[3,2]];

      let vSlot = 0;

      for (let i = 0; i < STATIONS; i++) {
        const media  = MEDIA[i % MEDIA.length];
        const faceId = FACE_ORDER[i % FACE_ORDER.length];
        const wall   = faceId < 2;
        const fp     = wall
          ? WALL_FP[Math.floor(rand() * WALL_FP.length)]
          : CAP_FP[Math.floor(rand() * CAP_FP.length)];
        const [cellsAlong, cellsAcross] = wall ? [fp[0], fp[1]] : [fp[1], fp[0]];

        const totalSlots = Math.round(totalLength / cellV);
        const stride     = Math.floor(totalSlots / STATIONS);
        vSlot = Math.max(vSlot, i * stride);
        const kStart = vSlot % totalSlots;
        vSlot += cellsAlong + 2 + Math.floor(rand() * 3);

        const vA     = kStart * cellV + 0.01;
        const vB     = (kStart + cellsAlong) * cellV - 0.01;
        const vCenter = (vA + vB) * 0.5;
        const t       = (vCenter / totalLength) % 1;

        const mMax = CELLS_ACROSS - cellsAcross;
        const m    = Math.max(0, Math.min(mMax, 1 + Math.floor(rand() * (mMax - 1))));
        const aA   = m * CELL - HW + 0.01;
        const aB   = (m + cellsAcross) * CELL - HW - 0.01;
        const across = (aA + aB) * 0.5;

        const w = wall ? vB - vA : aB - aA;
        const h = wall ? aB - aA : vB - vA;

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uMap:   { value: null },
            uCrop:  { value: new THREE.Vector2(1, 1) },
            uFrame: { value: new THREE.Color(0xFF6B00) },
            uHover: { value: 0 },
            uFar:   { value: PANEL_FAR },
          },
          vertexShader:   panelVert,
          fragmentShader: panelFrag,
          side:           THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(buildPanelGeo(faceId, vA, vB, aA, aB), material);
        mesh.frustumCulled = false;
        scene.add(mesh);

        // Load texture (cached)
        let tex = texCache.get(media.src);
        if (!tex) {
          tex = textureLoader.load(media.src, (t) => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = maxAniso;
            // crop to fit panel aspect
            const imgAsp   = t.image.width / t.image.height;
            const panelAsp = w / h;
            const crop = material.uniforms.uCrop.value as THREE.Vector2;
            if (imgAsp > panelAsp) crop.set(panelAsp / imgAsp, 1);
            else                   crop.set(1, imgAsp / panelAsp);
          });
          texCache.set(media.src, tex);
        }
        material.uniforms.uMap.value = tex;

        const center = surfacePoint(faceId, vCenter, across, new THREE.Vector3());
        frameAt(t, _p, _n, _b);
        const inward = new THREE.Vector3();
        if (faceId === 0)      inward.copy(_b).multiplyScalar(-1);
        else if (faceId === 1) inward.copy(_b);
        else if (faceId === 2) inward.copy(_n).multiplyScalar(-1);
        else                   inward.copy(_n);
        const up = wall
          ? _n.clone()
          : _p.clone().sub(curve.getPointAt((((t - 0.004) % 1) + 1) % 1)).normalize();

        mesh.userData.panel = { index: i, mesh, material, t, center, inward, up, w, h, media };
        panels.push(mesh.userData.panel);
      }


      // ── Responsive UI (CSS injected into container) ─────────────────────────
      const style = document.createElement('style');
      style.textContent = `
        .ig-ui { position:absolute;inset:0;pointer-events:none;z-index:10;font-family:"Courier New",monospace; }
        .ig-logo {
          position:absolute;top:1.4rem;left:1.8rem;
          font-size:0.62rem;letter-spacing:0.34em;opacity:0.45;color:#FF6B00;
        }
        .ig-brand {
          position:absolute;top:1.4rem;right:1.8rem;
          text-align:right;line-height:1.75;color:#e8eef8;
        }
        .ig-brand-name  { font-size:0.7rem;letter-spacing:0.18em;font-weight:700; }
        .ig-brand-sub   { font-size:0.54rem;letter-spacing:0.26em;color:#FF6B00;opacity:0.85; }
        .ig-brand-vol   { font-size:0.54rem;letter-spacing:0.26em;opacity:0.38; }
        .ig-counter {
          position:absolute;bottom:1.4rem;left:1.8rem;
          font-size:0.58rem;letter-spacing:0.2em;line-height:2.1;
          color:rgba(255,107,0,0.55);
        }
        .ig-counter-n   { color:#e8eef8; }
        .ig-counter-hint{ opacity:0.4;font-size:0.5rem;letter-spacing:0.22em;display:block;margin-top:0.1rem; }
        .ig-card {
          position:absolute;left:50%;bottom:2.2rem;
          transform:translate(-50%,1.2rem);
          min-width:280px;
          padding:0.85rem 1.3rem;
          border:1px solid rgba(255,107,0,0.22);
          background:rgba(4,4,4,0.78);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
          opacity:0;pointer-events:none;
          transition:opacity 0.38s ease,transform 0.38s ease;
          box-sizing:border-box;
        }
        .ig-card-title  { font-size:0.75rem;letter-spacing:0.16em;color:#e8eef8; }
        .ig-card-meta   { margin-top:0.3rem;font-size:0.52rem;letter-spacing:0.24em;color:#FF6B00;opacity:0.8; }
        .ig-card-esc    { margin-top:0.5rem;font-size:0.46rem;letter-spacing:0.22em;opacity:0.35;color:#e8eef8; }
        /* vignette inside canvas container */
        .ig-vignette {
          position:absolute;inset:0;pointer-events:none;z-index:1;
          background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.65) 100%);
        }
        /* ── Mobile ── */
        @media (max-width:640px) {
          .ig-logo { top:0.85rem;left:1rem;font-size:0.52rem;letter-spacing:0.22em; }
          .ig-brand { top:0.85rem;right:1rem; }
          .ig-brand-name  { font-size:0.58rem;letter-spacing:0.14em; }
          .ig-brand-sub   { font-size:0.44rem;letter-spacing:0.18em; }
          .ig-brand-vol   { display:none; }
          .ig-counter { bottom:0.85rem;left:1rem;font-size:0.5rem; }
          .ig-counter-hint{ font-size:0.42rem;letter-spacing:0.16em; }
          .ig-card {
            left:1rem;right:1rem;
            bottom:1rem;
            min-width:0;width:auto;
            transform:translateY(1rem);
            padding:0.75rem 1rem;
          }
          .ig-card-title { font-size:0.68rem; }
          .ig-card-meta  { font-size:0.48rem; }
          .ig-card-esc   { font-size:0.42rem; }
        }
        /* ── Tablet ── */
        @media (min-width:641px) and (max-width:1024px) {
          .ig-logo { top:1rem;left:1.4rem; }
          .ig-brand { top:1rem;right:1.4rem; }
          .ig-counter { bottom:1rem;left:1.4rem; }
        }
      `;
      container.appendChild(style);

      const vignette = document.createElement('div');
      vignette.className = 'ig-vignette';
      container.appendChild(vignette);

      const ui = document.createElement('div');
      ui.className = 'ig-ui';
      const isMobile = window.matchMedia('(max-width:640px)').matches;
      const hintText = isMobile
        ? 'TAP · CLOSE'
        : 'CLICK · ESC · CLOSE';
      const navHint = isMobile
        ? 'TAP IMAGE TO VIEW'
        : 'HOVER TO PAUSE · CLICK TO VIEW';
      ui.innerHTML = `
        <div class="ig-logo">IG—2026 / CREATIVE_GALLERY</div>
        <div class="ig-brand">
          <div class="ig-brand-name">DASUN METHMAL</div>
          <div class="ig-brand-sub">CREATIVE_PORTFOLIO</div>
          <div class="ig-brand-vol">VOL. 01 · GALLERY TUNNEL</div>
        </div>
        <div class="ig-counter">
          ARTWORK <span class="ig-counter-n" id="ig-n">01</span> / <span class="ig-counter-n">${String(TOTAL).padStart(2,'0')}</span>
          <span class="ig-counter-hint">${navHint}</span>
        </div>
        <div class="ig-card" id="ig-card">
          <div class="ig-card-title" id="ig-card-title">—</div>
          <div class="ig-card-meta"  id="ig-card-meta">—</div>
          <div class="ig-card-esc">${hintText}</div>
        </div>
      `;
      container.appendChild(ui);

      const counterEl  = ui.querySelector('#ig-n')          as HTMLElement;
      const cardEl     = ui.querySelector('#ig-card')       as HTMLElement;
      const cardTitle  = ui.querySelector('#ig-card-title') as HTMLElement;
      const cardMeta   = ui.querySelector('#ig-card-meta')  as HTMLElement;

      // Card shows/hides via opacity + transform from CSS classes (not inline any more)
      // Helper to show/hide card:
      function showCard(title: string, meta: string, full: boolean) {
        cardTitle.textContent = title;
        cardMeta.textContent  = meta;
        cardEl.style.opacity  = full ? '1' : '0.72';
        // Mobile needs a different transform base (no left:50% centering)
        cardEl.style.transform = isMobile
          ? 'translateY(0)'
          : 'translate(-50%, 0)';
      }
      function hideCard() {
        cardEl.style.opacity   = '0';
        cardEl.style.transform = isMobile ? 'translateY(1rem)' : 'translate(-50%, 1.2rem)';
      }
      hideCard(); // start hidden


      // ── Camera state ───────────────────────────────────────────────────────
      type Panel = typeof panels[0];
      const state = {
        t:        0,
        speedMul: 1,
        focusMix: 0,       // 0 = flying, 1 = locked on panel
        focus:    null as Panel | null,
        mouse:    new THREE.Vector2(-2, -2),
        aim:      new THREE.Vector2(0, 0),
        aimTarget:new THREE.Vector2(0, 0),
        hovered:  null as Panel | null,
        currentIdx: -1,
      };

      // Travel camera (continuous fly-through)
      const travelPos  = new THREE.Vector3();
      const travelQuat = new THREE.Quaternion();
      const lookTarget = new THREE.Vector3();
      const mUp        = new THREE.Vector3();
      const lookMatrix = new THREE.Matrix4();
      const aimQuat    = new THREE.Quaternion();
      const aimEuler   = new THREE.Euler();
      const rawQuat    = new THREE.Quaternion();
      const smoothQuat = new THREE.Quaternion();
      let   quatReady  = false;
      let   smoothRoll = 0;

      // Focus camera (locked on clicked panel)
      const focusPos  = new THREE.Vector3();
      const focusQuat = new THREE.Quaternion();
      const focusLookMatrix = new THREE.Matrix4();

      function normalAt(t: number, out: THREE.Vector3) {
        const f  = ((t % 1) + 1) * SEG;
        const i0 = Math.floor(f) % SEG;
        const i1 = (i0 + 1) % SEG;
        return out.copy(frames.normals[i0]).lerp(frames.normals[i1], f - Math.floor(f)).normalize();
      }

      function frameIdxAt(t: number) {
        return ((Math.round(t * SEG) % SEG) + SEG) % SEG;
      }

      // Compute ideal camera position/orientation facing a panel
      function focusTargets(panel: Panel) {
        // Stand in front of the panel, far enough to see it clearly
        const dist = Math.max(panel.w / camera.aspect, panel.h) * 1.35;
        focusPos.copy(panel.center).addScaledVector(panel.inward, dist);
        focusLookMatrix.lookAt(focusPos, panel.center, panel.up);
        focusQuat.setFromRotationMatrix(focusLookMatrix);
      }

      function updateTravel(dt: number) {
        // Keep advancing time only when not fully focused (tunnel still ticks for smooth return)
        if (!state.focus)
          state.t = (state.t + SPEED * state.speedMul * dt) % 1;
        const t = state.t;
        travelPos.copy(curve.getPointAt(t));
        lookTarget.copy(curve.getPointAt((t + 0.022) % 1));
        normalAt(t, mUp);
        lookMatrix.lookAt(travelPos, lookTarget, mUp);
        rawQuat.setFromRotationMatrix(lookMatrix);
        if (!quatReady) { smoothQuat.copy(rawQuat); quatReady = true; }
        else             smoothQuat.slerp(rawQuat, 1 - Math.exp(-2.6 * dt));
        travelQuat.copy(smoothQuat);

        const t0   = frames.tangents[frameIdxAt(t)];
        const t1   = frames.tangents[frameIdxAt((t + 0.02) % 1)];
        const roll = new THREE.Vector3().copy(t0).cross(t1);
        const tRoll = THREE.MathUtils.clamp(roll.dot(mUp) * 3.5, -0.1, 0.1);
        smoothRoll += (tRoll - smoothRoll) * (1 - Math.exp(-1.8 * dt));

        aimEuler.set(state.aim.y, state.aim.x, smoothRoll, 'YXZ');
        aimQuat.setFromEuler(aimEuler);
        travelQuat.multiply(aimQuat);
      }

      // ── Open / Close panel ─────────────────────────────────────────────────
      function openPanel(panel: Panel) {
        state.focus = panel;
        gsap.killTweensOf(state, 'focusMix');
        gsap.killTweensOf(state, 'speedMul');
        gsap.to(state, { focusMix: 1, duration: 1.6, ease: 'power3.inOut' });
        gsap.to(state, { speedMul: 0, duration: 1.0, ease: 'power2.out'   });
        gsap.to(panel.material.uniforms.uHover, { value: 1, duration: 0.4, ease: 'power2.out' });
        gsap.delayedCall(0.7, () => {
          if (state.focus === panel) showCard(panel.media.title, panel.media.meta, true);
        });
        canvas.style.cursor = 'default';
      }

      function closePanel() {
        if (!state.focus) return;
        const prev = state.focus;
        gsap.killTweensOf(state, 'focusMix');
        gsap.killTweensOf(state, 'speedMul');
        gsap.to(state, {
          focusMix: 0, duration: 1.5, ease: 'power3.inOut',
          onComplete: () => { if (state.focus === prev) state.focus = null; },
        });
        gsap.to(state, { speedMul: 1, duration: 1.8, ease: 'sine.inOut', delay: 0.4 });
        gsap.to(prev.material.uniforms.uHover, { value: 0, duration: 0.5, ease: 'power2.out' });
        hideCard();
        canvas.style.cursor = 'crosshair';
      }

      // ── Hover + raycast ────────────────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const AHEAD  = 0.09;
      const BEHIND = 0.012;

      function updatePanelVis() {
        // While focused, always show focused panel + visible neighbours
        let best = -1, bestD = Infinity;
        panels.forEach(p => {
          let d = p.t - state.t;
          if (d < 0) d += 1;
          const near = d < AHEAD || d > 1 - BEHIND || p === state.focus;
          p.mesh.visible = near;
          if (d < bestD) { bestD = d; best = p.index; }
        });
        const show = state.focus ? state.focus.index : best;
        if (show !== state.currentIdx) {
          state.currentIdx = show;
          if (counterEl) counterEl.textContent = String(show + 1).padStart(2, '0');
        }
      }

      function setHover(panel: Panel | null) {
        if (state.focus)               return;
        if (state.hovered === panel)   return;
        if (state.hovered)
          gsap.to(state.hovered.material.uniforms.uHover, { value: 0, duration: 0.5, ease: 'power2.out' });
        state.hovered = panel;
        if (panel) {
          gsap.to(panel.material.uniforms.uHover, { value: 0.6, duration: 0.4, ease: 'power2.out' });
          showCard(panel.media.title, panel.media.meta, false);
          canvas.style.cursor = 'pointer';
          gsap.to(state, { speedMul: 0.3, duration: 0.9, ease: 'power2.out' });
        } else {
          hideCard();
          canvas.style.cursor = 'crosshair';
          gsap.to(state, { speedMul: 1, duration: 1.2, ease: 'sine.inOut' });
        }
      }

      function updateHover() {
        if (state.focus) return;  // no raycasting while camera is focused
        raycaster.setFromCamera(state.mouse, camera);
        const near: THREE.Object3D[] = [];
        panels.forEach(p => {
          if (p.mesh.visible && p.center.distanceToSquared(camera.position) < 42 * 42)
            near.push(p.mesh);
        });
        const hits = raycaster.intersectObjects(near, false);
        setHover(hits.length ? (hits[0].object.userData.panel as Panel) : null);
      }

      // ── Pointer / touch events ─────────────────────────────────────────────
      let pointerDownAt = 0;
      let pointerDownX  = 0;
      let pointerDownY  = 0;

      function onPointerMove(e: PointerEvent) {
        // Only use mouse-aim for non-touch input
        if (e.pointerType === 'touch') return;
        const rect = container.getBoundingClientRect();
        state.mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        state.mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        if (!state.focus)
          state.aimTarget.set(-state.mouse.x * MOUSE_AMP, state.mouse.y * MOUSE_AMP * 0.7);
      }

      function onPointerDown(e: PointerEvent) {
        pointerDownAt = performance.now();
        pointerDownX  = e.clientX;
        pointerDownY  = e.clientY;
      }

      function onPointerUp(e: PointerEvent) {
        const moved = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
        const held  = performance.now() - pointerDownAt;
        if (moved > 12 || held > 500) return; // ignore drag / long-press

        if (state.focus) {
          closePanel();
          return;
        }

        // On touch: raycast at tap point directly (no hover required)
        if (e.pointerType === 'touch') {
          const rect = container.getBoundingClientRect();
          const mx =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
          const my = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
          const tapMouse = new THREE.Vector2(mx, my);
          raycaster.setFromCamera(tapMouse, camera);
          const near: THREE.Object3D[] = [];
          panels.forEach(p => {
            if (p.mesh.visible && p.center.distanceToSquared(camera.position) < 48 * 48)
              near.push(p.mesh);
          });
          const hits = raycaster.intersectObjects(near, false);
          if (hits.length) {
            openPanel(hits[0].object.userData.panel as Panel);
          }
          return;
        }

        // Desktop: use hovered panel
        if (state.hovered) {
          openPanel(state.hovered);
          setHover(null);
        }
      }

      canvas.addEventListener('pointermove',  onPointerMove, { passive: true });
      canvas.addEventListener('pointerdown',  onPointerDown, { passive: true });
      canvas.addEventListener('pointerup',    onPointerUp);

      // Card close button
      cardEl.style.pointerEvents = 'auto';
      cardEl.addEventListener('pointerdown', (e) => e.stopPropagation());
      cardEl.addEventListener('pointerup',   (e) => { e.stopPropagation(); closePanel(); });

      // ESC key
      function onKeyDown(e: KeyboardEvent) { if (e.key === 'Escape') closePanel(); }
      window.addEventListener('keydown', onKeyDown);

      // ── Resize ─────────────────────────────────────────────────────────────
      function fitCamera() {
        const W = container.clientWidth;
        const H = container.clientHeight;
        camera.aspect = W / H;
        // Wider FOV on narrow/portrait screens so tunnel fills view nicely
        camera.fov = camera.aspect < 0.65 ? 88 : camera.aspect < 0.9 ? 82 : 70;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
        // Re-check mobile breakpoint on resize (e.g. rotation)
        const nowMobile = window.matchMedia('(max-width:640px)').matches;
        if (nowMobile !== isMobile) hideCard(); // reset card position formula
      }
      const ro = new ResizeObserver(fitCamera);
      ro.observe(container);

      // ── Render loop ────────────────────────────────────────────────────────
      let animId = 0;
      let last   = performance.now();

      function tick() {
        animId = requestAnimationFrame(tick);
        const now     = performance.now();
        const dt      = Math.min((now - last) / 1000, 0.05);
        last          = now;
        const elapsed = now / 1000;

        state.aim.lerp(state.aimTarget, 1 - Math.pow(0.001, dt));
        updateTravel(dt);

        // Refresh focus target every frame (panel moves with the tunnel)
        if (state.focus) focusTargets(state.focus);

        // Blend camera between fly-through and panel-focus positions
        if (state.focusMix > 0.0001) {
          camera.position.lerpVectors(travelPos, focusPos, state.focusMix);
          camera.quaternion.slerpQuaternions(travelQuat, focusQuat, state.focusMix);
        } else {
          camera.position.copy(travelPos);
          camera.quaternion.copy(travelQuat);
        }

        gridMat.uniforms.uTime.value   = elapsed;
        gridMat.uniforms.uHeadV.value  = state.t * totalLength;

        updatePanelVis();
        updateHover();

        renderer.render(scene, camera);
      }
      tick();

      // ── Cleanup ────────────────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(animId);
        ro.disconnect();
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointerup',   onPointerUp);
        window.removeEventListener('keydown',     onKeyDown);
        renderer.dispose();
        texCache.forEach(t => t.dispose());
        canvas.remove();
        ui.remove();
      };
    });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
    };
  }, []);

  return (
    <section
      id="gallery-section"
      aria-label="3D Creative Gallery"
      style={{ position: 'relative', width: '100%', height: '100vh', background: '#000', overflow: 'hidden' }}
    >
      {/* Section label — visible before Three.js loads */}
      <div
        style={{
          position:   'absolute',
          top: '50%', left: '50%',
          transform:  'translate(-50%,-50%)',
          color:      'rgba(255,107,0,0.18)',
          fontFamily: '"Courier New",monospace',
          fontSize:   '0.6rem',
          letterSpacing: '0.3em',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        LOADING GALLERY…
      </div>
      {/* Three.js mounts here */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
    </section>
  );
}
