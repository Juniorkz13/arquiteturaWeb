import http from 'http'
import Express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const app = Express()
const server = http.createServer(app)
dotenv.config()

app.use(Express.json())
app.get('/', (req, res) => {
    res.send('funcionando')
})

app.get('/clientes', verifyJWT, (req, res, next) => {
    console.log('Retornou todos os clientes')
    res.json([{ id: 1, nome: 'José' }])
})

app.post('/login', (req, res, next) => {
    if (req.body.user === 'admin' && req.body.pwd === '123') {
        const id = 1
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300
        })
        return res.json({ auth: true, token: token })
    }
    res.status(500).json({ message: 'Login inválido!' })
})

app.post('/logout', (req, res, next) => {
    res.json({ auth: false, token: null })
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).json({ auth: false, message: 'Token não informado.' })

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Token inválido.' })

        req.userId = decoded.id
        next()
    })
}

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
