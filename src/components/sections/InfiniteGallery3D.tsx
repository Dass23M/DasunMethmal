"use client";

import * as React from "react";
import Link from "next/link";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export type CorridorPath = {
  perspective?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  birthHeight?: number;
  exitHeight?: number;
  railBirth?: number;
  railExit?: number;
  fan?: number;
  turnBirth?: number;
  turnExit?: number;
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.8,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
};

export type ImageStreamHeroProps = {
  images: StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "absolute overflow-hidden shadow-2xl border border-white/10")}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

const DEFAULT_STREAM_IMAGES: StreamImage[] = [
  { src: "/images/post-1.png", alt: "Work 1" },
  { src: "/images/post-2.png", alt: "Work 2" },
  { src: "/images/post-3.png", alt: "Work 3" },
  { src: "/images/post-4.png", alt: "Work 4" },
  { src: "/images/developer-1.png", alt: "Work 5" },
  { src: "/images/developer-3.png", alt: "Work 6" },
  { src: "/images/developer-7.png", alt: "Work 7" },
  { src: "/images/cover_bg_2.png", alt: "Work 8" },
  { src: "/images/methmal1.png", alt: "Work 9" },
  { src: "/images/poster-1.png", alt: "Work 10" },
  { src: "/images/poster-2.png", alt: "Work 11" },
  { src: "/images/digitalmarketing.png", alt: "Work 12" },
];

export default function InfiniteGallery3D() {
  return (
    <section
      id="3d-stream-section"
      className="w-full bg-[#080808] text-white py-16 sm:py-24 relative overflow-hidden border-y border-white/10 select-none min-h-[600px] sm:min-h-[750px]"
    >
      <ImageStreamHero
        images={DEFAULT_STREAM_IMAGES}
        cards={10}
        speed={16}
        axis={52}
        className="w-full min-h-[600px] sm:min-h-[750px] flex flex-col justify-between"
      >
        {/* Header Badge & Title Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#FF8A00] tracking-widest uppercase mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
            <span>003 // 3D CORRIDOR SHOWCASE</span>
          </div>

          <h2 className="font-sora font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-none drop-shadow-2xl">
            INFINITE CREATIVE <span className="text-[#FF8A00]">STREAM.</span>
          </h2>

          <p className="font-inter text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto mt-4 leading-relaxed font-light">
            An immersive 3D perspective corridor streaming software architecture, visual designs, and growth campaigns continuously toward the viewer.
          </p>
        </div>

        {/* Bottom CTA Action Button */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pb-10 mt-auto pt-16">
          <Link
            href="#portfolio-section"
            className="inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-black font-sora font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-[#FF8A00]/20 uppercase tracking-wider"
          >
            Explore All Works ↗
          </Link>
        </div>
      </ImageStreamHero>
    </section>
  );
}
