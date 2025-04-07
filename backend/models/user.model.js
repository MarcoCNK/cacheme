import mongoose from 'mongoose'

// SCHEMA, TYPED
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    api_key: {
        type: String,
    },
})

// CLASS, it utilize our shcema
const User = mongoose.model('User', userSchema)

export default User