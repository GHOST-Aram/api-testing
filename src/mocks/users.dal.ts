import { jest } from "@jest/globals"
import {User} from '../User.model'
export class UsersDAL{

    public getAllUsers = jest.fn(async() => {
        const user = new User({
            first_name: 'Jane',
            last_name: 'Doe',
            password: 'Erickpass',
            email: 'johned@gmail.com'
        })
        return [user]
    })

}