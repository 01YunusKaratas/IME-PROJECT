let backButtonClick = 0; // burda sayacı tutuyor olcaz.
//Burada ileri ve eve dönüş butonlarına özellik eklicem 
//Burada sadece login sayfasın için olan buton ayarı yaptım 
document.getElementById('back-button').addEventListener('click',function(){
        backButtonClick++;

    if(backButtonClick === 1){
        window.location.href= "/index.html";//eğer 1 defa geri tuşuna basarsa indexhtml sayfasına gitsin yani
    }
    
    //


})


//Home butonuna tıklayınca giriş ekranına atsın
document.getElementById('home-button').addEventListener('click',function(){
    window.location.href= "/index.html";//yine aynı mantık bu butona basınca ana sayfaya en başa güvenlik açısından atsın 
})