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

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
      }
    }
  }
`;