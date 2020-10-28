// import mongoose
const { Schema } = require('mongoose');

// This is a subdocument schema used to populate savedMovies under the User model
const movieSchema = new Schema({
  _id: false,
  overview: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true
  },
  posterPath: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = movieSchema;