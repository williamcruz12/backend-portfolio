import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-slate-200 py-6"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm select-none text-center md:text-left">
          &copy; {new Date().getFullYear()} William. Todos os direitos reservados.
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://github.com/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaGithub size={24} className="text-white hover:text-gray-300" />
          </a>

          <a
            href="https://www.linkedin.com/in/williamcavalcanticruz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-400 transition transform hover:scale-110"
          >
            <FaLinkedin size={24} className="text-blue-400" />
          </a>

          <a
            href="mailto:contato@williamcavalcanti.com"
            aria-label="Email"
            className="hover:text-red-400 transition transform hover:scale-110"
          >
            <FaEnvelope size={24} className="text-red-400" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
