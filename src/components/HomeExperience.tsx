"use client";

import { useState, useRef, useEffect } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";

import {
  FloatingDebris,
  GlitchText,
  VisualNoiseOverlay,
  FleeingElement,
} from "~/components/ChaosEffects";
import { ASSETS } from "~/lib/assets";

export function HomeExperience() {
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [pointerActive, setPointerActive] = useState(false);
  const [lowQuality, setLowQuality] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef(0);
  const appliedLqRef = useRef(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  useEffect(() => {
    if (entered || reduce) return;
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setPointerActive(true);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [entered, reduce, cursorX, cursorY]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !entered || appliedLqRef.current === lowQuality) return;
    appliedLqRef.current = lowQuality;
    const resume = lastTimeRef.current;
    video.style.transition = "none";
    video.style.opacity = "0";
    video.src = lowQuality ? ASSETS.videoLq : ASSETS.videoHq;
    const onMeta = () => {
      if (resume > 0) video.currentTime = resume;
    };
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      video.style.transition = "opacity 200ms ease-out";
      video.style.opacity = "1";
      video.play().catch(() => undefined);
    };
    const onError = () => {
      video.style.transition = "opacity 200ms ease-out";
      video.style.opacity = "1";
      appliedLqRef.current = !lowQuality;
    };
    video.addEventListener("loadedmetadata", onMeta, { once: true });
    video.addEventListener("seeked", reveal, { once: true });
    video.addEventListener("canplay", reveal, { once: true });
    video.addEventListener("error", onError, { once: true });
    return () => {
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("seeked", reveal);
      video.removeEventListener("canplay", reveal);
      video.removeEventListener("error", onError);
    };
  }, [lowQuality, entered]);
  useEffect(() => {
    if (!entered) return;
    videoRef.current
      ?.play()
      .catch((e) => console.error("Video play error:", e));
  }, [entered]);
  const enter = () => setEntered(true);
  const showCursor = !entered && pointerActive && !reduce;
  return (
    <LazyMotion features={domAnimation} strict>
      <main
        className={`bg-ink relative h-screen w-screen overflow-hidden ${
          entered
            ? "cursor-crosshair"
            : pointerActive && !reduce
              ? "cursor-none"
              : "cursor-default"
        }`}
      >
        <VisualNoiseOverlay />
        {showCursor && (
          <m.div
            className="pointer-events-none fixed z-100 size-32 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{ left: cursorX, top: cursorY }}
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 0.9, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Image
              src={ASSETS.dogIcon}
              alt=""
              width={128}
              height={128}
              priority
              unoptimized
              className="h-full w-full object-contain"
            />
          </m.div>
        )}
        <AnimatePresence>
          {!entered && (
            <m.div
              key="splash"
              role="button"
              tabIndex={0}
              aria-label="Enter markiplier.dog"
              onClick={enter}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  enter();
                }
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.5, filter: "blur(8px)" }
              }
              transition={{ duration: reduce ? 0.2 : 0.8 }}
              className="bg-ink absolute inset-0 z-50 flex flex-col items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset"
            >
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-5 contrast-150 grayscale"
                style={{ backgroundImage: `url("${ASSETS.dogPoster}")` }}
              />
              <div className="z-10 flex flex-col items-center gap-8 mix-blend-difference">
                <GlitchText text="MARKIPLIER.DOG" />
              </div>
            </m.div>
          )}
        </AnimatePresence>
        {entered && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.2 : 1, delay: reduce ? 0 : 0.5 }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <m.div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-10 brightness-[0.15] contrast-[2.0] grayscale"
              style={{ backgroundImage: `url("${ASSETS.dogPoster}")` }}
              animate={
                reduce
                  ? undefined
                  : {
                      filter: [
                        "blur(0px) hue-rotate(0deg)",
                        "blur(4px) hue-rotate(90deg)",
                        "blur(0px) hue-rotate(0deg)",
                        "blur(2px) hue-rotate(-45deg)",
                        "blur(0px) hue-rotate(0deg)",
                      ],
                      transform: [
                        "scale(1) translateX(0)",
                        "scale(1.1) translateX(10px)",
                        "scale(1) translateX(0)",
                      ],
                    }
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }
              }
            />
            <FloatingDebris />
            <FleeingElement />
            <m.div
              className="relative z-20 aspect-1080/1290 h-auto w-full max-w-full border-4 border-transparent shadow-[0_0_100px_rgba(255,0,0,0.5)] md:h-[90vh] md:w-auto"
              animate={
                reduce
                  ? { borderColor: "#ff0000" }
                  : {
                      borderColor: ["#ff0000", "#00ff00", "#0000ff", "#ff0000"],
                      boxShadow: [
                        "0 0 50px rgba(255,0,0,0.5)",
                        "0 0 100px rgba(0,255,0,0.5)",
                        "0 0 50px rgba(0,0,255,0.5)",
                      ],
                    }
              }
              transition={
                reduce ? undefined : { duration: 2, repeat: Infinity }
              }
            >
              <video
                ref={videoRef}
                src={ASSETS.videoHq}
                aria-label="markiplier.dog video"
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (!v.seeking && v.currentTime > 0)
                    lastTimeRef.current = v.currentTime;
                }}
                className={`h-full w-full object-cover ${
                  lowQuality ? "[image-rendering:pixelated]" : ""
                }`}
                width={1080}
                height={1290}
                loop
                playsInline
                controls={false}
              >
                {}
                <track kind="captions" />
              </video>
            </m.div>
            <div className="pointer-events-auto absolute bottom-4 left-4 z-50 flex flex-col gap-1 font-mono text-xs text-white/30">
              <span>
                Video:{" "}
                <a
                  href="https://bsky.app/profile/thispilot.ru"
                  target="_blank"
                  rel="noopener"
                  className="transition-colors hover:text-white hover:underline"
                >
                  @thispilot.ru on Bluesky
                </a>
              </span>
              <span>
                Dog:{" "}
                <a
                  href="https://www.instagram.com/p/DChUskEyZff/"
                  target="_blank"
                  rel="noopener"
                  className="transition-colors hover:text-white hover:underline"
                >
                  Cream on Instagram
                </a>
              </span>
              <button
                type="button"
                onClick={() => setLowQuality((v) => !v)}
                className="mt-2 text-left font-semibold text-white/50 uppercase transition-colors hover:text-red-500"
              >
                [ {lowQuality ? "DISABLE" : "ENABLE"} LOW QUALITY ]
              </button>
            </div>
          </m.div>
        )}
      </main>
    </LazyMotion>
  );
}
