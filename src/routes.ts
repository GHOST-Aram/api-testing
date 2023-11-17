import { Router } from "express";
import { UsersController } from "./controller";

const usersController = new UsersController()
export const router = Router()

router.get('/all', usersController.getUsers)