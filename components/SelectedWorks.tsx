"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

function WorkCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  // Trigger when the card enters — larger margin so animation starts earlier
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{
          delay: index * 0.08,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          // No overflow:hidden here — that was clipping the border-radius on lift
          cursor: "pointer",
        }}
      >
        {/* Category badge — sits above the thumbnail, unaffected by its transform */}
        <span
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#e05a76",
            background: "rgba(13, 13, 13, 0.8)",
            padding: "6px 12px",
            borderRadius: "20px",
            zIndex: 10,
            border: "1px solid rgba(224, 90, 118, 0.3)",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            // Badge moves with the card lift
            transform: hovered ? "translateY(-12px)" : "translateY(0)",
            transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {project.category}
        </span>

        {/* Thumbnail — this lifts on hover; border-radius is self-contained */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/10",
            background: "#111",
            overflow: "hidden",
            position: "relative",
            border: "1px solid rgba(224, 90, 118, 0.2)",
            borderRadius: "8px",
            transform: hovered ? "translateY(-12px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 24px 48px rgba(224, 90, 118, 0.15), 0 8px 16px rgba(0,0,0,0.4)"
              : "none",
            transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.45s ease",
          }}
        >
          {/* Pink overlay on hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(224, 90, 118, 0.12)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.4s ease",
              zIndex: 5,
            }}
          />

          {/* Title overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "32px",
              fontWeight: 800,
              color: "#ffffff",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.4s ease",
              zIndex: 6,
              letterSpacing: "-0.02em",
              textTransform: "none",
            }}
          >
            {project.title}
          </div>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </div>
      </motion.div>
    </Link>
  );
}

export default function SelectedWorks() {
  return (
    <section id="work">
      {/* Section title */}
      <div
        className="works-header"
        style={{
          padding: "40px 40px 0",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "22px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#e05a76",
            opacity: 0.7,
          }}
        >
          Latest Works
        </h2>
      </div>

      {/* 2-column grid — paddingTop gives room for the card lift */}
      <div
        className="works-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          padding: "16px 40px 40px",
        }}
      >
        {projects.map((p, i) => (
          <WorkCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
