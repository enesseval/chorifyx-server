const LOGO_URL = "https://i.hizliresim.com/3wenu83.png";

export default function verifyCodeTemplate(name: string, code: string) {
   return {
      subject: "Chorifyx: Doğrulama Kodunuz",
      html: `
    <!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doğrulama Kodunuz</title>
</head>
<body style="margin: 0; padding: 0; width: 100% !important; background-color: #f7f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f7f9fc;">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                <!-- Ana Konteyner Tablosu -->
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0f172a; padding: 30px 0; text-align: center;">
                            <!-- DEĞİŞKENLER: Logonuzun tam URL'sini buraya yerleştirin. -->
                            <img src="${LOGO_URL}" alt="Chorifyx Logo" width="150" style="display: block; margin: 0 auto;">
                        </td>
                    </tr>

                    <!-- İçerik -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0 0 15px 0; font-size: 24px; font-weight: 700; color: #1e293b;">Email Adresinizi Onaylayın</h1>
                                        
                                        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #475569;">Merhaba ${name},</p>
                                        <p style="margin: 0 0 25px 0; font-size: 16px; line-height: 1.6; color: #475569;">Chorifyx hesabınızı tamamlamak ve aktive etmek için lütfen aşağıdaki doğrulama kodunu kullanın.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                        <!-- Kod Kutusu -->
                                        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; text-align: center; border: 1px solid #e2e8f0;">
                                            <!-- DEĞİŞKENLER: 6 haneli doğrulama kodunu buraya yerleştirin. -->
                                            <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 700; color: #0f172a; letter-spacing: 10px;">${code}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="margin: 15px 0 30px 0; font-size: 14px; text-align: center; color: #64748b;">Bu kod 15 dakika boyunca geçerlidir.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <!-- Güvenlik Notu -->
                                        <div style="background-color: #fffbeb; border-left: 4px solid #facc15; padding: 15px 20px; font-size: 14px; color: #78350f;">
                                            <strong style="color: #b45309;">Güvenlik Notu:</strong> Bu doğrulama kodu yalnızca size özeldir. Chorifyx ekibi sizden asla bu kodu istemez veya arayıp sormaz.
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b;">Bu e-postayı siz istemediyseniz, lütfen dikkate almayın.</p>
                            <p style="margin: 0; font-size: 12px; color: #64748b;">© 2025 Chorifyx. Tüm hakları saklıdır.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `,
   };
}
