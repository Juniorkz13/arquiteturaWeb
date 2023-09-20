import { arrayBuffer } from 'stream/consumers'
import { connection } from './db'
import { Router } from 'express'

export const router = Router()

router.get('/', (req, res) => {
    res.send('Aplicação funcionando!')
})

router.get('/movies', (req, res) => {
    connection.query('SELECT * FROM movies', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

router.get('/movies/:id', (req, res) => {
    const id = req.params.id
    const query = 'SELECT * FROM movies WHERE cod = ?'
    connection.query(query, id, (err, result) => {
        if (err) throw err
        if (result.length === 0) {
            res.send('Filme não encontrado')
        } else {
            res.json(result[0])
        }
    })
})

router.post('/new', async (req, res) => {
    try {
        const { titulo, sinopse, duracao, imagem, dataLancamento } = req.body
        if (!titulo || !sinopse || !duracao || !imagem || !dataLancamento) {
            throw new Error('Preencha todos os campos')
        }

        const imagemBinario = Buffer.from(imagem, 'base64')
        var base64 = new Buffer(arrayBuffer).toString('base64')

        const query = `INSERT INTO movies (titulo, sinopse, duracao, imagem, dataLancamento) VALUES (?, ?, ?, ?, ?)`
        const values = [titulo, sinopse, duracao, imagemBinario, dataLancamento]

        const [result] = await connection.promise().query(query, values)
        res.json({ id: result.insertId, titulo, sinopse, duracao, imagem, dataLancamento })
    } catch (err) {
        res.send(err.message)
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const { titulo, sinopse, duracao, imagem, dataLancamento } = req.body
        if (!titulo && !sinopse && !duracao && !imagem && !dataLancamento) {
            throw new Error('Preencha pelo menos um campo')
        }

        const query = `UPDATE movies SET ? WHERE cod = ?`
        const values = [req.body, id]

        await connection.promise().query(query, values)
        res.json({ id, titulo, sinopse, duracao, imagem, dataLancamento })
    } catch (err) {
        res.send(err.message)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = `DELETE FROM movies WHERE cod = ?`
        await connection.promise().query(query, id)
        res.send('Filme excluído com sucesso')
    } catch (err) {
        res.send(err.message)
    }
})
