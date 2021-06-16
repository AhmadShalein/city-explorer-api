'use strict';

require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors'); // after you initialize your express server instance
const axios = require('axios');
const { response } = require('express');
// const weatherData = require('./data/weather.json');

const server = express(); // initialize your express server instance
server.use(cors());

class Forecast {
    constructor(data,description){
        this.data= data;
        this.description = description;
    }
}

class Movie {
    constructor(title, overview, averageVotes, totalVotes, imgUrl, popularity, releasedOn){
        this.title=title;
        this.overview=overview;
        this.average_votes=averageVotes;
        this.total_votes = totalVotes;
        this.image_url=imgUrl;
        this.popularity=popularity;
        this.released_on=releasedOn;
    }
}

// const PORT = 3010;
const PORT = process.env.PORT || 3030;

// http://localhost:3010/
server.get('/', (request, response) => {
    response.send('Hello to the home route!')
})

// http://localhost:3010/test
server.get('/test', (request, response) => {
    let test = 'hello from back end';
    response.status(200).send(test);
})

// http://localhost:3010/weather
server.get('/weather', (request, resopnse) => {
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
});

// http://localhost:3010/movies
server.get('/movies', (request,resopnse) => {
    let cityName = request.query.city;
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`).then(response => {
        const arrOfMovies = [];
        response.data.results.map(item => {
          let imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          let movieObject = new Movie(item.title, item.overview, item.vote_average, item.vote_count, imageURL, item.popularity, item.release_date);
          arrOfMovies.push(movieObject);
        });
        resopnse.send(arrOfMovies);
      })
      .catch(error => {
        resopnse.status(500).send(`Not found ${error}`);
      });
  });

server.get('*', (request, resopnse) => {
    resopnse.status(404).send('page not found');
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})