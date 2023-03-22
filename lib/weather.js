'use strict';
const axios = require('axios');
const TOKEN = process.env.WEATHER_API_KEY

let cache = require('./cache.js');

class Forecast {
    constructor(weatherData) {
        this.description = weatherData.weather.description,
        this.date = weatherData.valid_date
        this.min_temp = weatherData.min_temp
        this.max_temp = weatherData.max_temp
        this.image = weatherData.weather.icon
    }
}

function getWeather(lat, lon) {
    const key = 'weather-' + lat + lon;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${TOKEN}&days=7`;
    console.log('***', cache[key]);
    if (cache[key] && (Date.now() - cache[key].timestamp < 500000)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(response => parseWeather(response.data));
    }
    return cache[key].data;
  }

  function parseWeather(weatherData) {
    // console.log(weatherData)
    try {
        let results = []
        weatherData.data.map(item => {
        results.push(new Forecast(item));
        // console.log(results);
      });
      return Promise.resolve(results);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  
module.exports = getWeather
