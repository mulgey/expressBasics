// Express i kullanmaya başlayabilmek için
const express = require('express');
const app = express();

// POST esnasında request içerisinde body çalışabilmemiz için middleware kurtarıcı
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Kurabiye çalışmalarımız için middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Loop örneği (01)
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

// Middleware örneği (02)

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
    // Loop örneği (01)
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

app.listen(3000, () => {
    console.log('Sunucu tam takır');
});