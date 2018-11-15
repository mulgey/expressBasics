// Express i kullanmaya başlayabilmek için
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('İşte express, işte yenilik!');
});

app.listen(3000);