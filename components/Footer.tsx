"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <footer
      ref={ref}
      id="contact"
      className="footer-root"
      style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gridTemplateRows: "1fr auto",
        padding: "120px 40px",
        background: "linear-gradient(to bottom, transparent, rgba(224, 90, 118, 0.05))",
      }}
    >
      {/* Top-left: Headline */}
      <motion.div {...anim(0)} style={{ gridColumn: 1, gridRow: 1 }}>
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 1.1,
            whiteSpace: "normal",
            color: "#e05a76",
            letterSpacing: "0.04em",
          }}
        >
          Let&apos;s create<br />something together
        </h2>
      </motion.div>

      {/* Top-right: empty */}
      <div style={{ gridColumn: 2, gridRow: 1 }} />

      {/* Bottom-left: Availability + Email */}
      <motion.div {...anim(0)} style={{ gridColumn: 1, gridRow: 2, paddingTop: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
            fontSize: "16px",
            color: "#e05a76",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              background: "#e05a76",
              display: "inline-block",
              borderRadius: "50%",
              boxShadow: "0 0 10px #e05a76",
              animation: "blink 1.5s infinite steps(2)",
            }}
          />
          Open to new projects
        </div>

        <a
          href="mailto:Guyshemesh9@gmail.com"
          style={{
            fontSize: "22px",
            color: "#e05a76",
            textDecoration: "none",
            borderBottom: "2px solid #e05a76",
            paddingBottom: "2px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontWeight: 700,
            textTransform: "none",
            letterSpacing: 0,
            marginLeft: "18px",
            transition: "color 0.3s, border-color 0.3s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#ffffff";
            el.style.borderBottomColor = "#ffffff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#e05a76";
            el.style.borderBottomColor = "#e05a76";
          }}
        >
          Guyshemesh9@gmail.com
        </a>
      </motion.div>

      {/* Bottom-right: Socials */}
      <motion.div
        {...anim(0.1)}
        className="footer-right"
        style={{
          gridColumn: 2,
          gridRow: 2,
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "flex-end",
        }}
      >
        {[
          {
            label: "Instagram",
            href: "https://www.instagram.com/guysh9/",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            ),
          },
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/guyshemesh/",
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="3" />
                <line x1="8" y1="11" x2="8" y2="16" />
                <line x1="8" y1="8" x2="8" y2="8.5" strokeWidth="2" />
                <line x1="12" y1="16" x2="12" y2="13" />
                <path d="M12 13a3 3 0 0 1 6 0v3" />
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#e05a76",
              opacity: 0.7,
              fontSize: "18px",
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              transition: "opacity 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "1";
              el.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.opacity = "0.7";
              el.style.color = "#e05a76";
            }}
          >
            {icon}
            {label}
          </a>
        ))}

        <div
          className="footer-copy"
          style={{
            marginTop: "16px",
            fontSize: "11px",
            opacity: 0.5,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            textAlign: "right",
          }}
        >
          © 2026 GUY SHEMESH. ALL RIGHTS RESERVED.
        </div>
      </motion.div>
    </footer>
  );
}
