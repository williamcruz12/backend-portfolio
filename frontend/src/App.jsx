import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SobreMim from "./components/SobreMim";
import Skills from "./components/Skills"; 
import Projetos from "./components/Projetos"; 
import Contato from "./components/Contato";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SobreMim />
      <Skills />
      <Projetos />
      <Contato />
      <Footer />
    </>
  );
}

export default App;
