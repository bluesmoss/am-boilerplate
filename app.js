const express = require('express')
const app = express()
const path = require('path')
const port = 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('pages/home')
})

app.get('/about', function (req, res) {
  res.render('pages/about')
})

app.get('/collections', function (req, res) {
  res.render('pages/collections')
})

app.get('/detail/:id', function (req, res) {
  res.render('pages/detail')
})

app.listen(port, () => {
    console.log(`Example app listeing at port: http://localhost:${port}`);
})