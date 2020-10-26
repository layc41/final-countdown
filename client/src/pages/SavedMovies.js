import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
// import Auth from '../utils/auth'
import { REMOVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const SavedMovies = () => {
  const { data } = useQuery(QUERY_ME);
  const username = data?.me.username
  const userSavedMovies = data?.me.savedMovies || [];
  console.log(data)
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
  //     overview: 'Suspicion is on high after Batman, Batgirl, Robin and other DC superheroes receive mysterious invitations. However, family values must remain strong when Batman and his team encounter the villainous Red Hood, who is obsessed with destroying the Bat-family and all of Gotham City.',
  //     movieId: 602307,
  //     posterPath: 'q9vHpzQGzlU1da3crwMLyaTF9zb.jpg',
  //     tagline: '',
  //     title: 'Lego DC Batman: Family Matters',
  //     runtime: 111
  //   },
  // ]
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
  // const handleRemoveMovie = async (movieId) => {
  //   const movieToRemove = searchedMovies.find((movie) => movie.movieId === movieId);
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     await removeMovie({
  //       variables: {
  //         movie: movieToRemove,
  //       },
  //     });
  //     setRemovedMovieIds([...savedMovieIds, movieToRemove.movieId]);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <>
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
                      onClick={() => handleRemoveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been removed!'
                        : 'Deleted this Movie!'}
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