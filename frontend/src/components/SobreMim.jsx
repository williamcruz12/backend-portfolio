import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { FaWhatsapp, FaFileDownload } from "react-icons/fa";

export default function SobreMim() {
  const { language } = useLanguage();

  const translations = {
    pt: {
      title: "Sobre Mim",
      description: `Sou um desenvolvedor Front-end com paixão por interfaces modernas, experiências visuais envolventes e soluções focadas em usabilidade.
Atualmente, concentro meus esforços no desenvolvimento com React, Tailwind e ferramentas modernas que otimizam performance e experiência do usuário.`,
      cv: "Visualizar CV",
      contact: "Falar comigo"
    },
    en: {
      title: "About Me",
      description: `I'm a Front-end developer passionate about modern interfaces, engaging visual experiences, and user-centered solutions.
Currently, I focus on developing with React, Tailwind, and modern tools that optimize performance and user experience.`,
      cv: "View CV",
      contact: "Contact Me"
    },
    es: {
      title: "Sobre Mí",
      description: `Soy un desarrollador Front-end apasionado por las interfaces modernas, experiencias visuales atractivas y soluciones centradas en el usuario.
Actualmente me enfoco en desarrollar con React, Tailwind y herramientas modernas que optimizan el rendimiento y la experiencia del usuario.`,
      cv: "Ver CV",
      contact: "Contáctame"
    }
  };

  const t = translations[language];

  return (
    <section
  id="sobre"
  className="pt-[80px] pb-20 md:pb-20 px-4 bg-gradient-to-br from-blue-800 via-black to-blue-950 text-white"
>
      <div className="max-w-4xl mx-auto text-center">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          {t.title}
        </motion.h2>

        {/* Texto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl mb-8 whitespace-pre-line text-white/90"
        >
          {t.description}
        </motion.p>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/CV-WilliamCruz.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-800 font-semibold rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            <FaFileDownload />
            {t.cv}
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/351910850273?text=Olá%2C%20vim%20pelo%20seu%20portfólio%20online!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border-2 border-blue-800 text-blue-800 dark:text-yellow-300 rounded-xl font-semibold hover:bg-blue-800 hover:text-white dark:hover:text-black transition"
          >
            <FaWhatsapp />
            {t.contact}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
