'use strict';
const axios = require('axios');

const TOKEN = process.env.WEATHER_API_KEY

class Forecast {
    constructor(weatherData) {
        this.description = weatherData.weather.description,
        this.date = weatherData.valid_date
        this.min_temp = weatherData.min_temp
        this.max_temp = weatherData.max_temp
    }
}

async function getWeather (request, response) {

    let proxy = {
        url: `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${TOKEN}`,
        method: 'GET',
    };
    let proxyRes = await axios(proxy);
    console.log(proxyRes.data)
    let results = [];
    proxyRes.data.data.forEach(item => {
        results.push(new Forecast(item))
        console.log(item)
    })
    console.log(results)
    response.status(200).send(results);

};

module.exports = getWeather
