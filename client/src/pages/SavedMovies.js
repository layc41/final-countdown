import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth'
import { REMOVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';

const SavedMovies = () => {
  // Get user data to display
  const { data } = useQuery(QUERY_ME);
  // Set the username from user data
  const username = data?.me.username
  // Set the movies they have saved
  const userSavedMovies = data?.me.savedMovies || [];
  const [savedMovieIds, setSavedMovieIds] = useState([]);
  // removeMovie mutation
  const [ removeMovie ] = useMutation(REMOVE_MOVIE);

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

  // Remove Movie from the array and reload the page
  const handleRemoveMovie = async (movieId) => {
    const movieToRemove = userSavedMovies.find((movie) => movie.movieId === movieId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeMovie({
        variables: {
          movieId: movieToRemove.movieId,
        },
      });
      setSavedMovieIds([...savedMovieIds]);
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };
  
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieIds) => savedMovieIds === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleRemoveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been removed!'
                        : 'Delete this Movie!'}
                    </Button>
                  )}
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