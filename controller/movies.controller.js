'use strict';

require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors'); // after you initialize your express server instance
const axios = require('axios');
const { response } = require('express');
const Movies = require('../models/movies.model');

const server = express(); // initialize your express server instance
server.use(cors());

let myMemory = {};

const moviesHandle = (request, response) => {
    let cityName = request.query.city;

    if (myMemory[cityName] !== undefined)
    {
      response.send(myMemory[cityName]);
      console.log("get the data from memory!");
    }
    else
    {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`).then(res => {
        const arrOfMovies = [];
        res.data.results.map(item => {
          let imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
          let movieObject = new Movies(item.title, item.overview, item.vote_average, item.vote_count, imageURL, item.popularity, item.release_date);
          arrOfMovies.push(movieObject);
        });
        response.send(arrOfMovies);
        myMemory[cityName] = arrOfMovies;
        console.log("get the data from API");
    })
      .catch(error => {
        response.status(500).send(`Not found ${error}`);
    });
  }
}

module.exports = moviesHandle;