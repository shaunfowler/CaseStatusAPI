import { parse } from 'node-html-parser'
import { CaseStatus } from './types'

export function getCaseStatusFromHtml(receiptNumber: string, rawHtml: string): CaseStatus {

    let nodes = parse(rawHtml)
    let status = nodes.querySelector('.rows.text-center h1')?.textContent ?? "---"
    let description = nodes.querySelector('.rows.text-center p')?.textContent ?? "---"

    return {
        receiptNumber: receiptNumber,
        status: status,
        description: description
    }
}