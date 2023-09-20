const express = require('express')
const mongoose = require('mongoose')
const Filme = require('./models/Filme')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/filme', async (req, res) => {
    const { titulo, diretor, ano, genero } = req.body
    const filme = { titulo, diretor, ano, genero }
    try {
        const newFilme = await Filme.create(filme)
        res.status(201).json(newFilme)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/filme', async (req, res) => {
    try {
        const filmes = await Filme.find()
        res.json(filmes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/filme/:titulo', async (req, res) => {
    const { titulo } = req.params
    try {
        const filme = await Filme.findOne({ titulo })
        res.json(filme)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/filme/:id', async (req, res) => {
    const { id } = req.params
    try {
        const filme = await Filme.findById(id)
        res.json(filme)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.patch('/filme/:id', async (req, res) => {
    const { id } = req.params
    const { titulo, diretor, ano, genero } = req.body
    const filme = { titulo, diretor, ano, genero }
    try {
        if (titulo) {
            await Filme.updateOne({ _id: id }, { $set: { titulo } })
        } else if (diretor) {
            await Filme.updateOne({ _id: id }, { $set: { diretor } })
        } else if (ano) {
            await Filme.updateOne({ _id: id }, { $set: { ano } })
        } else if (genero) {
            await Filme.updateOne({ _id: id }, { $set: { genero } })
        }
        res.json({ message: 'Atualiazado' }, filme)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.delete('/filme/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Filme.deleteOne({ _id: id })
        res.json({ message: 'Deletado' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/', (req, res) => {
    //criando a rota - endpoint
    res.json({ message: 'Oi Express' })
})

mongoose
    .connect(
        'mongodb+srv://admin:admin@apicluster.evtkx.mongodb.net/catalogo?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(
        app.listen(3000, () => {
            console.log('Conectado')
        })
    )
    .catch((err) => {
        console.log(err)
    })
