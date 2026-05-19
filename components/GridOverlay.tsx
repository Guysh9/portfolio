"use client";

export default function GridOverlay() {
  return (
    <>
      {/* SVG filter: fractal noise displaces the grid lines */}
      <svg
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="grid-warp" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.011 0.013"
              numOctaves="4"
              seed="3"
              result="noise"
            >
              {/* Slowly drift the frequency so the warp crawls over time */}
              <animate
                attributeName="baseFrequency"
                values="0.010 0.012;0.016 0.009;0.012 0.016;0.009 0.013;0.010 0.012"
                dur="18s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Grid */}
      <div
        style={{
          position: "fixed",
          inset: "-10%",          /* bleed past edges so warp never shows gaps */
          backgroundImage: [
            "linear-gradient(rgba(224, 90, 118, 0.13) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(224, 90, 118, 0.13) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "64px 64px",
          filter: "url(#grid-warp)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}
