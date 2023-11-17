import { app } from "../config/config";
import request from 'supertest'
import { describe, test, expect } from "@jest/globals";
import { usersRouter } from "../endpoint/urls";
import { UsersController } from "../controllers/controller";
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

describe('GET One User', () =>{
    test('User route responds with json', async() =>{
        const response = await request(app).get('/users/67467238jhfd')
        expect(response.headers['content-type']).toMatch(/JSON/i)
    })

    test('Response body has user data', async() =>{
        const response = await request(app).get('/users/67467238jhfd')
        expect(response.body).toHaveProperty('user')
    })
    test('User has a first and last name, and email property', 
    async() =>{
        const response = await request(app).get('/users/67467238jhfd')
        expect(response.body.user).toHaveProperty('first_name')
        expect(response.body.user).toHaveProperty('last_name')
        expect(response.body.user).toHaveProperty('email')
    })
})

describe('POST \'/user\'', () =>{
    test('Responds with 201 status code', async() =>{
        const response = await request(app).post('/users/new')
            .send({ 
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'johnDoe'
            })
        expect(response.status).toEqual(201)
    })

    test('Responds with JSON content', async() =>{
        const response = await request(app).post('/users/new')
            .send({ 
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'johnDoe'
            })
        expect(response.headers['content-type']).toMatch(/json/)
    })

    test('Responds with a json payload of user data', async() =>{
        const response = await request(app).post('/users/new')
            .send({ 
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'johnDoe'
            })
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('id')
        expect(response.body.user).toHaveProperty('first_name')
        expect(response.body.user).toHaveProperty('email')
        expect(response.body.user).not.toHaveProperty('password')
        expect(response.body.user).not.toHaveProperty('__v')
    })
})