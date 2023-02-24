'use strict';
const axios = require('axios');
const MTOKEN = process.env.MOVIE_API_KEY

class Movies {
    constructor(moviesData) {
        this.title = moviesData.original_title
        this.overview = moviesData.overview
        this.vote_average = moviesData.vote_average
        this.vote_count = moviesData.vote_count
        this.image_url = moviesData.image_url
        this.popularity = moviesData.popularity
        this.release_date = moviesData.release_date
    }
}

async function getMovies (request, response) {
    let movies = {
        url: `https://api.themoviedb.org/3/search/movie?api_key=${MTOKEN}&language=en-US&query=${request.query.query}&page=1&include_adult=false`,
        method: `GET`,
    };
    let moviesRes = await axios(movies);
    let results = [];
    moviesRes.data.results.forEach(data => {
        results.push(new Movies(data))
    });
    response.status(200).send(results)
};


module.exports = getMovies