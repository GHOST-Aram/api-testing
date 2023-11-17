import { app } from "./config"
import { router } from "./routes"

app.use('/users', router)


export { app }