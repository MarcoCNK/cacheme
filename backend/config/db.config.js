import mongoose from 'mongoose'
import createUsers from '../scripts/seedMongod.js'
import User from '../models/user.model.js'
import ENVIRONMENT from './environment.js'

const MONGO_URL = `${process.env.MONGO_URL}`
console.log(MONGO_URL)

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log("Database connected");

    // Seed products if not already seeded
    const productCount = await User.countDocuments();
    if (productCount === 0) {
      await createUsers();
    } else {
      console.log("Products already exist. Skipping seeding.");
    }

    console.log("Server setup complete.");
})
.catch((err) => {
    console.error('Database connection error:', err)
})

export default mongoose