import { describe, test, expect } from '@jest/globals'
import express, {Application, NextFunction, Request, Response} from "express"
import request from "supertest"
const app: Application = express()

app.get('/user', (req: Request, res: Response, next: NextFunction) =>{
    const user = {
        name: 'John',
        age: 30,
        height: '5\" 7\''
    }
    res.status(200).json({ user })
})

describe('GET User', () =>{
    test('Responds with json', () =>{
        request(app).get('/user')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
            if (err) throw err
        })
    })

    test('Responds with 200 status code', () =>{
        request(app).get('/user')
            .expect(200)
            .end(function(err, res){
            if (err) throw err
        })
    })

    test('Response data has properties name, age and height', async() =>{
        const response = await request(app).get('/user')
        
        expect(response.body.user).toHaveProperty('name')
        expect(response.body.user).toHaveProperty('age')
        expect(response.body.user).toHaveProperty('height')
    })
})

