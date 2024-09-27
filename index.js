const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // public klasöründeki statik dosyaları sun

// Twilio istemcisi oluşturma
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// SMS gönderme
app.post('/send-verification', (req, res) => {
    const { phoneNumber } = req.body;
    
    // Telefon numarasını doğrula (örneğin, +90 ile başlayıp başlamadığını kontrol edin)
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
        return res.status(400).json({ error: 'Geçersiz telefon numarası formatı.' });
    }
    
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6 haneli rastgele doğrulama kodu

    client.messages
        .create({
            body: `Doğrulama kodunuz: ${verificationCode}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        })
        .then(message => {
            console.log(`Mesaj gönderildi: ${message.sid}`);
            res.status(200).json({ message: 'Mesaj başarıyla gönderildi.', code: verificationCode }); // Kod geri dönüyor (test için)
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

