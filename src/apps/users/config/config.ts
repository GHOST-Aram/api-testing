import express, { Application } from 'express'
import morgan from 'morgan'

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

export {app}