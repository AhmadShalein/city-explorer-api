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
server.get('/', (req, res) => {
    res.send('hello from the home route!')
})

// http://localhost:3010/test
server.get('/test', (req, res) => {
    let test = 'hello to the Back End';
    res.status(200).send(test);
})

// http://localhost:3010/weather
server.get('/weather', (req, res) => {
    
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;
  
    if (lat == weatherData.lat && lon == weatherData.lon && searchQuery == weatherData.city_name) {
        resopnse.send(weatherData.data);
    } else {
        resopnse.send("Error, this city not found");
    }

    const arrOfDays = [];
    weatherData.data.forEach(item =>{
        let descriptionDay = `Low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
        let weatherDay = new Forecast(item.vaild_date,descriptionDay);
        arrOfDays.push(weatherDay);
    });
    res.send(arrOfDays);
})

server.get('*', (req, res) => {
    res.send('not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
