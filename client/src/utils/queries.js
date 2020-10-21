const { gql } = require('apollo-server-express');

export const QUERY_MR = gql `
{
    me {
        _id
        username
        email
        password
        movieCount
        savedMovies {
            _id
            movieId
            homepage
            overview
            posterPath
            tagline
            title
            runtime
        }
        favoriteCount
        favorites {
            _id
            movieId
            homepage
            overview
            posterPath
            tagline
            title
            runtime
        }
    }
}`