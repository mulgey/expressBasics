// Routes klasörü içerisinde .js dosyası oluşturduktan sonra ilk başlangıç girdileri
// Tüm app.use / app.get / app.post olan route ları buraya kes-yapıştırdan sonra "app" leri "router" yapıyoruz 
const express = require('express');
const router = express.Router();

// Bize "data" lazım
const { data } = require('../data/cardsData.json'); 
const { cards } = data; // Şununla aynı anlama geliyor ==> const cards = data.cards;

// '/:id' yapısında, ":" sonrasındaki isim değişken olarak kullanılır.
router.get('/', (req, res) => {
    const kartSayısı = cards.length;
    const kartIDsi = Math.floor( Math.random() * kartSayısı); // standart olan rastgele formülü içerisinde kartsayısı bilgisini kullanarak oluşturduğumuz değeri kaydedip, adres çubuğuna pasladık.
    res.redirect( `/cards/${kartIDsi}?kartYüzü=soru` ); 
});

router.get('/:id', (req, res) => { // kendi route u içerisinde taşıdıktan sonra "/cards" yerine "/" kullandık. Çünkü app.js içerisinde app.use('/cards') yolunu kullanıyoruz
    const { id } = req.params; // "/cards/2?kartYüzü=soru" kalıbında "2" kısmını yakalar
    const { kartYüzü } = req.query; // "/cards/2?kartYüzü=soru" kalıbında "soru" kısmını yakalar
    const sorucevapMetni = cards[id][kartYüzü]; // örneğimizde: cards[2][soru] dan ikinci soruyu getirir
    const { ipucu } = cards[id]; // örneğimizde cards[2][ipucu] yolu ile ikinci ipucunu getirir
    const isim = req.cookies.kurabiye; // card.pug dan extends --> layout.pug içerisindeki isim anahtarına kurabiyedeki değeri verdik

    const ceptekiVeri = { id, sorucevapMetni, isim }; // { "2", "cards[2][soru]", "isim" } verilerini, res.locals a itelemek üzere depolar
    if (kartYüzü === 'soru') {
        ceptekiVeri.ipucu = ipucu; // örneğimizde ceptekiVeri ye cards[2][ipucu] nu ekliyoruz ama bu kısımda aydınlamaya ihtiyacım var
        ceptekiVeri.gösterilecek = 'cevap'; // ceptekiVeri ye res.locals verilerini eklemeye devam ediyoruz aşağı doğru
        ceptekiVeri.gösterilecekTaraf = 'Cevap';
    } else if (kartYüzü === 'cevap') {
        ceptekiVeri.gösterilecek = 'soru';
        ceptekiVeri.gösterilecekTaraf = 'Soru';
    } else {
        res.redirect( `/cards/${id}?kartYüzü=soru` );
    }
    
    //res.locals.soru = cards[req.params.id].soru; // değişkenler için tercih ettiğim tanımlama yapısı (res.locals)
    //res.locals.ipucu = cards[req.params.id].ipucu; // req.params.id yapısı ile, url nin sonundaki sayıyı yakalayabildik
    // LOOP ÖRNEĞİ (01)
    //res.locals.renkler = colors;
    res.render('card', ceptekiVeri);
});

module.exports = router;

