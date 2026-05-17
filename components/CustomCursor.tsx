"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, label")) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "32px" : "22px",
          height: hovering ? "32px" : "22px",
          borderRadius: "50%",
          background: clicking ? "#ffffff" : hovering ? "transparent" : "#e05a76",
          border: hovering && !clicking ? "2.5px solid #e05a76" : "none",
          boxShadow: clicking ? "0 0 10px rgba(255,255,255,0.4)" : "0 0 8px rgba(224, 90, 118, 0.5)",
          pointerEvents: "none",
          zIndex: 99999,
          translate: "-50% -50%",
          transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease",
        }}
      />
    </>
  );
}
