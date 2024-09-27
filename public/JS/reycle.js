
// Login page button tıklayınca diğer sayfaya yönlendirme 

document.getElementById('back-button').addEventListener('click',function(){
    window.location.href ="/login.html";// butona tıklayınca bizi bu sayfaya yönlendiricek

})
document.getElementById('home-button').addEventListener('click', function(){
    window.location.href="/index.html";// butona tıklarsak geri dönüşüm yerine bizi diğer sayfaya yönlendiricek
})


