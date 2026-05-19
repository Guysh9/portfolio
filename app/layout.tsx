import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import GrainCanvas from "@/components/GrainCanvas";
import CustomCursor from "@/components/CustomCursor";
import AnimatedGradient from "@/components/AnimatedGradient";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Guy Shemesh // Portfolio",
  description:
    "I bring ideas to life through dynamic movement and bold, unapologetic aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${playfair.variable}`}
    >
      <body className="bg-background antialiased">
        <AnimatedGradient />
        {/* Subtle background grid */}
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(224, 90, 118, 0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(224, 90, 118, 0.04) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
        <GrainCanvas />
        <CustomCursor />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
