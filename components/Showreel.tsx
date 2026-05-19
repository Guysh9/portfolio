"use client";

export default function Showreel() {
  return (
    <div
      style={{
        position: "relative",
        width: "min(calc(100% - 80px), 900px)",
        margin: "0 auto 60px",
      }}
    >
      {/* Tight glow layer — softened */}
      <div
        style={{
          position: "absolute",
          inset: "-24px -32px",
          borderRadius: "32px",
          filter: "blur(60px)",
          opacity: 0.5,
          animation: "videoGlow 22s ease-in-out infinite",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Wide soft halo */}
      <div
        style={{
          position: "absolute",
          inset: "-48px -64px",
          borderRadius: "56px",
          background: "rgba(160, 30, 80, 0.07)",
          filter: "blur(100px)",
          opacity: 0.6,
          animation: "videoGlow 30s ease-in-out infinite reverse",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Video frame */}
      <div
        id="reel"
        className="showreel-wrap"
        style={{
          position: "relative",
          aspectRatio: "16/9",
          background: "#000",
          border: "1px solid rgba(224, 90, 118, 0.5)",
          overflow: "hidden",
          borderRadius: "12px",
          zIndex: 1,
        }}
      >
        <iframe
          src="https://player.vimeo.com/video/1192894984?autoplay=1&muted=1&loop=1&autopause=0&title=0&byline=0&portrait=0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          allowFullScreen
          title="Guy Shemesh showreel"
        />
      </div>
    </div>
  );
}
