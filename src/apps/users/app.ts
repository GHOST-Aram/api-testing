import { app } from "./config/config"
import { usersRouter } from "./endpoint/urls"
import { UsersDAL } from "./data-access/users.dal";
import { UsersController } from "./controllers/controller";

const userDal = new UsersDAL()
const usersController = new UsersController(userDal)

app.use('/users', usersRouter(usersController))


export { app }