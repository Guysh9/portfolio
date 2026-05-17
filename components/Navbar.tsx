"use client";

export default function Navbar() {
  return (
    <nav
      className="nav-root"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: "80px",
        padding: "0 40px",
      }}
    >
      {/* Left — empty */}
      <div />

      {/* Center — Logo */}
      <a href="/" style={{ textDecoration: "none", display: "flex", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Guy Shemesh"
          className="nav-logo"
          style={{ height: "96px", width: "auto", transition: "filter 0.3s ease" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "invert(48%) sepia(79%) saturate(471%) hue-rotate(304deg) brightness(96%) contrast(93%)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "none";
          }}
        />
      </a>

      {/* Right — Let's Talk */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <a
          href="mailto:Guyshemesh9@gmail.com"
          className="nav-btn"
          style={{
            padding: "12px 28px",
            borderRadius: "20px",
            border: "1px solid #e05a76",
            textDecoration: "none",
            color: "#e05a76",
            fontSize: "13px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#e05a76";
            el.style.color = "#0d0d0d";
            el.style.boxShadow = "0 0 15px #e05a76";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "#e05a76";
            el.style.boxShadow = "none";
          }}
        >
          LET&apos;S TALK
        </a>
      </div>
    </nav>
  );
}
