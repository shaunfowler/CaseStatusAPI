import { parse, HTMLElement } from 'node-html-parser'
import { CaseStatus } from './models'

export function getCaseStatusFromHtml(receiptNumber: string, rawHtml: string): CaseStatus {

    let nodes = parse(rawHtml)
    let status = extractStatus(nodes)
    let description = extractDescription(nodes)
    
    if (!status || !description) {
        throw new Error("Could not parse status and/or description")
    }

    let date = extractDate(description)
    let formType = extractFormType(description)

    return {
        receiptNumber: receiptNumber,
        status,
        description,
        date,
        formType
    }
}

function extractStatus(nodes: HTMLElement): string | null | undefined {
    return nodes.querySelector('.rows.text-center h1')?.textContent
}

function extractDescription(nodes: HTMLElement): string | null | undefined {
    return nodes.querySelector('.rows.text-center p')?.textContent
}

function extractDate(description: string): string | undefined {
    const matcher = /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/
    return matcher.exec(description)?.[0]
}

function extractFormType(description: string): string | undefined {
    const matcher = /(I-|N-)\d{2,4}\w{0,2}/
    return matcher.exec(description)?.[0]
}