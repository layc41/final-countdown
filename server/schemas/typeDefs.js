// import gql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    _id: ID
    movieId: Int
    overview: String
    posterPath: String
    title: String
  }
  type Favorite {
    _id: ID
    movieId: Int
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
    user(username: String!): User
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
    movieId: Int
    overview: String
    posterPath: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;