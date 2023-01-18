import { Request, Response } from 'express'
import { fetchCase } from '../data/caseFetcher'
import cache from 'memory-cache'

export default async (req: Request, res: Response) => {
    let receiptNumber = req.params.id
    try {
        let cached = cache.get(receiptNumber)
        if (!cached) {
            console.log('not cached', receiptNumber)
            let result = await fetchCase(receiptNumber)
            cache.put(receiptNumber, result, 60000)
            res.send(result)
        } else {
            console.log('cached', receiptNumber)
            res.send(cached)
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}