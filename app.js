// Express i kullanmaya başlayabilmek için
const express = require('express');
const app = express();

app.set('view engine', 'pug'); // express e görüntüleme için hangi motoru kullanacağını anlattın. default = views klasörü

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cards', (req, res) => {
    res.locals.soru = "pH'ı en yüksek su hangisidir?";
    res.locals.hint = "Üstün lezzet ödüllü hani .."
    res.render('card');
});

app.listen(3000, () => {
    console.log('Sunucu tam takır');
});