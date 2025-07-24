import { useState, useEffect, useRef } from "react";
import { GlobeAltIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const sections = ["sobre", "projetos", "skills", "contato"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { language, changeLanguage } = useLanguage();

  const translations = {
    pt: { sobre: "Sobre", projetos: "Projetos", skills: "Skills", contato: "Contato" },
    en: { sobre: "About", projetos: "Projects", skills: "Skills", contato: "Contact" },
    es: { sobre: "Sobre mí", projetos: "Proyectos", skills: "Habilidades", contato: "Contacto" },
  };

  const t = translations[language] || translations["pt"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Mostrar ou esconder navbar
      if (scrollY > lastScrollY.current && scrollY > 100) {
        setHidden(true); // rolando para baixo
      } else {
        setHidden(false); // rolando para cima
      }
      lastScrollY.current = scrollY;

      // Seção ativa
      let current = "";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollY + 110) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderLink = (id, isMobile = false) => (
    <button
      key={id}
      onClick={() => {
        scrollToSection(id);
        if (isMobile) setMenuOpen(false);
      }}
      className={`block text-left w-full ${
        isMobile ? "py-2 text-base" : ""
      } hover:text-blue-400 dark:hover:text-yellow-300 transition ${
        activeSection === id
          ? "text-blue-400 dark:text-yellow-300 underline"
          : "text-slate-200 dark:text-yellow-100"
      }`}
    >
      {t[id]}
    </button>
  );

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 py-4 shadow-md transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-slate-200">
        {/* Logo */}
        <a
          href="#sobre"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("sobre");
            setMenuOpen(false);
          }}
          className="leading-tight"
        >
          <h1 className="text-2xl text-blue-300 dark:text-yellow-300">William Cruz</h1>
          <p className="text-sm text-slate-200">Portfólio</p>
        </a>

        {/* Links desktop */}
        <div className="hidden md:flex space-x-10 text-sm">
          {sections.map((id) => renderLink(id))}
        </div>

        {/* Ações */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleDarkMode}>
            {dark ? (
              <SunIcon className="w-5 h-5 text-yellow-300" />
            ) : (
              <MoonIcon className="w-5 h-5 text-blue-300" />
            )}
          </button>
          <GlobeAltIcon className="w-5 h-5 text-blue-300 dark:text-yellow-300" />
          {["pt", "en", "es"].map((lng) => (
            <button key={lng} onClick={() => changeLanguage(lng)}>
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${lng === "en" ? "us" : lng}.svg`}
                alt={lng.toUpperCase()}
                className="w-5 h-5"
              />
            </button>
          ))}
        </div>

        {/* Botão mobile */}
        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6 text-blue-300 dark:text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-blue-300 dark:text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden px-4 pb-4 space-y-2 ${
              scrolled
                ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                : "bg-gray-900/90 dark:bg-black/90"
            } backdrop-blur-sm`}
          >
            {sections.map((id) => renderLink(id, true))}

            <div className="flex items-center gap-3 pt-3 border-t border-slate-600">
              <button onClick={toggleDarkMode}>
                {dark ? (
                  <SunIcon className="w-5 h-5 text-yellow-300" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-blue-400" />
                )}
              </button>
              <GlobeAltIcon className="w-5 h-5 text-blue-400 dark:text-yellow-300" />
              {["pt", "en", "es"].map((lng) => (
                <button key={lng} onClick={() => changeLanguage(lng)}>
                  <img
                    src={`https://hatscripts.github.io/circle-flags/flags/${lng === "en" ? "us" : lng}.svg`}
                    alt={lng.toUpperCase()}
                    className="w-5 h-5"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
