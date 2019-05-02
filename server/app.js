/* eslint no-console: ["error", { allow: ["warn", "error"] }], eqeqeq: 0 */

// Imports relevant dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

// Creates an instance of an express server.
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const ratings = {
  bakerloo: 0,
  central: 0,
  circle: 0,
  district: 0,
  dlr: 0,
  'hammersmith-city': 0,
  jubilee: 0,
  'london-overground': 0,
  metropolitan: 0,
  northern: 0,
  piccadilly: 0,
  victoria: 0,
  'waterloo-city': 0,
};

const appId = 'b5586b71';
const appKey = '260925c1f841456dc716922c57403035';

// Endpoints

// Handles GET request requesting information (e.g. status) about a specific line
app.get('/lines/:name', async (req, res) => {
  const url = `https://api.tfl.gov.uk/Line/${
    req.params.name
  }/Status?appId=${appId}&appKey=${appKey}`;
  try {
    const fetchResponse = await fetch(url);
    const responseJSON = await fetchResponse.json();
    if (responseJSON.httpStatusCode === 404) {
      // not found (invalid line id)
      res.status(404).send();
    } else {
      // success
      res.status(200).send([responseJSON, ratings[req.params.name]]);
    }
  } catch (err) {
    console.error(err);
    // bad request
    res.status(400).send();
  }
});

// Handles GET request requesting a list of lines
app.get('/lines', async (req, res) => {
  const url = `https://api.tfl.gov.uk/Line/Mode/tube%2Cdlr%2Coverground?appId=${appId}&appKey=${appKey}`;
  try {
    const fetchResponse = await fetch(url);
    const responseJSON = await fetchResponse.json();
    // success
    res.status(200).send(responseJSON);
  } catch (err) {
    console.error(err);
    // bad request
    res.status(400).send();
  }
});

// Handles GET request searching for a station
app.get('/stations/:name', async (req, res) => {
  const url = `https://api.tfl.gov.uk/StopPoint/Search/${
    req.params.name
  }?appId=${appId}&appKey=${appKey}`;
  try {
    const fetchResponse = await fetch(url);
    const responseJSON = await fetchResponse.json();
    if (responseJSON.total === 0) {
      res.status(404).send(responseJSON);
    } else {
      res.status(200).send(responseJSON);
    }
  } catch (err) {
    console.error(err);
    // bad request
    res.status(400).send();
  }
});

// Handles POST request containing a rating of a line
app.post('/lines/:name', async (req, res) => {
  if (req.body.password === 'test') {
    try {
      // console.log(req.params.name);
      const { rating } = req.body;
      const line = req.params.name;
      // console.log(`got post request with rating of ${rating}`);
      if (rating >= 0 && rating <= 5) {
        ratings[`${line}`] = rating;
      }
      // new content created
      res.status(201).send();
    } catch(err) {
      // not found
      res.status(404).send();
    }
  } else {
    // unauthorised
    res.status(401).send();
  }
});

module.exports = app;
