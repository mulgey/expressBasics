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

app.set('view engine', 'pug'); // express e görüntüleme için hangi motoru kullanacağını anlattın. default = views klasörü

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cards', (req, res) => {
    res.locals.soru = "pH'ı en yüksek su hangisidir?"; // değişkenler için tercih ettiğim tanımlama yapısı (res.locals)
    res.locals.hint = "Üstün lezzet ödüllü hani ..";
    // Loop örneği (01)
    //res.locals.renkler = colors;
    res.render('card');
});

app.get('/hello', (req, res) => {
    res.locals.isim = req.cookies.kurabiye;
    res.render('hello'); //Bu route içerisinde GET çereyan ettiği zaman kullanacağın isim (isim = pug dosyasındaki değişken), "kurabiye" adlı cookie içerisindeki değere eşit olsun
});

app.post('/hello', (req, res) => {
    res.cookie('kurabiye', req.body.kullanıcıadı);
    res.locals.isim = req.body.kullanıcıadı;
    res.render('hello'); //Bu route içerisinde POST çereyan ettiği zaman, içinde "isim" anahtarı olan hello dosyasını ekrana yansıt
});

app.listen(3000, () => {
    console.log('Sunucu tam takır');
});