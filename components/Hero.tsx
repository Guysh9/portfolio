"use client";

import { motion } from "framer-motion";

const FULL_TEXT = "Hello, I'm Guy.";
const TOTAL_DURATION = 1800;

function easedDelay(i: number, len: number): number {
  const t = i / len;
  const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  return eased * (TOTAL_DURATION / 1000);
}

export default function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "32px 40px 24px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <motion.h1
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        whileHover={{
          color: "transparent",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: "0.8px #e05a76",
          textShadow: "0 0 40px rgba(224, 90, 118, 0.35)",
          transition: { duration: 0.4, ease: "easeOut" },
        } as any}
        style={{
          cursor: "default",
          display: "inline-block",
          paintOrder: "stroke fill",
          fontFamily: "var(--font-display), sans-serif",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(32px, 8vw, 110px)",
          lineHeight: 1,
          textTransform: "uppercase",
          marginBottom: "16px",
          letterSpacing: "-0.03em",
          color: "#e05a76",
          whiteSpace: "nowrap",
          textShadow:
            "0 0 30px rgba(224, 90, 118, 0.25), 0 0 60px rgba(224, 90, 118, 0.1)",
        }}
      >
        {FULL_TEXT.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -16, filter: "blur(24px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: easedDelay(i, FULL_TEXT.length),
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 1.2,
          delay: 1.8,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="hero-sub"
        style={{
          margin: "4px auto 0",
          whiteSpace: "nowrap",
          fontSize: "16px",
          textTransform: "none",
          lineHeight: 1.6,
          letterSpacing: 0,
          color: "#e05a76",
        }}
      >
        <p>
          I bring ideas to life through dynamic movement and bold, unapologetic
          aesthetics.
        </p>
      </motion.div>
    </section>
  );
}
