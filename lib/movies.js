'use strict';
const axios = require('axios');
const MTOKEN = process.env.MOVIE_API_KEY

let cache = require('./cache')

class Movies {
    constructor(moviesData) {
        this.title = moviesData.original_title
        this.overview = moviesData.overview
        this.vote_average = moviesData.vote_average
        this.vote_count = moviesData.vote_count
        this.image_url = moviesData.poster_path
        this.popularity = moviesData.popularity
        this.release_date = moviesData.release_date
    }
}

function getMovies(query) {
    const key = 'movie-' + query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${MTOKEN}&language=en-US&query=${query}&page=1&include_adult=false`;
  
    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(response => parseMovies(response.data));
    }

    return cache[key].data;
}

function parseMovies(moviesData) {
    try {
        // console.log(moviesData);
        let results = [];
        moviesData.results.map(item => {
        results.push(new Movies(item));
      });
      return Promise.resolve(results);
    } catch (e) {
      return Promise.reject(e);
    }
  }

// async function getMovies (request, response) {
//     let movies = {
//         url: `https://api.themoviedb.org/3/search/movie?api_key=${MTOKEN}&language=en-US&query=${request.query.query}&page=1&include_adult=false`,
//         method: `GET`,
//     };
//     let moviesRes = await axios(movies);
//     let results = [];
//     moviesRes.data.results.forEach(data => {
//         results.push(new Movies(data))
//     });
//     response.status(200).send(results)
// };


module.exports = getMovies