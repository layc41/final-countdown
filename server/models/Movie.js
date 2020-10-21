// import mongoose
const { Schema } = require('mongoose');

// This is a subdocument schema used to populate savedMovies under the User model
const movieSchema = new Schema({
  homepage: {
      type: String
  },
  overview: {
    type: String,
    required: true,
  },
  movieId: {
    type: Int,
    required: true,
  },
  posterPath: {
    type: String,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  runtime: {
    type: Int,
    required: true
  }
});

module.exports = movieSchema;