import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Stylists from "@/components/sections/Stylists";
import Gallery from "@/components/sections/Gallery";
import Visit from "@/components/sections/Visit";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Experience />
      <Stylists />
      <Gallery />
      <Visit />
      <Booking />
      <Footer />
    </main>
  );
}
