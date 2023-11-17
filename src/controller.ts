import { Request, Response } from "express"

export class UsersController{
    // private dataAccessLayer: any

    // constructor(dataAccessLayer: any){
    //     this.dataAccessLayer = dataAccessLayer
    // }

    public getUsers = (req: Request, res: Response) =>{
        const users:[] = []
        res.status(200).json({ users })
    }

}
