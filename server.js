'use strict';
const axios = require('axios');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();


const PORT = process.env.PORT;
const TOKEN = process.env.WEATHER_API_KEY
const MTOKEN = process.env.MOVIE_API_KEY

app.use(cors());

class Forecast {
    constructor(description, date) {
        this.description = description,
        this.date = date
    }
}


app.get('/weather', async (request, response) => {

        if(request.query.lat) {
            let proxy = {
                url: `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${TOKEN}`,
                method: 'GET',
            };
            let proxyRes =  await axios(proxy)
            response.status(200).send(proxyRes.data);
        }
        });

app.get('/movies', async(request, response) => {
    let movies = {
        url: `https://api.themoviedb.org/3/search/movie?api_key=${MTOKEN}&language=en-US&query=${request.query.query}&page=1&include_adult=false`,
        method: `GET`,
    }
    let moviesRes = await axios(movies)
    response.status(200).send(moviesRes.data)
});


app.listen(PORT, () => {
    console.log('App is running');
});