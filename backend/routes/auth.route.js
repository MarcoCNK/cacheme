import express from 'express'
import cors from 'cors'
import authMiddleware from '../middlewares/auth.middleware.js'
import { loginController, profileController } from '../controllers/auth.controlles.js'
import corsOptions from '../utils/corsOptions.js'

const authRouter = express.Router()

authRouter.post('/login', loginController)
authRouter.options('/login', cors(corsOptions))

authRouter.get('/profile', authMiddleware(),  profileController)
authRouter.options('/profile', cors(corsOptions))

export default authRouter