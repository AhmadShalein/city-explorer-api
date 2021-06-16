'use strict';

require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors'); // after you initialize your express server instance
const axios = require('axios');
const { response } = require('express');
// const weatherData = require('./data/weather.json');

const server = express(); // initialize your express server instance
server.use(cors());

const PORT = process.env.PORT || 3030;

// Our Index Route
server.get('/', indexController);

// Our Test Route
server.get('/test', testController);

// Our Weather Route
server.get('/weather', weatherHandle);

// Our Movies Route
server.get('/movies', moviesHandle);

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})