'use strict';
const axios = require('axios');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./lib/weather');
const getMovies = require('./lib/movies');
const app = express();


const PORT = process.env.PORT;

app.use(cors());

app.get('/weather', getWeather);

app.get('/movies', getMovies);


app.listen(PORT, () => {
    console.log('App is running');
});