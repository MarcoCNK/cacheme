import User from '../models/user.model.js'
import generateRandomString from './generateRandomString.js';

const createUsers = async () => { 
    try {

        const users = [
           {
            name: "hacker",
            password: "kali",
            api_key: `${generateRandomString(16)-generateRandomString(16)}`
           },
           {
                name: "pepe",
                password: `${generateRandomString(10)}`,
                api_key: `${generateRandomString(16)-generateRandomString(16)}`
           }
        ];
        
        await User.insertMany(users);
        console.log("Products seeded");
    } catch (err){
        console.log("An error when we were seed has happened: ",err)
    }
}

export default createUsers