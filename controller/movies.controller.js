'use strict';

require('dotenv').config();
const express = require('express'); // require the express package
const cors = require('cors'); // after you initialize your express server instance
const axios = require('axios');
const { response } = require('express');
const Movies = require('../models/movies.model');

const server = express(); // initialize your express server instance
server.use(cors());

const moviesHandle = (request, response) => {
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
}

module.exports = moviesHandle;