// Express i kullanmaya başlayabilmek için
const express = require('express');
const app = express();

// POST esnasında request içerisinde body çalışabilmemiz için middleware kurtarıcı
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Kurabiye çalışmalarımız için middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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
app.use((req, res, next) => {
    req.mesaj = 'Bu bir sesli mesajdır!';
    next();
});

app.use((req, res, next) => {
    console.log(req.mesaj);
    next();
});
*/

// ERROR MIDDLEWARE ÖRNEĞİ (03)
/*
app.use((req, res, next) => {
    console.log("Hata öncesi selam");
    const hata = new Error("Aman Allah'ım!"); // Problemi biz oluşturduk, problem bizde :p
    hata.durum = 500; // "err" yerine "hata", "status" yerine "durum"
    next(hata);
});

app.use((req, res, next) => {
    console.log("Hata sonrası selam"); // Bu selam hatadan sonra olduğu için gözükmeyecek
    next();
});
*/

app.set('view engine', 'pug'); // express e görüntüleme için hangi motoru kullanacağını anlattın. default = views klasörü

app.get('/', (req, res) => {
    if (req.cookies.kurabiye) { // Yönlendirmeyle veya direkt gelindiğinde, eğer isim değeri içeren "kurabiye" miz varsa, içinde "isim" anahtarı olan index.pug dosyasıyla çalıştır
        res.locals.isim = req.cookies.kurabiye;
        res.render('index'); 
    } else { // eğer "kurabiye" cookie si yoksa, giriş sayfası olan hello ya yönlendir
        res.redirect("/hello");
    }
});

app.get('/cards', (req, res) => {
    res.locals.soru = "pH'ı en yüksek su hangisidir?"; // değişkenler için tercih ettiğim tanımlama yapısı (res.locals)
    res.locals.hint = "Üstün lezzet ödüllü hani ..";
    // LOOP ÖRNEĞİ (01)
    //res.locals.renkler = colors;
    res.render('card');
});

app.get('/hello', (req, res) => {
    if (req.cookies.kurabiye) {
        res.redirect("/");
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('kurabiye', req.body.kullanıcıadı); // POST cereyan ettiği zaman, "kullanıcıadı" olarak girilen değeri "kurabiye" olarak cookie le
    res.redirect('/'); // Ardından giriş sayfasına yolla
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('kurabiye');
    res.redirect('/hello');
});

// ERROR ÖRNEĞİ (03)
app.use((req, res, next) => {
    const hata = new Error('Sayfayı bulamadım agaa!');
    hata.durum = 404;
    next(hata);
});

app.use((hata, req, res, next) => { // "err" yerine "hata" kullandım, oldu gitti
    res.locals.yanlış = hata;
    res.status(hata.durum); // "err.status" yerine "hata.durum" kullanabildik. res.status, res.hata olarak değiştirilemez
    res.render('error');
})

app.listen(3000, () => {
    console.log('Sunucu tam takır');
});