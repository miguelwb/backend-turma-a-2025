import { z } from 'zod';
import nodemailer from 'nodemailer';

const contatoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  mensagem: z.string().min(1, 'Mensagem é obrigatória'),
  assunto: z.string().optional(),
});

function createTransport() {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;

  if (!user || !pass) {
    throw new Error('Configuração de email ausente: defina NODEMAILER_USER e NODEMAILER_PASS');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function enviarContato(req, res) {
  try {
    const { nome, email, mensagem, assunto } = req.body;
    contatoSchema.parse({ nome, email, mensagem, assunto });

    const transporter = createTransport();

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: 'mobilizepv@gmail.com',
      replyTo: email,
      subject: `Contato: ${assunto || 'Mensagem do site'}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
      html: `<p><strong>Nome:</strong> ${nome}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Assunto:</strong> ${assunto || 'Mensagem do site'}</p>
             <p><strong>Mensagem:</strong></p>
             <p>${mensagem.replace(/\n/g, '<br/>')}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email enviado com sucesso', id: info.messageId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: 'Erro de validação', erros: error.errors });
    }
    console.error('Erro ao enviar contato:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}