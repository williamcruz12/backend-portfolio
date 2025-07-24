import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import foto from "../assets/foto-perfil.jpg";

export default function HeroSection() {
  const { language } = useLanguage();

  const translations = {
    pt: {
      greeting: "Olá, eu sou o William 👋",
      subtitle: `Desenvolvedor Web Full Stack`,
      button: "Ver projetos"
    },
    en: {
      greeting: "Hi, I'm William 👋",
      subtitle: `Full Stack Web Developer`,
      button: "View projects"
    },
    es: {
      greeting: "Hola, soy William 👋",
      subtitle: `Desarrollador web full stack`,
      button: "Ver proyectos"
    }
  };

  const t = translations[language];

  return (
    <section
      id="inicio"
      className="pt-[150px] pb-20 md:pb-28 px-4 bg-gradient-to-br from-blue-950 via-black to-blue-800 text-white dark:text-white"
    >
      <motion.div
        key={language}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10"
      >
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t.greeting}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl mb-6 text-white/90 whitespace-pre-line dark:text-white/80"
          >
            {t.subtitle}
          </motion.p>
          <motion.a
            href="#projetos"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-white text-blue-800 dark:bg-yellow-300 dark:text-black font-semibold rounded-xl shadow-md hover:bg-gray-100 dark:hover:bg-yellow-200 transition"
          >
            {t.button}
          </motion.a>
        </div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={foto}
            alt="William Cruz"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white dark:border-yellow-300 shadow-lg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
