const express = require('express');
const cors = require('cors');
const shorturlRouter = require('./routers/shorturl'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/short-urls', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(shorturlRouter);

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

module.exports = app;
