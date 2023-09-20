const mongoose = require('mongoose')
const Filme = mongoose.model('Filme', {
    titulo: String,
    diretor: String,
    ano: Number,
    genero: String
})

module.exports = Filme
