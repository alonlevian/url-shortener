const express = require('express');
const cors = require('cors');
const shorturlRouter = require('./routers/shorturl'); 
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alon:alon@cluster0.5smcq.mongodb.net/short-urls?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

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
