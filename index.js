require('dotenv').config(); // .env dosyasını yükler
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Statik dosyalar için public klasörünü kullan

// Twilio istemcisi oluşturma
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
    console.error("Twilio kimlik bilgileri eksik. Lütfen .env dosyasını kontrol edin.");
    process.exit(1); // Hatalı durumda uygulamayı durdur
}

console.log('Twilio Account SID:', accountSid);
console.log('Twilio Auth Token:', authToken);
console.log('Twilio Phone Number:', twilioPhoneNumber);

const client = twilio(accountSid, authToken);

// SMS gönderme
app.post('/send-verification', (req, res) => {
    const { phoneNumber } = req.body;

    // Telefon numarası formatını kontrol et
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        return res.status(400).json({ error: 'Geçersiz telefon numarası formatı.' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6 haneli doğrulama kodu

    // Mesaj gönderme işlemi
    client.messages
        .create({
            body: `Doğrulama kodunuz: ${verificationCode}`,
            from: twilioPhoneNumber,
            to: phoneNumber,
        })
        .then(message => {
            console.log(`Mesaj gönderildi: ${message.sid}`);
            // Test amacıyla doğrulama kodunu geri döndürüyoruz, fakat canlıda bunu yapmamalısın!
            res.status(200).json({ message: 'Mesaj başarıyla gönderildi.', code: verificationCode });
        })
        .catch(error => {
            console.error('Mesaj gönderilemedi:', error);
            res.status(500).json({ error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' });
        });
});

// Sunucu dinleme
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
