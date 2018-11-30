// Routes klasörü içerisinde .js dosyası oluşturduktan sonra ilk başlangıç girdileri
// Tüm app.use / app.get / app.post olan route ları buraya kes-yapıştırdan sonra "app" leri "router" yapıyoruz 
const express = require('express');
const router = express.Router();

// Bize "data" lazım
const { data } = require('../data/cardsData.json'); 
const { cards } = data; // Şununla aynı anlama geliyor ==> const cards = data.cards;

// '/:id' yapısında, ":" sonrasındaki isim değişken olarak kullanılır.
router.get('/:id', (req, res) => { // kendi route u içerisinde taşıdıktan sonra "/cards" yerine "/" kullandık. Çünkü app.js içerisinde app.use('/cards') yolunu kullanıyoruz
    res.locals.soru = cards[req.params.id].question; // değişkenler için tercih ettiğim tanımlama yapısı (res.locals)
    res.locals.ipucu = cards[req.params.id].hint; // req.params.id yapısı ile, url nin sonundaki sayıyı yakalayabildik
    // LOOP ÖRNEĞİ (01)
    //res.locals.renkler = colors;
    res.render('card');
});

module.exports = router;