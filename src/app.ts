import { app } from "./config"
import { usersRouter } from "./routes"
import { UsersDAL } from "./users.dal";
import { UsersController } from "./controller";

const userDal = new UsersDAL()
const usersController = new UsersController(userDal)

app.use('/users', usersRouter(usersController))


export { app }