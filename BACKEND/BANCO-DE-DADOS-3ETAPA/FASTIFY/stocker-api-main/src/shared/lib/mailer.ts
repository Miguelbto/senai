import nodemailer from "nodemailer";

export async function sendResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const url = `localhost:3000/reset-password?token=${token}`;
  const html = `<p>Redefina sua senha clicando no link abaixo:</p><a href="${url}">${url}</a>`;

  await transporter.sendMail({
    from: '"Sistema" <no-reply@seusite.com>',
    to: email,
    subject: "Recuperação de Senha",
    html,
  });
}
