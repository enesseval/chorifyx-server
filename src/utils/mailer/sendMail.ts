import transporter from "../../config/mailer";

interface MailOptions {
   to: string;
   subject: string;
   html: string;
}

export async function sendMail({ to, subject, html }: MailOptions) {
   try {
      await transporter.sendMail({
         from: `"Chorifyx" <${process.env.SMTP_USER}>`,
         to,
         subject,
         html,
      });
   } catch (error) {
      console.error("📨 Mail gönderme hatası:", error);
      throw new Error("Mail gönderilemedi.");
   }
}
