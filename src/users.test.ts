import { app } from "./config";
import request from 'supertest'
import { describe, test, expect, jest } from "@jest/globals";
import { usersRouter } from "./routes";
import { UsersController } from "./controller";
import { UsersDAL } from "./mocks/users.dal";



const userDal = new UsersDAL()//Mock
const usersController = new UsersController(userDal)

app.use('/users',usersRouter(usersController))

describe("GET Users", () =>{
    test('Responds with Json', (done) =>{
        request(app).get('/users/all')
            .expect('Content-Type', /json/, done)
    })

    test('Responds with 200 status code', (done) => {
        request(app).get('/users/all')
            .expect(200, done)
    })

    test('Responds with users object in the json', async() =>{
        const response = await request(app).get('/users/all')
        expect(response.body).toHaveProperty('users')
    })

    test('Responds with an array of users', async() =>{
        const response = await request(app).get('/users/all')
        expect(Array.isArray(response.body.users)).toBeTruthy()
    })
})