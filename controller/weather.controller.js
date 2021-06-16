'use strict';

require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors'); // after you initialize your express server instance
const axios = require('axios');
const { response } = require('express');
const Weather = require('../models/weather.model');

const server = express(); // initialize your express server instance
server.use(cors());

const weatherHandle = (request, response) => {
    let lat = request.quiry.lat;
    let lon = request.quiry.lon;
    // let searchQuery = req.quiry.city_name;
    // let cityItem = weatherData.find (item => item.lat == lat && item.lon == lon && item.city_name.toLowerCase() == searchQuery.toLowerCase());
    // if (item != undefined)
    // {    
    //     const weatherArray = item.weatherData.map(day => new Forecast(data,description));
    //     response.status(200).send(weatherArray);
    // }
    // else
    // {
    //     response.status(500).send('something went wrong');
    // }
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`).then(response => {
        const arrOfDays = [];
        response.data.data.map(item => {
        let descriptionDay = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        let weatherDay = new Forecast(item.vaild_date,descriptionDay);
        arrOfDays.push(weatherDay);
    });
    resopnse.send(arrOfDays);
    })
    .catch(error => {
        resopnse.status(500).send(`Not found ${error}`);
    });
}

module.exports = weatherHandle;