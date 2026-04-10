import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CommunityActions from "./components/CommunityActions";
import Footer from "./components/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <CommunityActions />
      <Footer />
    </>
  );
}
