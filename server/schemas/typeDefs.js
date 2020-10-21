// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    _id: ID
    movieId: String
    homepage: String
    overview: String
    posterPath: String
    tagline: String
    title: String
    runtime: Int
  }

  type Favorite {
    _id: ID
    movieId: String
    homepage: String
    overview: String
    posterPath: String
    tagline: String
    title: String
    runtime: Int
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    movieCount: Int
    savedMovies: [Movie]
    favoriteCount: Int
    favorites: [Favorite]
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movie: saveMovieInput): User
    addFavorite(movie: saveMovieInput): User
    removeMovie(movieId: Int!): User
    removeFavorite(moveId: Int!): User
  }

  input saveMovieInput {
    movieId: String
    homepage: String
    overview: String
    posterPath: String
    tagline: String
    title: String
    runtime: Int
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;