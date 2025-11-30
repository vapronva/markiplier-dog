"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FloatingDebris,
  GlitchText,
  VisualNoiseOverlay,
  FleeingElement,
} from "~/components/ChaosEffects";

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLowQuality, setIsLowQuality] = useState(false);
  useEffect(() => {
    if (entered) return;
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [entered]);
  useEffect(() => {
    if (!videoRef.current || !entered) return;
    const currentSrc = videoRef.current.src;
    const targetSrc = isLowQuality
      ? "https://cdn.engineering/markiplier-dog/video/h264/aac/80p/1123.mp4"
      : "https://cdn.engineering/markiplier-dog/video/h264/aac/1080p/1123.mp4";
    if (currentSrc !== targetSrc) {
      const time = videoRef.current.currentTime;
      const isPlaying = !videoRef.current.paused;
      videoRef.current.src = targetSrc;
      const restore = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
          if (isPlaying) {
            videoRef.current
              .play()
              .catch((error) =>
                console.warn(
                  "Video resume interrupted after quality swap:",
                  error,
                ),
              );
          }
        }
      };
      videoRef.current.addEventListener("loadedmetadata", restore, {
        once: true,
      });
    }
  }, [isLowQuality, entered]);
  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .catch((e) => console.error("Video play error:", e));
        videoRef.current.volume = 1.0;
      }
    }, 100);
  };
  return (
    <main
      className={`relative h-screen w-screen overflow-hidden bg-black ${entered ? "cursor-crosshair" : "cursor-none"}`}
    >
      <VisualNoiseOverlay />
      <AnimatePresence>
        {!entered && (
          <>
            <motion.div
              className="pointer-events-none fixed z-100 h-32 w-32 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
              }}
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.engineering/markiplier-dog/image/dog/png/barkiplier.png"
                className="h-full w-full object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 0.8 }}
              onClick={handleEnter}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            >
              <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-5 contrast-150 grayscale"
                style={{
                  backgroundImage:
                    'url("https://cdn.engineering/markiplier-dog/image/dog/jpeg/og/screenshot/dog.jpg")',
                }}
              />
              <div className="z-10 flex flex-col items-center gap-8 mix-blend-difference">
                <GlitchText text="MARKIPLIER.DOG" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <motion.div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-10 brightness-[0.15] contrast-[2.0] grayscale"
            style={{
              backgroundImage:
                'url("https://cdn.engineering/markiplier-dog/image/dog/jpeg/og/screenshot/dog.jpg")',
            }}
            animate={{
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
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
          <FloatingDebris />
          <FleeingElement />
          <motion.div
            className="relative z-20 aspect-1080/1290 h-auto w-full max-w-full border-4 border-transparent shadow-[0_0_100px_rgba(255,0,0,0.5)] md:h-[90vh] md:w-auto"
            animate={{
              borderColor: ["#ff0000", "#00ff00", "#0000ff", "#ff0000"],
              boxShadow: [
                "0 0 50px rgba(255,0,0,0.5)",
                "0 0 100px rgba(0,255,0,0.5)",
                "0 0 50px rgba(0,0,255,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <video
              ref={videoRef}
              src="https://cdn.engineering/markiplier-dog/video/h264/aac/1080p/1123.mp4"
              className="h-full w-full object-cover"
              width={1080}
              height={1290}
              style={{
                imageRendering: isLowQuality ? "pixelated" : "auto",
                width: "100%",
                height: "100%",
              }}
              loop
              playsInline
              controls={false}
            />
          </motion.div>
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
              onClick={() => setIsLowQuality(!isLowQuality)}
              className="mt-2 text-left font-bold text-white/50 uppercase transition-colors hover:text-red-500"
            >
              [ {isLowQuality ? "DISABLE" : "ENABLE"} LOW QUALITY ]
            </button>
          </div>
        </motion.div>
      )}
    </main>
  );
}
