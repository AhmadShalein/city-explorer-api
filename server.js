'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');

const server = express();
server.use(cors());

class Forecast {
    constructor(data,description){
        this.data= data;
        this.description = description;
    }
}

// const PORT = 3010;
const PORT = process.env.PORT;

// http://localhost:3010/
server.get('/', (request, response) => {
    response.send('hello from the home route!')
})

// http://localhost:3010/test
server.get('/test', (request, response) => {
    let test = 'hello from back end';
    response.status(200).send(test);
})

// http://localhost:3010/weather
server.get('/weather', (request, resopnse) => {
    // let weatherLat = req.quiry.lat;
    // let weatherLon = req.quiry.lon;
    // let searchQuery = req.quiry.city_name;

    // let cityItem = weatherData.find (item => {
    //     if (item.city_name == searchQuery)
    //     return 'error'
    // })
    const arrOfDays = [];
    weatherData.data.forEach(item =>{
        let descriptionDay = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        let weatherDay = new Forecast(item.vaild_date,descriptionDay);
        arrOfDays.push(weatherDay);
    });
    resopnse.send(arrOfDays);
});

server.get('*', (request, resopnse) => {
    resopnse.send('not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})