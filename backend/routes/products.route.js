import express from 'express'
import cors from 'cors'
import corsOptions from '../utils/corsOptions.js'

const productsRouter = express.Router()

productsRouter.use(cors(corsOptions))
productsRouter.get('/', (req, res) => {
  res.send('products')
})

export default productsRouter