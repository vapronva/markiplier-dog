"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export const FloatingDebris = () => {
  const [debris, setDebris] = useState<
    {
      id: number;
      xPoints: number[];
      yPoints: number[];
      rotatePoints: number[];
      size: number;
      duration: number;
    }[]
  >([]);
  useEffect(() => {
    const newDebris = Array.from({ length: 100 }).map((_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const startRotate = Math.random() * 360;
      return {
        id: i,
        xPoints: [
          startX,
          (startX + Math.random() * 20 - 10 + 100) % 100,
          (startX - Math.random() * 20 + 10 + 100) % 100,
          startX,
        ],
        yPoints: [
          startY,
          (startY + Math.random() * 20 - 10 + 100) % 100,
          (startY - Math.random() * 20 + 10 + 100) % 100,
          startY,
        ],
        rotatePoints: [startRotate, startRotate + 360],
        size: 20 + Math.random() * 100,
        duration: 5 + Math.random() * 15,
      };
    });
    setDebris(newDebris);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {debris.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            x: `${item.xPoints[0]}vw`,
            y: `${item.yPoints[0]}vh`,
            rotate: item.rotatePoints[0],
          }}
          animate={{
            x: item.xPoints.map((v) => `${v}vw`),
            y: item.yPoints.map((v) => `${v}vh`),
            rotate: item.rotatePoints,
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.engineering/markiplier-dog/image/dog/png/barkiplier.png"
            className="h-full w-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
};

export const GlitchText = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) => {
  return (
    <motion.h1
      className="relative z-50 cursor-pointer text-6xl font-black tracking-tighter text-white uppercase mix-blend-difference md:text-9xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      animate={{
        textShadow: [
          "2px 0 #ff0000, -2px 0 #00ff00",
          "-2px 0 #ff0000, 2px 0 #00ff00",
          "2px 0 #0000ff, -2px 0 #ffff00",
        ],
        skewX: [0, 5, -5, 0],
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      {text}
    </motion.h1>
  );
};

export const FleeingElement = () => {
  const [dogs, setDogs] = useState<
    { id: number; x: number; y: number; wanderPhase: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const dogRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>(0);
  useEffect(() => {
    setDogs(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        wanderPhase: Math.random() * Math.PI * 2,
      })),
    );
  }, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    const animate = () => {
      if (!containerRef.current) return;
      const time = Date.now() / 1000;
      dogRefs.current.forEach((dogEl: HTMLDivElement | null, index: number) => {
        if (!dogEl) return;
        const dog = dogs[index];
        if (!dog) return;
        const rect = dogEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mousePos.current.x - centerX;
        const dy = mousePos.current.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let moveX = 0;
        let moveY = 0;
        let rotate = 0;
        const wanderRadius = 100;
        moveX += Math.sin(time + dog.wanderPhase) * wanderRadius;
        moveY += Math.cos(time * 0.7 + dog.wanderPhase) * wanderRadius;
        rotate += Math.sin(time * 2 + dog.wanderPhase) * 10;
        if (dist < 300) {
          const angle = Math.atan2(dy, dx);
          const force = (300 - dist) / 300;
          const fleeDistance = 400 * force;
          moveX -= Math.cos(angle) * fleeDistance;
          moveY -= Math.sin(angle) * fleeDistance;
          rotate += Math.random() * 360 * force;
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
  }, [dogs]);
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
          className="absolute transition-transform duration-[50ms] ease-linear will-change-transform"
          style={{
            left: `${dog.x}%`,
            top: `${dog.y}%`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.engineering/markiplier-dog/image/dog/png/barkiplier.png"
            className="h-24 w-24 object-contain drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
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
