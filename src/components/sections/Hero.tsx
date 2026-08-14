'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type EffectPattern = 'flame' | 'venetian' | 'curtain' | 'hexagon' | 'liquid' | 'zoomsplit';

const TRAIL_IMAGES = [
  '/images/post-1.png',
  '/images/post-2.png',
  '/images/post-3.png',
  '/images/post-4.png',
  '/images/developer-1.png',
  '/images/developer-3.png',
  '/images/developer-7.png',
  '/images/cover_bg_2.png',
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const speedIndicatorRef = useRef<HTMLDivElement>(null);
  const [activeEffect, setActiveEffect] = useState<EffectPattern>('flame');
  const [mounted, setMounted] = useState(false);
  const [intensityText, setIntensityText] = useState('');

  const activeEffectRef = useRef<EffectPattern>('flame');
  activeEffectRef.current = activeEffect;

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── GSAP Reveal Animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.3 }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [mounted]);

  // ── Interactive Cursor & Touch Trail Engine ────────────────────────────────
  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    const container = heroRef.current;
    const isMobile =
      typeof window !== 'undefined' &&
      (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768);

    const config = {
      imageLifespan: 600,
      removalDelay: 16,
      mouseThreshold: isMobile ? 20 : 38,
      inDuration: 600,
      outDuration: 800,
      inEasing: 'cubic-bezier(.07,.5,.5,1)',
      outEasing: 'cubic-bezier(.87, 0, .13, 1)',
      touchImageInterval: 40,
      minMovementForImage: isMobile ? 3 : 5,
      minImageSize: isMobile ? 120 : 180,
      maxImageSize: isMobile ? 220 : 300,
      baseRotation: 25,
      maxRotationFactor: 2.5,
      speedSmoothingFactor: 0.25,
      staggerRange: 45,
      easing: {
        scale: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        reveal: 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    };

    let mouseX = 0,
      mouseY = 0,
      lastMouseX = 0,
      lastMouseY = 0,
      prevMouseX = 0,
      prevMouseY = 0;
    let isMoving = false,
      isCursorInContainer = false,
      isTouching = false;
    let lastRemovalTime = 0,
      lastTouchImageTime = 0,
      lastMoveTime = Date.now();
    let smoothedSpeed = 0,
      maxSpeed = 0;
    let imageIndex = 0;

    const trail: any[] = [];
    const imagePool: HTMLElement[] = [];

    const isInContainer = (x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    const hasMovedEnough = () => {
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      return Math.hypot(dx, dy) > config.mouseThreshold;
    };

    const hasMovedAtAll = () => {
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      return Math.hypot(dx, dy) > config.minMovementForImage;
    };

    const calculateSpeed = () => {
      const now = Date.now();
      const dt = now - lastMoveTime;
      if (dt <= 0) return 0;
      const dist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      const raw = dist / dt;
      if (raw > maxSpeed) maxSpeed = raw;
      const norm = Math.min(raw / (maxSpeed || 0.5), 1);
      smoothedSpeed =
        smoothedSpeed * (1 - config.speedSmoothingFactor) + norm * config.speedSmoothingFactor;
      lastMoveTime = now;

      setIntensityText(
        `${activeEffectRef.current.toUpperCase()} Intensity: ${(smoothedSpeed * 100).toFixed(0)}%`
      );

      return smoothedSpeed;
    };

    const createImageElement = () => {
      if (imagePool.length > 0) {
        return imagePool.pop()!;
      }
      const element = document.createElement('div');
      element.className = 'trail-image';
      return element;
    };

    const returnToPool = (element: HTMLElement) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      element.innerHTML = '';
      element.style.cssText = '';
      element.className = 'trail-image';
      if (imagePool.length < 20) {
        imagePool.push(element);
      }
    };

    const PATTERNS: Record<string, any> = {
      flame: {
        create: (containerEl: HTMLElement, imageSrc: string, size: number) => {
          const img = document.createElement('img');
          img.className = 'trail-img';
          img.src = imageSrc;
          img.width = img.height = size;
          return [{ element: img, index: 0, reveal: () => {}, collapse: () => {} }];
        },
      },
      venetian: {
        create: (containerEl: HTMLElement, imageSrc: string, size: number) => {
          const fragments: any[] = [];
          const stripCount = 10;
          const stripHeight = 100 / stripCount;
          for (let i = 0; i < stripCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'image-fragment';
            const bg = document.createElement('div');
            bg.className = 'fragment-bg';
            bg.style.backgroundImage = `url(${imageSrc})`;
            const y = i * stripHeight;
            fragment.style.cssText = `
              top: 0; left: 0; width: 100%; height: 100%;
              transform: translate3d(0, 0, 0) rotateX(90deg);
              transform-origin: 50% ${y + stripHeight / 2}%;
              clip-path: polygon(0% ${y}%, 100% ${y}%, 100% ${y + stripHeight}%, 0% ${y + stripHeight}%);
              transition: transform ${config.inDuration}ms ${config.easing.reveal};
            `;
            fragment.appendChild(bg);
            fragments.push({
              element: fragment,
              index: i,
              reveal: () => {
                fragment.style.transform = `translate3d(0, 0, 0) rotateX(0deg)`;
              },
              collapse: () => {
                fragment.style.transform = `translate3d(0, 0, 0) rotateX(-90deg)`;
              },
            });
          }
          return fragments;
        },
        revealTiming: (i: number, total: number) => Math.abs(i - total / 2) * 0.08,
        collapseTiming: (i: number) => i * 0.04,
      },
      liquid: {
        create: (containerEl: HTMLElement, imageSrc: string) => {
          const fragments: any[] = [];
          const positions = [
            { x: 25, y: 20, r: 16 }, { x: 70, y: 15, r: 12 },
            { x: 45, y: 35, r: 18 }, { x: 15, y: 55, r: 14 },
            { x: 80, y: 45, r: 15 }, { x: 55, y: 70, r: 20 },
            { x: 30, y: 80, r: 13 }, { x: 75, y: 75, r: 17 },
          ];
          positions.forEach((pos, i) => {
            const fragment = document.createElement('div');
            fragment.className = 'image-fragment';
            const bg = document.createElement('div');
            bg.className = 'fragment-bg';
            bg.style.backgroundImage = `url(${imageSrc})`;
            fragment.style.cssText = `
              top: 0; left: 0; width: 100%; height: 100%;
              clip-path: circle(0% at ${pos.x}% ${pos.y}%);
              transition: clip-path ${config.inDuration}ms ${config.easing.reveal};
            `;
            fragment.appendChild(bg);
            fragments.push({
              element: fragment,
              index: i,
              reveal: () => {
                fragment.style.clipPath = `circle(${pos.r}% at ${pos.x}% ${pos.y}%)`;
              },
              collapse: () => {
                fragment.style.clipPath = `circle(0% at ${pos.x}% ${pos.y}%)`;
              },
            });
          });
          return fragments;
        },
        revealTiming: (i: number, total: number) => (i / total) * 0.4,
        collapseTiming: (i: number, total: number) => ((total - 1 - i) / total) * 0.25,
      },
      curtain: {
        create: (containerEl: HTMLElement, imageSrc: string) => {
          const fragments: any[] = [];
          const stripCount = 8;
          for (let i = 0; i < stripCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'image-fragment';
            const bg = document.createElement('div');
            bg.className = 'fragment-bg';
            bg.style.backgroundImage = `url(${imageSrc})`;
            const x = (i / stripCount) * 100;
            const w = 100 / stripCount;
            fragment.style.cssText = `
              top: 0; left: 0; width: 100%; height: 100%;
              clip-path: polygon(${x + w / 2}% 0%, ${x + w / 2}% 0%, ${x + w / 2}% 100%, ${x + w / 2}% 100%);
              transition: clip-path ${config.inDuration}ms ${config.easing.reveal};
            `;
            fragment.appendChild(bg);
            fragments.push({
              element: fragment,
              index: i,
              reveal: () => {
                fragment.style.clipPath = `polygon(${x}% 0%, ${x + w}% 0%, ${x + w}% 100%, ${x}% 100%)`;
              },
              collapse: () => {
                fragment.style.clipPath = `polygon(${x + w / 2}% 0%, ${x + w / 2}% 0%, ${x + w / 2}% 100%, ${x + w / 2}% 100%)`;
              },
            });
          }
          return fragments;
        },
        revealTiming: (i: number, total: number) => (i / total) * 0.5,
        collapseTiming: (i: number, total: number) => ((total - 1 - i) / total) * 0.3,
      },
      hexagon: {
        create: (containerEl: HTMLElement, imageSrc: string) => {
          const fragments: any[] = [];
          const hexagons = [
            { x: 50, y: 50, size: 20 }, { x: 25, y: 25, size: 15 },
            { x: 75, y: 25, size: 15 }, { x: 85, y: 50, size: 15 },
            { x: 75, y: 75, size: 15 }, { x: 25, y: 75, size: 15 },
          ];
          hexagons.forEach((hex, i) => {
            const fragment = document.createElement('div');
            fragment.className = 'image-fragment';
            const bg = document.createElement('div');
            bg.className = 'fragment-bg';
            bg.style.backgroundImage = `url(${imageSrc})`;
            const s = hex.size;
            const x = hex.x;
            const y = hex.y;
            const hexShape = `polygon(${x - s * 0.5}% ${y - s * 0.87}%, ${x + s * 0.5}% ${y - s * 0.87}%, ${x + s}% ${y}%, ${x + s * 0.5}% ${y + s * 0.87}%, ${x - s * 0.5}% ${y + s * 0.87}%, ${x - s}% ${y}%)`;
            fragment.style.cssText = `
              top: 0; left: 0; width: 100%; height: 100%;
              clip-path: polygon(${x}% ${y}%, ${x}% ${y}%, ${x}% ${y}%);
              transition: clip-path ${config.inDuration}ms ${config.easing.reveal};
            `;
            fragment.appendChild(bg);
            fragments.push({
              element: fragment,
              index: i,
              reveal: () => { fragment.style.clipPath = hexShape; },
              collapse: () => { fragment.style.clipPath = `polygon(${x}% ${y}%, ${x}% ${y}%, ${x}% ${y}%)`; },
            });
          });
          return fragments;
        },
        revealTiming: (i: number) => (i === 0 ? 0 : 0.2 + (i - 1) * 0.06),
        collapseTiming: (i: number) => (i === 0 ? 0.3 : (i - 1) * 0.04),
      },
      zoomsplit: {
        create: (containerEl: HTMLElement, imageSrc: string) => {
          const fragments: any[] = [];
          const gridSize = 3;
          for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
              const fragment = document.createElement('div');
              fragment.className = 'image-fragment';
              const bg = document.createElement('div');
              bg.className = 'fragment-bg';
              bg.style.backgroundImage = `url(${imageSrc})`;
              const x = (col / gridSize) * 100;
              const y = (row / gridSize) * 100;
              const w = 100 / gridSize;
              const h = 100 / gridSize;
              fragment.style.cssText = `
                top: 0; left: 0; width: 100%; height: 100%;
                clip-path: polygon(${x + w / 2}% ${y + h / 2}%, ${x + w / 2}% ${y + h / 2}%, ${x + w / 2}% ${y + h / 2}%, ${x + w / 2}% ${y + h / 2}%);
                transition: clip-path ${config.inDuration}ms ${config.easing.scale};
              `;
              fragment.appendChild(bg);
              fragments.push({
                element: fragment,
                index: row * gridSize + col,
                reveal: () => { fragment.style.clipPath = `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${x + w}% ${y + h}%, ${x}% ${y + h}%)`; },
                collapse: () => { fragment.style.clipPath = `polygon(${x + w / 2}% ${y + h / 2}%, ${x + w / 2}% ${y + h / 2}%, ${x + w / 2}% ${y + h / 2}%, ${x + w / 2}% ${y + h / 2}%)`; },
              });
            }
          }
          return fragments;
        },
        revealTiming: (i: number, total: number) => {
          const gridSize = Math.sqrt(total);
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const centerX = (gridSize - 1) / 2;
          const centerY = (gridSize - 1) / 2;
          return Math.hypot(col - centerX, row - centerY) * 0.15;
        },
        collapseTiming: (i: number, total: number) => {
          const gridSize = Math.sqrt(total);
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          const centerX = (gridSize - 1) / 2;
          const centerY = (gridSize - 1) / 2;
          return Math.hypot(col - centerX, row - centerY) * 0.08;
        },
      },
    };

    const createImage = (speed = 0.5) => {
      const imageSrc = TRAIL_IMAGES[imageIndex];
      imageIndex = (imageIndex + 1) % TRAIL_IMAGES.length;

      const size = config.minImageSize + (config.maxImageSize - config.minImageSize) * speed;
      const patternKey = activeEffectRef.current;
      const pattern = PATTERNS[patternKey] || PATTERNS.flame;

      if (patternKey === 'flame') {
        const img = document.createElement('img');
        img.className = 'trail-img';
        const rotFactor = 1 + speed * (config.maxRotationFactor - 1);
        const rot = (Math.random() - 0.5) * config.baseRotation * rotFactor;

        img.src = imageSrc;
        img.width = img.height = size;
        const rect = container.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(0)`;
        img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;
        container.appendChild(img);

        setTimeout(() => {
          img.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(1)`;
        }, 10);

        trail.push({
          element: img,
          rotation: rot,
          removeTime: Date.now() + config.imageLifespan,
          isFlame: true,
        });
      } else {
        const imageContainer = createImageElement();
        const rect = container.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        imageContainer.style.cssText = `
          left: ${x}px;
          top: ${y}px;
          width: ${size}px;
          height: ${size}px;
          transform: translate3d(-50%, -50%, 0) scale(0);
          transition: transform ${config.inDuration}ms ${config.easing.scale};
        `;

        const fragments = pattern.create(imageContainer, imageSrc, size);

        fragments.forEach((fragment: any) => {
          imageContainer.appendChild(fragment.element);
        });

        container.appendChild(imageContainer);

        requestAnimationFrame(() => {
          imageContainer.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
          fragments.forEach((fragment: any) => {
            const revealTime = pattern.revealTiming
              ? pattern.revealTiming(fragment.index, fragments.length)
              : 0;
            const delay = revealTime * config.staggerRange;
            setTimeout(() => {
              fragment.reveal();
            }, delay);
          });
        });

        trail.push({
          element: imageContainer,
          fragments,
          pattern: patternKey,
          removeTime: Date.now() + config.imageLifespan,
        });
      }
    };

    const createTrailImage = () => {
      if (!isCursorInContainer) return;
      if ((isMoving || isTouching) && hasMovedEnough() && hasMovedAtAll()) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        const speed = calculateSpeed();
        createImage(speed);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
    };

    const removeOldImages = () => {
      const now = Date.now();
      if (now - lastRemovalTime < config.removalDelay || !trail.length) return;
      if (now >= trail[0].removeTime) {
        const imgObj = trail.shift();

        if (imgObj.isFlame) {
          imgObj.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
          imgObj.element.style.transform = `translate(-50%, -50%) rotate(${
            imgObj.rotation + 360
          }deg) scale(0)`;
          setTimeout(() => {
            if (imgObj.element.parentNode) imgObj.element.remove();
          }, config.outDuration);
        } else {
          const { element, fragments, pattern: imagePattern } = imgObj;
          const pattern = PATTERNS[imagePattern];

          if (fragments && pattern && pattern.collapseTiming) {
            fragments.forEach((fragment: any) => {
              const collapseTime = pattern.collapseTiming(fragment.index, fragments.length);
              const delay = collapseTime * config.staggerRange;
              setTimeout(() => {
                fragment.collapse();
              }, delay);
            });
          }

          element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
          element.style.transform = 'translate3d(-50%, -50%, 0) scale(0)';
          setTimeout(() => returnToPool(element), config.outDuration);
        }

        lastRemovalTime = now;
      }
    };

    const handleMouseMoveEvent = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isCursorInContainer = isInContainer(mouseX, mouseY);
      if (isCursorInContainer && hasMovedAtAll()) {
        isMoving = true;
        clearTimeout((window as any).heroMoveTimeout);
        (window as any).heroMoveTimeout = setTimeout(() => (isMoving = false), 100);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      isCursorInContainer = true;
      isTouching = true;
      lastMoveTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - prevMouseX);
      const dy = Math.abs(touch.clientY - prevMouseY);
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      isCursorInContainer = true;
      if (dy > dx) return;

      const now = Date.now();
      if (now - lastTouchImageTime >= config.touchImageInterval && hasMovedAtAll()) {
        lastTouchImageTime = now;
        const speed = calculateSpeed();
        createImage(speed);
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    document.addEventListener('mousemove', handleMouseMoveEvent);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    let animationFrameId: number;
    const animateLoop = () => {
      if (isMoving || isTouching) createTrailImage();
      removeOldImages();
      animationFrameId = requestAnimationFrame(animateLoop);
    };
    animateLoop();

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveEvent);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  const handleEffectChange = (effect: EffectPattern, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveEffect(effect);
  };

  if (!mounted) {
    return <section id="home-section" className="w-full h-screen bg-[#080808]" />;
  }

  return (
    <section
      id="home-section"
      ref={heroRef}
      className="hero-clean-trail-section relative w-full h-screen bg-[#080808] text-white overflow-hidden select-none flex flex-col items-center justify-center"
    >
      <style>{`
        .hero-clean-trail-section {
          --color-text: #ffffff;
          --color-accent: #FF8A00;
        }

        /* Ambient Noise Overlay */
        .hero-clean-trail-section::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("https://assets.codepen.io/7558/noise-002.png");
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 4;
          mix-blend-mode: screen;
        }

        /* Sub-bar Effect Selector (Positioned cleanly below Navbar) */
        .hero-effect-subbar {
          position: absolute;
          top: 95px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
        }

        .hero-effect-subbar a {
          position: relative;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .hero-effect-subbar a.active,
        .hero-effect-subbar a:hover {
          color: #000000;
          background-color: #FF8A00;
          font-weight: 700;
        }

        /* Center Content Box */
        .hero-center-box {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
          max-width: 1200px;
          pointer-events: none;
        }

        .hero-title-name {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: clamp(38px, 7.5vw, 95px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.0;
          color: #ffffff;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.8));
          white-space: nowrap;
        }

        .hero-title-name span {
          color: #FF8A00;
        }

        .hero-subtitle-text {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: clamp(14px, 2vw, 22px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.02em;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Cursor Trail Elements */
        .trail-img {
          position: absolute;
          object-fit: cover;
          transform-origin: center;
          pointer-events: none;
          will-change: transform;
          z-index: 12;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .trail-image {
          position: absolute;
          overflow: hidden;
          will-change: transform;
          transform-origin: center;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          z-index: 12;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .image-fragment {
          position: absolute;
          overflow: hidden;
          will-change: transform, clip-path;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        .fragment-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Bottom Indicators */
        .hero-cursor-hint {
          position: absolute;
          bottom: 28px;
          left: 0;
          right: 0;
          text-align: center;
          color: rgba(255, 255, 255, 0.55);
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          z-index: 25;
          pointer-events: none;
        }

        .hero-speed-indicator {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          color: #FF8A00;
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          z-index: 25;
          pointer-events: none;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .hero-effect-subbar {
            top: 80px;
            max-width: 92vw;
            overflow-x: auto;
            white-space: nowrap;
          }
          .hero-title-name {
            white-space: normal;
            font-size: clamp(32px, 10vw, 54px);
          }
        }
      `}</style>

      {/* Trail Effect Selector Sub-bar (Positioned cleanly below Navbar) */}
      <div className="hero-effect-subbar">
        {(['flame', 'venetian', 'curtain', 'hexagon', 'liquid', 'zoomsplit'] as EffectPattern[]).map((pattern) => (
          <a
            key={pattern}
            href="#"
            onClick={(e) => handleEffectChange(pattern, e)}
            className={activeEffect === pattern ? 'active' : ''}
          >
            {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
          </a>
        ))}
      </div>

      {/* Main Center Content Box: DASUN METHMAL. */}
      <div className="hero-center-box">
        <h1 ref={titleRef} className="hero-title-name">
          DASUN METHMAL<span>.</span>
        </h1>
        <h2 ref={subtitleRef} className="hero-subtitle-text">
          A Fullstack Developer &amp; Digital Marketer
        </h2>
      </div>

      {/* Bottom Hint & Intensity Indicators */}
      <div className="hero-cursor-hint">
        Move cursor to reveal dynamic image trails | Select effect tabs above
      </div>

      <div ref={speedIndicatorRef} className="hero-speed-indicator">
        {intensityText}
      </div>
    </section>
  );
}
