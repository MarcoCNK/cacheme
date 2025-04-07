import User from "../models/user.model.js"

class UserRepository {
    static async register( new_user_object ) {
        const new_user = new User(new_user_object)
        return await new_user.save()
    }

    static async getByName (name){
        return User.findOne(name)
    }

}

export default UserRepository