import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  FaExternalLinkAlt,
  FaReact,
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaDatabase,
  FaGlobe
} from "react-icons/fa";

export default function Projetos() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  const translations = {
    pt: {
      title: "Meus Projetos",
      view: "Ver Projeto",
      close: "Fechar"
    },
    en: {
      title: "My Projects",
      view: "View Project",
      close: "Close"
    },
    es: {
      title: "Mis Proyectos",
      view: "Ver Proyecto",
      close: "Cerrar"
    }
  };

  const t = translations[language];

  const techIcons = {
    React: <FaReact className="text-blue-400" title="React" />,
    PHP: <FaPhp className="text-indigo-400" title="PHP" />,
    HTML: <FaHtml5 className="text-orange-500" title="HTML5" />,
    CSS: <FaCss3Alt className="text-blue-500" title="CSS3" />,
    JavaScript: <FaJs className="text-yellow-300" title="JavaScript" />,
    MySQL: <FaDatabase className="text-green-300" title="MySQL" />,
    i18n: <FaGlobe className="text-pink-300" title="Internacionalização" />,
    Vite: <img src="/vite.svg" className="w-4 h-4 inline" alt="Vite" title="Vite" />,
    "Framer Motion": <img src="https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png" className="w-4 h-4 inline" alt="Framer" title="Framer Motion" />
  };

  const projetos = [
    {
      title: {
        pt: "E-commerce Completo",
        en: "Complete E-commerce",
        es: "E-commerce Completo"
      },
      desc: {
        pt: "Este é um projeto completo de e-commerce desenvolvido com React + Vite, idealizado para portfólio pessoal com foco em produtos como chocolates, kits e cestas premium.",
        en: "This is a complete e-commerce project built with React + Vite, designed for a personal portfolio focusing on products like chocolates, kits, and premium baskets.",
        es: "Este es un proyecto completo de comercio electrónico desarrollado con React + Vite, pensado para un portafolio personal enfocado en productos como chocolates, kits y cestas premium."
      },
      img: "/loja-online.png",
      link: "https://react-2etz.vercel.app/",
      tags: ["React", "Tailwind", "Vite"]
    },
    {
      title: {
        pt: "Loja Online",
        en: "Online Store",
        es: "Tienda Online"
      },
      desc: {
        pt: "Loja simples e rápida para venda de produtos online.",
        en: "Simple and fast store for selling products online.",
        es: "Tienda sencilla y rápida para vender productos en línea."
      },
      img: "/ecommerce.png",
      link: "https://williamcavalcanti.com/laistore/",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"]
    },
    {
      title: {
        pt: "Imobiliária",
        en: "Real Estate",
        es: "Inmobiliaria"
      },
      desc: {
        pt: "Sistema para gestão de imóveis com PHP e MySQL.",
        en: "Real estate management system built with PHP and MySQL.",
        es: "Sistema de gestión inmobiliaria desarrollado con PHP y MySQL."
      },
      img: "/imobiliaria .png",
      link: "https://williamcavalcanti.com/Imobiliaria/",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"]
    },
    {
      title: {
        pt: "Portfólio Pessoal",
        en: "Personal Portfolio",
        es: "Portafolio Personal"
      },
      desc: {
        pt: "Este é o meu portfólio profissional desenvolvido com React, Tailwind CSS e animações modernas. O site é totalmente responsivo, com suporte a múltiplos idiomas, tema escuro e navegação suave.",
        en: "This is my professional portfolio built with React, Tailwind CSS, and modern animations. It is fully responsive, supports multiple languages, dark mode, and smooth navigation.",
        es: "Este es mi portafolio profesional desarrollado con React, Tailwind CSS y animaciones modernas. Es completamente responsivo, con soporte para múltiples idiomas, modo oscuro y navegación fluida."
      },
      img: "/portifolio.png",
      link: "https://williamcavalcanti.com/",
      tags: ["React", "i18n", "Framer Motion"]
    }
  ];

  const fadeInCard = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.4 }
    })
  };

  return (
    <section
      id="projetos"
      className="pt-[80px] pb-20 px-4 bg-gradient-to-br from-blue-800 via-black to-blue-950 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {t.title}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projetos.map((projeto, index) => (
            <motion.div
              key={index}
              variants={fadeInCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-105 transition cursor-pointer group"
              onClick={() => setSelectedProject(projeto)}
            >
              <img src={projeto.img} alt={projeto.title[language]} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {projeto.title[language]}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {projeto.desc[language]}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {projeto.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 dark:bg-yellow-100 dark:text-yellow-800 px-2 py-1 rounded-full"
                      title={tag}
                    >
                      {techIcons[tag] || null}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-xl w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-2 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-2xl"
                >
                  ×
                </button>
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title[language]}
                  className="w-full h-52 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {selectedProject.title[language]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedProject.desc[language]}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      title={tag}
                      className="flex items-center gap-1 text-sm bg-blue-100 text-blue-800 dark:bg-yellow-100 dark:text-yellow-800 px-2 py-1 rounded-full"
                    >
                      {techIcons[tag] || null}
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  <FaExternalLinkAlt />
                  {t.view}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
