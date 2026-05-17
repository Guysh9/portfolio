import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import SelectedWorks from "@/components/SelectedWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "radial-gradient(circle 1200px at 50% 0%, rgba(224, 90, 118, 0.2) 0%, transparent 70%)" }}>
      <Navbar />
      <Hero />
      <Showreel />
      <SelectedWorks />
      <Footer />
    </main>
  );
}
