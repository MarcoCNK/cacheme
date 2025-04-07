import express from 'express'
import cors from 'cors'
import corsOptions from '../utils/corsOptions.js'

const productsRouter = express.Router()

productsRouter.use(cors(corsOptions))
productsRouter.get('/', (req, res) => {
  res.set({
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=604800',
  }) 
  res.send(
    [
      { 
        "title": "magic mushrooms",
        "description": "Once you eat one you will never want to stop"
      },
      { 
        "title": "Magic ide",
        "description": "Nothing of emacs, you want to stay awake while you code? use this magic ide"
      },
      { 
        "title": "mana posion",
        "description": "You will need to recover your energy"
      },
    ]
  )
})

export default productsRouter