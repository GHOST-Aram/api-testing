import { HydratedUserDoc, IUser, User } from "./User.model"

export class UsersDAL{

    public async createNewUser(data: IUser){
        const user: HydratedUserDoc = await User.create(data)

        return ({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id
        })
    }

    public async findAllUsers(){
        return await User.find({}, '-password, -__v')
    }

    public async findOneUser(id: string){
        const user:  HydratedUserDoc | null = await User.findById(id)

        return user
    }
}