# Contents

1. London Underground Lookup API

* 1.1. [Open Endpoints]()
* 1.2. [Authenticated Endpoints]()
* 1.3. [Example JSON Formatted Response]()

2. Example React App Frontend

# London Underground Lookup API

## Server Installation and Start Up

To install the relevant dependencies for the server, nagivate to the `/server/` directory and run `'npm i'`. The following node modules are will be installed:

* body-parser
* cors
* express
* node-fetch
* nodemon (used to automatically restart the `server.js` on save)

The local version of the Express REST API is run by nagivating to the `/server/` directory and running `'npm start'`. This server runs on `localhost:8090`.

ESLint tests are carried out by running `'npm run pretest'` and Jest tests by running `'npm test'`.

* ESLint is run using the `'eslint:recommended'` rules.


## React App Installation and Start Up

To install the relevant dpendencies for the server, navigate to the `/client` directory and, again, run `npm i`. This will install:

* react
* react-dom
* react-scripts
* semantic-ui-css
* semantic-ui-react

The local version of the React App is run by nagivating to /client/ directory and running `npm start`. This is a development React server so will take some time to start up but once this is done, the app can be accessed at `http://localhost:3000` in a browser.

## General Information

The London Underground Lookup API predominantly uses data provided by [Transport for London Unified API](https://tfl.gov.uk/info-for/open-data-users/unified-api)). The London Underground Lookup API makes `GET` requests to this API and produces JSON responses that are then sent to the user.

# Open Endpoints

Note: Open endpoints do not require authentication.

* [Get Lines]() : `GET /lines`
    * `Success: HTTP 200 (OK)`
    * `Failure: HTTP 400 (Bad Request)`
    * This endpoint handles GET request requesting a list of tube lines. It returns some basic information about all the lines. Note: this endpoint does not yield a HTTP status code of 404 as there is no user input.

* [Get Specific Line]() : `GET /lines/:name`
    * `Success: HTTP 200 (OK)`
    * `Failure: HTTP 404 (Not Found)`
    * `Failure: HTTP 400 (Bad Request)`
    * This endpoint handles GET requests that search for a specific tube line (e.g. Victoria, Jubilee etc). It returns the line that corresponds to `name`. This endpoint returns both the information from the external TfL Unified API and local data about the rating of that specific line. It returns an HTTP 400 when the request is incorrectly formed or the TfL Unified external API is down. 

* [Get Station]() : `GET /stations/:name`
    * `Success: HTTP 200 (OK)`
    * `Failure: HTTP 404 (Not Found)`
    * `Failure: HTTP 400 (Bad Request)`
    * This endpoint handles GET requests that search for stations on the London Underground. It returns all the stations that contain the query in their name, in alphabetical order. This endpoint returns an HTTP 400 when the request is incorrectly formed or the TfL Unified external API is down. 


# Authenticated Endpoints

Due to the nature of the API, there is little need for authentication because the rationale behind it is to quickly and easily provide information to the client without needing to signing in. I have, however, implemented one authenticated endpoint as a proof of concept and as a demonstration of how the scopes of both the API and client could be broadened in the future.

The purpose of the following endpoint is only to allow people with the password (`test`) to change the rating that is displayed in the Lines tab in the React App.


* [Add Rating]() : `POST /lines/:name`

    * `Success: HTTP 201 (Created)` 
    * `Failure: HTTP 401 (Unauthorised)`
    * `Failure: HTTP 404 (Not Found)`
    * This endpoint handles POST requests to change the rating of a line. If the user doesn't input the corret password (`test`), it returns an HTTP 401. If the specific line can't be found or if any other errors occur, it return HTTP 404.

## Example JSON formatted response:

```json
[
    [
        {
            "$type":"Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities","id":"victoria",
            "name":"Victoria",
            "modeName":"tube",
            "disruptions":[],
            "created":"2019-04-30T12:55:41.023Z",
            "modified":"2019-04-30T12:55:41.023Z",
            "lineStatuses":[
                {
                    "$type":"Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
                    "id":0,
                    "statusSeverity":10,
                    "statusSeverityDescription":"Good Service",
                    "created":"0001-01-01T00:00:00",
                    "validityPeriods":[]
                }
            ],
            "routeSections":[],
            "serviceTypes":[
                {
                    "$type":"Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name":"Regular",
                    "uri":"/Line/Route?ids=Victoria&serviceTypes=Regular"
                },
                {
                    "$type":"Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name":"Night",
                    "uri":"/Line/Route?ids=Victoria&serviceTypes=Night"
                }
            ],
            "crowding":{"$type":"Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"}
        }
    ]
,0]
```

# Example React App Frontend

The example website uses React, a user-interface library for JavaScript. This is why there is a `components` folder.

There are two tabs in the menu at the top of the page: Lines and Stations.
* Lines:
    * This tab allows the user to view information about the 13 tube, DLR and overground lines that operate in London. This does not include the Elizabeth Line (Crossrail).
    * The colours on the left-hand side provide a visual aid to quickly identify a line and correlate exactly to the colours used by TfL on all maps and signage across the network, in accordance with their [colour standards](http://content.tfl.gov.uk/tfl-colour-standards-issue04.pdf).
    * The Line Mode simply relays information from the TfL API.
    * The Line Status Code is used in conjunction with the Line Status to signify lines that are have disruptions or reduced service. The cells change colour from green to red to indicate atypical content.
    * Finally, the Rating on the right-hand side displays the rating of a line and can be changed by any users with the correct password.
    * Note: In order to see the variety in data in this table, it is worth loading the page at several different times (e.g. morning/evening rush hour and late at night).
* Stations:
    * This tab allows the user to search for stations on the network using thev search bar in the top right corner. 
    * The roundel on each card represents the main mode (e.g. overground, tube or DLR) that is used at that station. HOWEVER, I have noticed that the data provided by the TfL API is inconsistent with other resources also provided by TfL (perhaps due to ongoing station alterations resulting from Crossrail construction). As such, it is worth considering these roundels as aesthetic.
    * Each card also displays in which Zone each station is located (sometimes on the border), as well as the latitude and longitude of the station.
    * Finally, at the bottom of each card, there is a link to the Google Maps entry for each station.

