import { User } from "./User.model"

export class UsersDAL{

    public getAllUsers = async() =>{
        return await User.find({}, '-password, -__v')
    }
}