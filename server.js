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

app.get('/weather', weatherHandler);

app.get('/movies', movieHandler);

function weatherHandler(request, response) {
    const { lat, lon } = request.query;
    getWeather(lat, lon)
        .then(summaries => response.send(summaries))
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}

function movieHandler(request, response) {
    const { query } = request.query;
    getMovies(query)
        .then(summaries => response.send(summaries))
        .catch((error) => {
            console.error(error);
            response.status(200).send('Sorry. Something went wrong!')
        });
}



app.listen(PORT, () => {
    console.log('App is running');
});