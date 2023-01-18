import { Express, Request, Response } from 'express'
import { fetchCase } from '../data/caseFetcher'

export default async (req: Request, res: Response) => {
    console.log(req.params.id)
    try {
        let result = await fetchCase(req.params.id)
        res.send(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}