import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS ajustado
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://williamcavalcanti.com",
    ],
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// 🔄 Teste
app.get("/", (_, res) => {
  res.send("✅ API de EmailJS com reCAPTCHA funcionando.");
});

// 📤 Envio de e-mail
app.post("/api/enviar-email", async (req, res) => {
  const { nome, email, contato, mensagem, recaptcha } = req.body;

  if (!recaptcha) {
    return res.status(400).json({ success: false, message: "reCAPTCHA ausente." });
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`;

  try {
    const captchaRes = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return res.status(403).json({ success: false, message: "Falha ao verificar reCAPTCHA." });
    }

    // 📧 Envia via EmailJS
    const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        template_params: { nome, email, contato, mensagem },
      }),
    });

    if (!emailRes.ok) {
      const errorData = await emailRes.text();
      console.error("Erro no EmailJS:", errorData);
      return res.status(500).json({ success: false, message: "Erro ao enviar e-mail." });
    }

    return res.json({ success: true, message: "Mensagem enviada com sucesso." });

  } catch (err) {
    console.error("Erro ao processar requisição:", err);
    return res.status(500).json({ success: false, message: "Erro interno ao enviar e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
