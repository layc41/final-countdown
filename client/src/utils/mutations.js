import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
mutation saveMovie($movie: saveMovieInput) {
  saveMovie(movie: $movie) {
    username
    savedMovies {
      movieId
      overview
      posterPath
      title
    }
  }
}
`;

export const ADD_FAVORITE = gql`
 mutation addFavorite($movie: saveMovieInput) {
    addFavorite(movie: $movie) {
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
    }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: Int!) {
    removeMovie(movieId: $movieId) {
      username
      savedMovies {
        movieId
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($movieId: Int!) {
    removeFavorite(movieId: $movieId) {
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
    }
`;