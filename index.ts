import express, { Express, Request, Response } from 'express'
import caseStatusRoute from './routes/caseStatus'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter'

dotenv.config()
const app: Express = express()
const port = process.env.PORT

app.use(rateLimiter)

app.get('/case/:id', caseStatusRoute)

app.listen(port)