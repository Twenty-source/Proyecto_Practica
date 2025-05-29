const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './db.json';

app.get('/comentarios', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  res.json(data);
});

app.post('/comentarios', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  const nuevoComentario = {
    nombre: req.body.nombre,
    mensaje: req.body.mensaje,
    fecha: new Date().toISOString()
  };
  data.push(nuevoComentario);
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.status(201).json(nuevoComentario);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
