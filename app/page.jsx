import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "..//components/About";
import Work from "../components/Work";
import CtaBanner from "../components/CtaBanner";
import Stories from "../components/Stories";
import Press from "../components/Press";
import HireMe from "../components/HireMe";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="grain">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <CtaBanner />
      <Stories />
      {/* <Press /> */}
      <HireMe />
      <Contact />
      <Footer />
    </main>
  );
}
