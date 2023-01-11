const express = require('express');
const qrcode = require('qrcode');

const app = express();

app.get('/qr', (req, res) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('Se requiere un parámetro de url.');
    return;
  }

  let host
  try {
    host = new URL(`http://${url}`).hostname
  } catch (err) {
    res.status(400).send('Se requiere un parámetro de url válido.');
    return;
  }
  host = host.split(".")[1];
  const fileName = `${host}.png`;

  qrcode.toBuffer(url, { type: 'png' }, function (err, buffer) {
    if (err) throw err
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    res.send(buffer);
  });
});

app.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000.');
});

// http://localhost:3000/qr?url=www.google.com