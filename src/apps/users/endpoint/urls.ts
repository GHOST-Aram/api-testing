import { Router } from "express";
import { UsersController } from "../controllers/controller";

const  router = Router()

const usersRouter = (controller: UsersController) =>{
    router.get('/all', controller.getUsers)
    router.get('/:id', controller.getOneUser)
    router.post('/new', controller.addNewUSer)
    return router
}

export { usersRouter }
