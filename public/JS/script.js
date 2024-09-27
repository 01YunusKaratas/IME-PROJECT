document.getElementById('send-code').addEventListener('click', function() {
    const phoneNumber = document.getElementById('phone').value;

    // API'ye telefon numarası gönderme
    fetch('/send-verification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Doğrulama kodu gönderildi!');
            document.getElementById('code-section').style.display = 'block'; // Kod girişini aç
            document.getElementById('send-code').style.display = 'none'; // "Send Code" butonunu gizle
            document.getElementById('verify-code').style.display = 'inline'; // "Verify Code" butonunu göster
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        alert('Doğrulama kodu gönderilemedi, lütfen tekrar deneyin.');
    });
});

// Kod doğrulama butonuna tıklama
document.getElementById('verify-code').addEventListener('click', function() {
    const enteredCode = document.getElementById('code').value;

    if (enteredCode === '') {
        alert('Lütfen doğrulama kodunu girin.');
        return;
    }

    // Kod doğruysa yönlendirme yap (örneğin başka bir sayfaya)
    alert('Doğrulama başarılı! Yönlendiriliyorsunuz...');
    window.location.href = '/login.html'; // Doğrulama sonrası başka bir sayfaya yönlendir
});

