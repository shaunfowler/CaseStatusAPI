# CaseStatusAPI

## About

A convenience API that proxies requests to https://egov.uscis.gov/casestatus/mycasestatus.do via a POST request for a given receipt number and returns the case status in JSON format.

Example request: 

```
curl 'http://localhost:3000/case/LIN2119051062'
```

Example response:
```
{
    receiptNumber: "LIN2119051062",
    status: "Case Was Approved",
    description: "On September 29, 2021, we approved your Form I-539, Application To Extend/Change Nonimmigrant Status, Receipt Number LIN2119051062.  We sent you an approval notice [...]",
date: "September 29, 2021",
    formType: "I-539"
}
```

## Build & Run

```
docker build . -t case-status-api
docker run -d -p 3000:3000 case-status-api
```