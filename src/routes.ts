import { Router } from "express";
import { UsersController } from "./controller";

const  router = Router()

const usersRouter = (controller: UsersController) =>{
    router.get('/all', controller.getUsers)

    return router
}

export { usersRouter }
