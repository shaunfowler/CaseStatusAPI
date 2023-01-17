import https from 'https'
import { IncomingMessage } from 'http'


const options = {
    hostname: 'egov.uscis.gov',
    port: 443,
    path: '/casestatus/mycasestatus.do',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export function fetchCaseRawHtml(receiptNumber: String): Promise<string> {
    return new Promise((resolve, reject) => {
        let request = https.request(options, (res: IncomingMessage) => {
            let buffer: Buffer
            console.log("requesting...")
    
            res.on('error', (error) => {
                console.log(error)
                reject(error)
            })
            res.on('data', (data) => {
                buffer += data
            })
            res.on('end', () => {
                let response = buffer.toString('utf8')
                resolve(response)
            })
        })
    
        request.on('error', (error) => {
            console.log(error)
        })
    
        request.write(`appReceiptNum=${receiptNumber}`)
        request.end()
    })
}

type CaseStatus = {
    receiptNumber: string
    status: string
    description: string
}

export function fetchCase(receiptNumber: string): Promise<CaseStatus> {

    return new Promise((resolve, reject) => {
        fetchCaseRawHtml(receiptNumber)
            .then((value) => {
                resolve({
                    receiptNumber: receiptNumber,
                    status: "ok",
                    description: "something"
                })
            })
            .catch((error) => {
                reject(error)
            })
    })
}