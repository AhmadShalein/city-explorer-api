'use strict';

require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors'); // after you initialize your express server instance
const axios = require('axios');
const { response } = require('express');
// const weatherData = require('./data/weather.json');
const weatherHandle = require('./controller/weather.controller');
const moviesHandle = require('./controller/movies.controller');

const server = express(); // initialize your express server instance
server.use(cors());

const PORT = process.env.PORT || 3030;

server.get('/', (request,response => {
    response.send('Hello from my home route!')
}))

// Our Weather Route
server.get('/weather', weatherHandle);

// Our Movies Route
server.get('/movies', moviesHandle);

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})