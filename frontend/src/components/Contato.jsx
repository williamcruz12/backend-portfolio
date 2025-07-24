import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import {
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaGithub,
  FaPaperPlane,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useLanguage } from "../context/LanguageContext";
import "react-toastify/dist/ReactToastify.css";

export default function Contato() {
  const { language } = useLanguage();
  const captchaRef = useRef();
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    contato: "",
    mensagem: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const t = {
    pt: {
      title: "Entre em Contato",
      subtitle: "Também estou disponível para projetos e colaborações.",
      name: "Nome",
      email: "Email",
      contact: "Contato (Ex: 910000000 ou +351910000000)",
      message: "Mensagem",
      button: "Enviar",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      github: "GitHub",
      emailLabel: "Email",
      success: "Mensagem enviada com sucesso!",
      error: "Erro ao enviar. Tente novamente.",
      recaptcha: "Por favor, confirme o reCAPTCHA.",
      invalidPhone: "Número de telefone inválido para Portugal.",
    },
    en: {
      title: "Get in Touch",
      subtitle: "I'm available for projects, collaborations or just a good chat.",
      name: "Name",
      email: "Email",
      contact: "Phone (e.g. 910000000 or +351910000000)",
      message: "Message",
      button: "Send",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      github: "GitHub",
      emailLabel: "Email",
      success: "Message sent successfully!",
      error: "Error sending message. Try again.",
      recaptcha: "Please confirm the reCAPTCHA.",
      invalidPhone: "Invalid phone number for Portugal.",
    },
    es: {
      title: "Contáctame",
      subtitle: "Estoy disponible para proyectos, colaboraciones o una buena charla.",
      name: "Nombre",
      email: "Correo",
      contact: "Teléfono (ej: 910000000 o +351910000000)",
      message: "Mensaje",
      button: "Enviar",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      github: "GitHub",
      emailLabel: "Correo",
      success: "¡Mensaje enviado com éxito!",
      error: "Error al enviar el mensaje. Inténtalo de nuevo.",
      recaptcha: "Por favor, confirma el reCAPTCHA.",
      invalidPhone: "Número de teléfono inválido para Portugal.",
    },
  }[language];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const telefoneValido = /^(\+351)?9\d{8}$/.test(
      formData.contato.replace(/\s/g, "")
    );

    if (!telefoneValido) {
      toast.error(t.invalidPhone);
      return;
    }

    const recaptchaToken = captchaRef.current?.getValue();
    if (!recaptchaToken) {
      toast.error(t.recaptcha);
      return;
    }

    setStatus("enviando");

    try {
      const response = await fetch(`${apiUrl}/api/enviar-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          contato: formData.contato,
          mensagem: formData.mensagem,
          recaptcha: recaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t.success);
        setFormData({ nome: "", email: "", contato: "", mensagem: "" });
        captchaRef.current.reset();
        setStatus("sucesso");
      } else {
        toast.error(data.message || t.error);
        setStatus("erro");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast.error(t.error);
      setStatus("erro");
    }
  };

  return (
    <section
      id="contato"
      className="pt-20 pb-10 px-4 bg-gradient-to-br from-blue-950 via-black to-blue-800 text-white"
    >
      <ToastContainer />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          className="text-center text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t.subtitle}
        </motion.p>

        <div className="grid md:grid-cols-5 gap-10">
          <div className="space-y-4 md:col-span-2">
            {[{
              href: "https://www.linkedin.com/in/williamcavalcanticruz/",
              label: t.linkedin,
              icon: <FaLinkedin />,
              color: "bg-blue-600 hover:bg-blue-700",
            }, {
              href: "https://wa.me/351910850273",
              label: t.whatsapp,
              icon: <FaWhatsapp />,
              color: "bg-green-500 hover:bg-green-600",
            }, {
              href: "mailto:contato@williamcavalcanti.com",
              label: t.emailLabel,
              icon: <FaEnvelope />,
              color: "bg-blue-500 hover:bg-blue-600",
            }, {
              href: "https://github.com/williamcruz12",
              label: t.github,
              icon: <FaGithub />,
              color: "bg-zinc-800 hover:bg-zinc-700",
            }].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-5 py-3 rounded-lg text-white transition-all duration-300 shadow-lg ${item.color}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.a>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl space-y-4 md:col-span-3"
          >
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
              placeholder={t.name}
              className="w-full px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder={t.email}
              className="w-full px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="contato"
              value={formData.contato}
              onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              required
              placeholder={t.contact}
              className="w-full px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="mensagem"
              rows={4}
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              required
              placeholder={t.message}
              className="w-full px-4 py-2 rounded-md border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={captchaRef}
              className="scale-[0.95] transform origin-left"
            />

            <button
              type="submit"
              disabled={status === "enviando"}
              className={`w-full py-2 mt-4 rounded-md flex items-center justify-center gap-2 transition-all font-semibold text-white ${
                status === "enviando"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FaPaperPlane />
              {status === "enviando" ? "Enviando..." : t.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
