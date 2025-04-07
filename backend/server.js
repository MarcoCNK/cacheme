import express from 'express'
import authRouter from './routes/auth.route.js'
import mongoose from './config/db.config.js'
import cors from 'cors'
import corsOptions from './utils/corsOptions.js'
import productsRouter from './routes/products.route.js'

const port = 3000
const app = express()

app.use(cors(corsOptions))
// app.options('*', cors(corsOptions)) // include before other routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by')
app.disable('server')

app.use('/api/auth', authRouter)

app.use("/api/products", productsRouter)

app.post('/', (req, res) => {
    console.log("Request of post method has the body: ", req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on local host  http://localhost:${port}`)
})