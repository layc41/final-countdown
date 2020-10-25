import { useQuery } from '@apollo/react-hooks';
// import { Token } from 'graphql';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
// import { getMe } from '../utils/API';
// import Auth from '../utils/auth'
import { REMOVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const SavedMovies = () => {
  const { data } = useQuery(QUERY_ME);
  // const token = Auth.getToken();
  // console.log(token)
  // const data = getMe(token)
  // const username = data.me;

  const username = 'Tester'
  const userSavedMovies = data?.savedMovies || [];
  // const userSavedMovies = [
  //   {
  //     homepage: '',
  //     overview: 'In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.',
  //     movieId: 447404,
  //     posterPath: 'wgQ7APnFpf1TuviKHXeEe3KnsTV.jpg',
  //     tagline: '',
  //     title: 'Pokémon Detective Pikachu',
  //     runtime: 1231
  //   },
  //   {
  //     homepage: '',
  //     overview: 'In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.',
  //     movieId: 447404,
  //     posterPath: 'wgQ7APnFpf1TuviKHXeEe3KnsTV.jpg',
  //     tagline: '',
  //     title: 'Pokémon Detective Pikachu',
  //     runtime: 1231
  //   },
  // ]

  console.log('data', data)
  console.log(userSavedMovies)

  // const handleFavMovie = async => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //         return false;
  //       }
  //     try {
  //       const response = await getMe(token);
  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }
  //       const { results } = await response.json();
  //       const movieData = results.map((movie) => ({
  //         movieId: movie.id,
  //         title: movie.title,
  //         description: movie.overview,
  //         image: movie.poster_path || '',
  //       }));
  //       setSearchedMovies(movieData);
  //       setSearchInput('');
  //     } catch (err) {
  //     console.error(err);
  //   }
  // };
  // const handleSaveMovie = async (movieId) => {
  //   const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     await saveMovie({
  //       variables: {
  //         movie: movieToSave,
  //       },
  //     });
  //     setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <>
      {/* <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for a Movie!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron> */}
      <Container>
        <h2>
          {userSavedMovies.length
            ? `Viewing ${username}'s saved movies:`
            : `${username}: you have no saved movies`}
        </h2>
        <CardColumns>
          {userSavedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.posterPath ? (
                  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.posterPath}`} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieIds) => savedMovieIds === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this Movie!'}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default SavedMovies;