import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import SelectedWorks from "@/components/SelectedWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Showreel />
      <SelectedWorks />
      <Footer />
    </main>
  );
}
