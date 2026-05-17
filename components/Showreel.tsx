"use client";

export default function Showreel() {
  return (
    <div
      className="showreel-wrap"
      style={{
        position: "relative",
        aspectRatio: "16/9",
        background: "#000",
        border: "1px solid rgba(224, 90, 118, 0.5)",
        overflow: "hidden",
        margin: "0 auto 40px",
        borderRadius: "12px",
        width: "min(calc(100% - 80px), 900px)",
      }}
    >
      <iframe
        src="https://player.vimeo.com/video/1192894984?autoplay=1&muted=1&loop=1&autopause=0&controls=1"
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
      />
    </div>
  );
}
