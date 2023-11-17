import { NextFunction, Request, Response } from "express"
import { HydratedUserDoc } from "../model/User.model"
import { UsersDAL } from "../data-access/users.dal"

export class UsersController{
    private dataAccessLayer: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        this.dataAccessLayer = dataAccessLayer
    }

    public addNewUSer = async(req: Request, res: Response, next: NextFunction) =>{
        const { first_name, last_name, email, password } = req.body
        try {
            const user = await this.dataAccessLayer.createNewUser({
                first_name, last_name, email, password
            })

            res.status(201).json({ user })
        } catch (error) {
            next(error)
        }
    }

    public getUsers = async(
        req: Request, res: Response, next: NextFunction
    ) =>{
        try {
            const users:HydratedUserDoc[] = await this.dataAccessLayer
            .findAllUsers()
    
            res.status(200).json({ users })
        } catch (error) {
            next(error)
        }
    }

    public getOneUser = async(
        req: Request, res: Response, next: NextFunction
    ) =>{
        const {id} = req.params

        try {
            const user: HydratedUserDoc | null = await this.dataAccessLayer
            .findOneUser(id) 
    
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }

}
