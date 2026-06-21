"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import { ASSETS } from "~/lib/assets";

export const FloatingDebris = () => {
  const reduce = useReducedMotion();
  const [debris] = useState(() =>
    Array.from({ length: 40 }, (_, id) => ({
      id,
      x: Math.random() * 100,
      y: Math.random() * 100,
      drift: Math.random() * 20 - 10,
      rotate: Math.random() * 360,
      size: 20 + Math.random() * 100,
      duration: 5 + Math.random() * 15,
    })),
  );
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {debris.map((item) => (
        <m.div
          key={item.id}
          initial={{ x: `${item.x}vw`, y: `${item.y}vh`, rotate: item.rotate }}
          animate={{
            x: [`${item.x}vw`, `${item.x + item.drift}vw`, `${item.x}vw`],
            y: [`${item.y}vh`, `${item.y - item.drift}vh`, `${item.y}vh`],
            rotate: [item.rotate, item.rotate + 360],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: item.size, height: item.size }}
          className="absolute opacity-60"
        >
          <Image
            src={ASSETS.dogIcon}
            alt=""
            width={120}
            height={120}
            unoptimized
            className="h-full w-full object-contain"
          />
        </m.div>
      ))}
    </div>
  );
};

export const GlitchText = ({ text }: { text: string }) => {
  const reduce = useReducedMotion();
  return (
    <m.h1
      className="relative z-50 text-6xl font-semibold tracking-tighter text-white uppercase mix-blend-difference md:text-9xl"
      whileHover={reduce ? undefined : { scale: 1.1 }}
      animate={
        reduce
          ? undefined
          : {
              textShadow: [
                "2px 0 #ff0000, -2px 0 #00ff00",
                "-2px 0 #ff0000, 2px 0 #00ff00",
                "2px 0 #0000ff, -2px 0 #ffff00",
              ],
              skewX: [0, 5, -5, 0],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: 0.2,
              repeat: Infinity,
              repeatType: "mirror",
            }
      }
    >
      {text}
    </m.h1>
  );
};

export const FleeingElement = () => {
  const reduce = useReducedMotion();
  const [dogs] = useState<
    { id: number; x: number; y: number; wanderPhase: number }[]
  >(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      wanderPhase: Math.random() * Math.PI * 2,
    })),
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const dogRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>(0);
  useEffect(() => {
    if (reduce) return;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const time = Date.now() / 1000;
      const crect = container.getBoundingClientRect();
      dogRefs.current.forEach((dogEl, index) => {
        if (!dogEl) return;
        const dog = dogs[index];
        if (!dog) return;
        const baseX = crect.left + (dog.x / 100) * crect.width + 48;
        const baseY = crect.top + (dog.y / 100) * crect.height + 48;
        const dx = mousePos.current.x - baseX;
        const dy = mousePos.current.y - baseY;
        const dist = Math.hypot(dx, dy);
        const wanderRadius = 100;
        let moveX = Math.sin(time + dog.wanderPhase) * wanderRadius;
        let moveY = Math.cos(time * 0.7 + dog.wanderPhase) * wanderRadius;
        let rotate = Math.sin(time * 2 + dog.wanderPhase) * 10;
        if (dist < 300) {
          const angle = Math.atan2(dy, dx);
          const force = (300 - dist) / 300;
          const fleeDistance = 400 * force;
          moveX -= Math.cos(angle) * fleeDistance;
          moveY -= Math.sin(angle) * fleeDistance;
          rotate += Math.sin(time * 8 + dog.wanderPhase) * 40 * force;
        }
        dogEl.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dogs, reduce]);
  if (reduce) return null;
  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-30"
    >
      {dogs.map((dog, i) => (
        <div
          key={dog.id}
          ref={(el) => {
            dogRefs.current[i] = el;
          }}
          className="absolute will-change-transform"
          style={{
            left: `${dog.x}%`,
            top: `${dog.y}%`,
          }}
        >
          <Image
            src={ASSETS.dogIcon}
            alt=""
            width={96}
            height={96}
            unoptimized
            className="size-24 object-contain drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
          />
        </div>
      ))}
    </div>
  );
};

export const VisualNoiseOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.15] mix-blend-overlay">
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
