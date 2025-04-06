import dotenv from 'dotenv'

// EXECUTE THIS SHIT
// node ./src/config/environment.js
dotenv.config()

console.log(process.env.MYSQL_PASSWORD)
const ENVIRONMENT = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
}

export default ENVIRONMENT