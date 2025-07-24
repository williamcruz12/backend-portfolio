import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  FaReact, FaNodeJs, FaGithub, FaHtml5, FaCss3Alt, FaFigma,
} from "react-icons/fa";
import {
  SiTailwindcss, SiMysql, SiPhp, SiJavascript, SiFilezilla,
} from "react-icons/si";

export default function Skills() {
  const { language = "pt" } = useLanguage();
  const [filter, setFilter] = useState("all");

  const translations = {
    pt: {
      title: "Minhas Skills",
      categories: {
        all: "Todas",
        frontend: "Front-end",
        backend: "Back-end",
        design: "Design / UI-UX",
        tools: "Ferramentas"
      }
    },
    en: {
      title: "My Skills",
      categories: {
        all: "All",
        frontend: "Front-end",
        backend: "Back-end",
        design: "Design / UI-UX",
        tools: "Tools"
      }
    },
    es: {
      title: "Mis Habilidades",
      categories: {
        all: "Todas",
        frontend: "Front-end",
        backend: "Back-end",
        design: "Diseño / UI-UX",
        tools: "Herramientas"
      }
    }
  };

  const t = translations[language] || translations.pt;

  const skills = [
    { name: "React", icon: <FaReact className="text-blue-500" />, category: "frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" />, category: "frontend" },
    { name: "HTML5", icon: <FaHtml5 className="text-orange-600" />, category: "frontend" },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" />, category: "frontend" },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, category: "frontend" },

    { name: "Node.js", icon: <FaNodeJs className="text-green-600" />, category: "backend" },
    { name: "MySQL", icon: <SiMysql className="text-blue-700" />, category: "backend" },
    { name: "PHP", icon: <SiPhp className="text-indigo-500" />, category: "backend" },

    { name: "Figma", icon: <FaFigma className="text-pink-500" />, category: "design" },

    { name: "GitHub", icon: <FaGithub className="text-gray-800 dark:text-gray-200" />, category: "tools" },
    { name: "Git", icon: <FaGithub className="text-orange-500" />, category: "tools" },
    { name: "FileZilla", icon: <SiFilezilla className="text-red-600" />, category: "tools" },
  ];

  const normalizedFilter = filter.toLowerCase().replace(/[^a-z]/g, "");
  const filteredSkills = normalizedFilter === "all"
    ? skills
    : skills.filter(s => s.category === normalizedFilter);

  return (
      <section id="skills"
        className="pt-[50px] pb-20 md:pb-10 px-4 bg-gradient-to-br from-blue-950 via-black to-blue-800 text-white"
      >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          {t.title}
        </motion.h2>

        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {Object.entries(t.categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-5 py-2 rounded-full font-medium border transition-all duration-300 
                ${filter === key
                  ? "bg-gradient-to-r from-blue-700 to-indigo-600 text-white dark:from-yellow-400 dark:to-yellow-300 dark:text-black"
                  : "bg-white text-blue-800 dark:bg-gray-800 dark:text-yellow-300"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 place-items-center"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex flex-col items-center group"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-5xl cursor-pointer"
                  title={skill.name}
                >
                  {skill.icon}
                </motion.div>
                <span className="mt-2 text-center text-sm opacity-80 group-hover:opacity-100 transition">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
