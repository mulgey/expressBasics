// Routes klasörü içerisinde index.js dosyası oluşturduktan sonra ilk başlangıç girdileri
// Tüm app.use / app.get / app.post olan route ları buraya kes-yapıştırdan sonra "app" leri "router" yapıyoruz 
const express = require('express');
const router = express.Router();

// LOOP ÖRNEĞİ (01)
/* 
const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];
*/

// MIDDLEWARE ÖRNEĞİ (02)
/*
router.use((req, res, next) => {
    req.mesaj = 'Bu bir sesli mesajdır!';
    next();
});

router.use((req, res, next) => {
    console.log(req.mesaj);
    next();
});
*/

// ERROR MIDDLEWARE ÖRNEĞİ (03)
/*
router.use((req, res, next) => {
    console.log("Hata öncesi selam");
    const hata = new Error("Aman Allah'ım!"); // Problemi biz oluşturduk, problem bizde :p
    hata.durum = 500; // "err" yerine "hata", "status" yerine "durum"
    next(hata);
});

router.use((req, res, next) => {
    console.log("Hata sonrası selam"); // Bu selam hatadan sonra olduğu için gözükmeyecek
    next();
});
*/

router.get('/', (req, res) => {
    if (req.cookies.kurabiye) { // Yönlendirmeyle veya direkt gelindiğinde, eğer isim değeri içeren "kurabiye" miz varsa, içinde "isim" anahtarı olan index.pug dosyasıyla çalıştır
        res.locals.isim = req.cookies.kurabiye;
        res.render('index'); 
    } else { // eğer "kurabiye" cookie si yoksa, giriş sayfası olan hello ya yönlendir
        res.redirect("/hello");
    }
});

router.get('/hello', (req, res) => {
    if (req.cookies.kurabiye) {
        res.redirect("/");
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('kurabiye', req.body.kullanıcıadı); // POST cereyan ettiği zaman, "kullanıcıadı" olarak girilen değeri "kurabiye" olarak cookie le
    res.redirect('/'); // Ardından giriş sayfasına yolla. Bu aşamadan sonra EXECUTION STOP istersen eğer (sonraki res.render ler vs) başına RETURN geç
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('kurabiye');
    res.redirect('/hello');
});

module.exports = router;