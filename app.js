// Express i kullanmaya başlayabilmek için
const express = require('express');
const app = express();

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
    res.locals.soru = "pH'ı en yüksek su hangisidir?"; // değişkenler için tercih ettiğim tanımlama yapısı
    res.locals.hint = "Üstün lezzet ödüllü hani ..";
    // Loop örneği (01)
    //res.locals.renkler = colors;
    res.render('card');
});

app.get('/hello', (req, res) => {
    res.render('hello');
});

app.post('/hello', (req, res) => {
    res.render('hello');
});

app.listen(3000, () => {
    console.log('Sunucu tam takır');
});