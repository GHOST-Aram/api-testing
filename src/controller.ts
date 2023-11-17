import { Request, Response } from "express"
import { HydratedUserDoc } from "./User.model"
import { UsersDAL } from "./users.dal"

export class UsersController{
    private dataAccessLayer: UsersDAL

    constructor(dataAccessLayer: UsersDAL){
        this.dataAccessLayer = dataAccessLayer
    }

    public getUsers = async(req: Request, res: Response) =>{

        
        const users:HydratedUserDoc[] = await this.dataAccessLayer.getAllUsers()
        res.status(200).json({ users })
    }

}
