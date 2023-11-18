import { jest } from "@jest/globals"
import { HydratedUserDoc, IUser } from "../../model/User.model"
import { User } from '../../model/User.model'

export class UsersDAL{
    public createNewUser = jest.fn(async(data: IUser) => {
        const user: HydratedUserDoc = new User(data)

        return (
            {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                id: user.id
            }
        )
    })

    public findAllUsers = jest.fn(async() => {
        const user = new User({
            first_name: 'Jane',
            last_name: 'Doe',
            password: 'Erickpass',
            email: 'johned@gmail.com'
        })
        return [user]
    })

    public findOneUser = jest.fn(async() =>{
        const user = new User({
            first_name: 'Jane',
            last_name: 'Doe',
            password: 'Erickpass',
            email: 'johned@gmail.com'
        })

        return user
    })

}