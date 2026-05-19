"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "WORK", href: "/#work" },
  { label: "REEL", href: "/#reel" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  return (
    <nav
      className="nav-root"
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        height: "80px",
        padding: "0 40px",
        gap: "24px",
        position: "relative",
        zIndex: 20,
      }}
    >
      {/* Left — Logo */}
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Guy Shemesh"
          className="nav-logo"
          style={{ height: "72px", width: "auto", transition: "filter 0.3s ease" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter =
              "invert(48%) sepia(79%) saturate(471%) hue-rotate(304deg) brightness(96%) contrast(93%)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "none";
          }}
        />
      </Link>

      {/* Center — Nav links */}
      <div
        className="nav-links"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "36px",
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="nav-link"
            style={{
              color: "#e05a76",
              textDecoration: "none",
              fontSize: "11px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              letterSpacing: "0.16em",
              opacity: 0.7,
              transition: "opacity 0.2s ease",
              padding: "8px 0",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.7";
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Right — Let's Talk */}
      <div
        className="nav-ctas"
        style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
      >
        <a
          href="mailto:Guyshemesh9@gmail.com"
          className="nav-btn"
          style={{
            padding: "10px 22px",
            borderRadius: "20px",
            border: "1px solid #e05a76",
            textDecoration: "none",
            color: "#e05a76",
            fontSize: "12px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#e05a76";
            el.style.color = "#0d0d0d";
            el.style.boxShadow = "0 0 15px rgba(224, 90, 118, 0.4)";
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
