"use client";

import { useEffect, useRef } from "react";

interface Blob {
  baseX: number; baseY: number;
  r: number;
  color: [number, number, number];
  speedX: number; speedY: number;
  ampX: number; ampY: number;
  phaseX: number; phaseY: number;
}

// Each blob drifts independently on a slow sine/cosine path
const BLOBS: Blob[] = [
  { baseX: 0.10, baseY: 0.08, r: 380, color: [224, 90, 118],  speedX: 0.26, speedY: 0.19, ampX: 0.07, ampY: 0.05, phaseX: 0.0, phaseY: 1.2 },
  { baseX: 0.88, baseY: 0.12, r: 320, color: [175, 38, 125],  speedX: 0.21, speedY: 0.28, ampX: 0.05, ampY: 0.07, phaseX: 2.1, phaseY: 0.5 },
  { baseX: 0.50, baseY: 0.48, r: 460, color: [88,  10,  44],  speedX: 0.14, speedY: 0.17, ampX: 0.04, ampY: 0.04, phaseX: 1.0, phaseY: 3.0 },
  { baseX: 0.80, baseY: 0.90, r: 340, color: [212, 55,  95],  speedX: 0.23, speedY: 0.19, ampX: 0.06, ampY: 0.05, phaseX: 3.5, phaseY: 1.8 },
  { baseX: 0.18, baseY: 0.78, r: 280, color: [145, 22,  88],  speedX: 0.19, speedY: 0.25, ampX: 0.05, ampY: 0.06, phaseX: 0.8, phaseY: 2.4 },
];

export default function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf: number;
    let running = true;

    const resize = () => {
      // Half resolution — blur hides it, saves fill-rate
      canvas.width  = Math.max(1, Math.floor(window.innerWidth  * 0.6));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * 0.6));
    };

    function draw(t: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;
      const scale = W / 1440;

      for (const b of BLOBS) {
        const x = (b.baseX + Math.sin(t * b.speedX + b.phaseX) * b.ampX) * W;
        const y = (b.baseY + Math.cos(t * b.speedY + b.phaseY) * b.ampY) * H;
        const r = b.r * Math.max(scale, 0.5);
        const [cr, cg, cb] = b.color;

        // Ring-glow gradient: dark center → soft luminous edge → fade to transparent
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0.00, `rgba(${cr},${cg},${cb},0.00)`);
        g.addColorStop(0.18, `rgba(${cr},${cg},${cb},0.00)`);
        g.addColorStop(0.38, `rgba(${cr},${cg},${cb},0.22)`); // peak glow ring
        g.addColorStop(0.55, `rgba(${cr},${cg},${cb},0.10)`);
        g.addColorStop(0.75, `rgba(${cr},${cg},${cb},0.03)`);
        g.addColorStop(1.00, `rgba(${cr},${cg},${cb},0.00)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const start = performance.now();
    function loop() {
      if (!running) return;
      const t = reduceMotion ? 0 : (performance.now() - start) / 1000;
      draw(t);
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      running = !document.hidden;
      if (running) loop();
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(90px)",
        opacity: 0.45,
      }}
    />
  );
}
