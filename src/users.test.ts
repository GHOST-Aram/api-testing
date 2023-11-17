import { app } from "./config";
import request from 'supertest'
import { describe, test, expect } from "@jest/globals";
import { router } from "./routes";

app.use('/users',router)

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