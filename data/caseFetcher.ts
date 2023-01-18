import https from 'https'
import { IncomingMessage } from 'http'
import { CaseStatus } from './models'
import { getCaseStatusFromHtml } from './caseStatusHtmlParser'

const options = {
    hostname: 'egov.uscis.gov',
    port: 443,
    path: '/casestatus/mycasestatus.do',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

function fetchCaseRawHtml(receiptNumber: String): Promise<string> {
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

export function fetchCase(receiptNumber: string): Promise<CaseStatus> {
    return new Promise((resolve, reject) => {
        fetchCaseRawHtml(receiptNumber)
            .then((value) => {
                let parsed = getCaseStatusFromHtml(receiptNumber, value)
                resolve({
                    ...parsed,
                    receiptNumber: receiptNumber
                })
            })
            .catch((error) => {
                console.log("rejecting", error)
                reject(error)
            })
    })
}