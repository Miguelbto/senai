const express = require('express');
const cors = require('cors');
const livrosRouter = require('./routes/livros');
const favoritosRouter = require('./routes/favoritos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/livros', livrosRouter);
app.use('/favoritos', favoritosRouter);

module.exports = app;
