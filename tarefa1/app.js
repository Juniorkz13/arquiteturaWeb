var express = require('express')
var consign = require('consign')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/views')

consign().include('src/routes').then('src/models').then('src/controllers').into(app)

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
