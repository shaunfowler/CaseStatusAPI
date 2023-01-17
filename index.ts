import express, { Express, Request, Response } from 'express'
import { fetchCase } from './case-fetcher'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/case/:id', async (req: Request, res: Response) => {
    console.log(req.params.id)
    try {
        let result = await fetchCase(req.params.id)
        res.send(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log("Listening on port", port, "...")
})