import UserRepository from "../repositories/user.repository.js"
import ResponseBuilder from "../utils/response.builder.js"
import Joi from "joi"
import ENVIRONMENT from "../config/environment.js"
import jwt from "jsonwebtoken"

export const loginController = async (req, res, next) => {
    try {
        const loginSchema = Joi.object({
            name: Joi.string().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = loginSchema.validate(req.body)

        const user = await UserRepository.getByName({ name: value.name })

        if (!user) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`You are not registered`)
                .setPayload({
                    detail: "You are not registered"
                })
                .build()
                await console.log(typeof user)
            return res.status(400).json({ response })
        }


        const isValidPassword = value.password === user.password

        
        if (!isValidPassword) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Invalid credentials`)
                .setPayload({
                    detail: "Bad credentials",
                })
                .build()
            return res.json({ response })
        }
        
        const access_token = jwt.sign({
            user_id: user._id,
            name: user.name,
            role: user.role
        },
        process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            })

        const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Succes`)
            .setPayload({
                detail: "Succes",
                access_token: access_token
            })
            .build()
        return res.status(200).json({ response })

    } catch (err) {
        console.error(err)
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`An error has ocurred`)
            .setPayload({
                detail: err.message
            })
            .build()
        return res.status(500).json({ response })
    }

}

export const profileController = async (req, res, next) => {
    res.set({
        'Content-Type': 'application/json',
        'Content-Length': '123',
        'Cache-Control': 'private, max-age=0',
      }) 
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]

    const userData = jwt.decode(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error(err)
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`An error has ocurred`)
            .setPayload({
                detail: err.message
            })
            .build()
        return res.status(500).json({ response })
        }
    })

    const user = await UserRepository.getByName({ name: userData.name })


    const response = new ResponseBuilder()
            .setOk(true)
            .setStatus(200)
            .setMessage(`Succes`)
            .setPayload({
                detail: "Succes",
                api_key: user.api_key
            })
            .build()
    return res.status(200).json({ response })
}