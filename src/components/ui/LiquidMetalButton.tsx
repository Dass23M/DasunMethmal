"use client";

import { useEffect, useRef, useState, useId } from "react";
import * as THREE from "three";
import Link from "next/link";

interface LiquidMetalButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function LiquidMetalButton({
  label = "EXPLORE MARKETING & POSTER DESIGNS",
  href,
  onClick,
  className = "",
}: LiquidMetalButtonProps) {
  const containerId = useId();
  const canvasRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<{ time: { value: number }; speed: { value: number } }>({
    time: { value: 1.0 },
    speed: { value: 0.6 },
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current;
    container.innerHTML = "";

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Custom Liquid Metal Shader with Portfolio Orange (#FF6B00) & Chrome Metallic Highlights
    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main() {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        float t = time * 0.4;
        
        // Metallic Liquid Waves
        for(int n = 1; n < 4; n++) {
          float i = float(n);
          p += vec2(
            0.7 / i * sin(i * p.y + t + i * 1.5) + 0.1,
            0.4 / i * sin(i * p.x + t + i * 2.0)
          );
        }

        // Calculate specular metallic sheen
        float col = 0.5 + 0.5 * sin(p.x + p.y + t);
        
        // Brand color mapping: Liquid Gold/Orange (#FF6B00) & Silver Chrome
        vec3 darkMetal = vec3(0.08, 0.08, 0.1);
        vec3 orangeGlow = vec3(1.0, 0.42, 0.0); // #FF6B00
        vec3 metallicSpec = vec3(1.0, 0.85, 0.6);

        vec3 color = mix(darkMetal, orangeGlow, pow(col, 2.5));
        color += metallicSpec * pow(col, 6.0) * 0.7;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      time: uniformsRef.current.time,
      resolution: { value: new THREE.Vector2(200, 50) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const onResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth || 280;
      const height = canvasRef.current.clientHeight || 48;
      renderer.setSize(width, height);
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      );
    };

    onResize();
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      uniformsRef.current.time.value += 0.03 * uniformsRef.current.speed.value;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
      if (container) container.innerHTML = "";
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    uniformsRef.current.speed.value = 2.0;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    uniformsRef.current.speed.value = 0.6;
  };

  const handleClick = (e: React.MouseEvent) => {
    uniformsRef.current.speed.value = 4.0;
    setTimeout(() => {
      uniformsRef.current.speed.value = isHovered ? 2.0 : 0.6;
    }, 400);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.();
  };

  const content = (
    <div className="relative inline-block select-none group">
      {/* 3D Perspective Wrapper */}
      <div style={{ perspective: "1000px" }}>
        <div
          className="relative transition-all duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isPressed ? "scale(0.97) translateY(1px)" : isHovered ? "scale(1.04)" : "scale(1)",
          }}
        >
          {/* Outer Liquid Shader Ring & Shadow */}
          <div
            className="rounded-full overflow-hidden p-[2px] transition-all duration-300"
            style={{
              boxShadow: isHovered
                ? "0 0 25px rgba(255, 107, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.6)"
                : "0 0 15px rgba(255, 107, 0, 0.2), 0 5px 12px rgba(0, 0, 0, 0.4)",
              background: "linear-gradient(135deg, #FF6B00 0%, #331400 100%)",
            }}
          >
            {/* Inner Container with Shader */}
            <div className="relative rounded-full overflow-hidden bg-black px-6 py-3 sm:px-8 sm:py-3.5 flex items-center justify-center gap-3 border border-white/20">
              {/* WebGL Shader Layer */}
              <div
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
              />

              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-none" />

              {/* Text & Icon Layer */}
              <span className="relative z-20 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-2">
                <span>{label}</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45 text-[#FF6B00]">
                  ⤵
                </span>
              </span>

              {/* Click Ripple Effects */}
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="absolute rounded-full bg-[#FF6B00]/50 pointer-events-none animate-ping"
                  style={{
                    left: r.x - 10,
                    top: r.y - 10,
                    width: 20,
                    height: 20,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as any}
        onClick={handleClick as any}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className={`inline-block outline-none cursor-pointer ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      onClick={handleClick as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`inline-block bg-transparent border-none outline-none cursor-pointer p-0 ${className}`}
    >
      {content}
    </button>
  );
}

export default LiquidMetalButton;
