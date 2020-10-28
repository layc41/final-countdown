import gql from 'graphql-tag';

export const QUERY_ME = gql `
{
    me {
        _id
        username
        email
        password
        movieCount
        savedMovies {
            movieId
            overview
            posterPath
            title
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
