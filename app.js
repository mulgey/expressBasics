// Express i kullanmaya başlayabilmek için
const express = require('express');
const app = express();

// POST esnasında request içerisinde body çalışabilmemiz için middleware kurtarıcı
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Kurabiye çalışmalarımız için middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'pug'); // express e görüntüleme için hangi motoru kullanacağını anlattın. default = views klasörü

// Route ları kestiğimiz yere (route/index.js e göndermiştik) şu 2 satır kodu iliştiriyoruz ki yokluğu hissedilmesin
const mainRoutes = require('./routes'); // routes/index dememize gerek yok, çünkü index standart aranan dosya
app.use(mainRoutes);

const cardRoutes = require('./routes/cards');
app.use('/cards', cardRoutes);

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