import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import emailjs from "emailjs-com";

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware CORS
app.use(cors({
  origin: ["http://localhost:5173", "https://williamcavalcanti.com"],
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Teste de rota
app.get("/", (_, res) => {
  res.send("✅ API de EmailJS com reCAPTCHA funcionando.");
});

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

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { nome, email, contato, mensagem },
      process.env.EMAILJS_USER_ID
    );

    return res.json({ success: true, message: "Mensagem enviada com sucesso." });
  } catch (err) {
    console.error("Erro ao enviar:", err);
    return res.status(500).json({ success: false, message: "Erro interno ao enviar e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
