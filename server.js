'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const app = express();

const PORT = process.env.PORT;

app.use(cors());

class Forecast {
    constructor(description, date) {
        this.description = description,
        this.date = date
    }
}


app.get('/weather', (request, response) => {
    // response.status(200).send('App is working');
    // console.log(new Forecast());

    // if(request.query.city) {
        let city = weather.find(item => item.city_name.toLowerCase() === request.query.city.toLowerCase()) ;
            try {
                let weatherData = city.data.map(city => 
                new Forecast(city.weather.description, city.valid_date));
                response.status(200).send(weatherData);
            } 
            catch {
                response.status(500).send('City Not Found');
            }
        })

app.listen(PORT, () => {
    console.log('App is running');
});