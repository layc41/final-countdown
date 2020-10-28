import { useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth'
import { ADD_FAVORITE, REMOVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';
import { getMe } from '../utils/API'
=======
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, CardGroup, Row } from 'react-bootstrap';
import Auth from '../utils/auth'
import { REMOVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';
>>>>>>> develop

const SavedMovies = () => {
  // Get user data to display
  const { data } = useQuery(QUERY_ME);
  // Set the username from user data
  const username = data?.me.username
  // Set the movies they have saved
  const userSavedMovies = data?.me.savedMovies || [];
  const [savedMovieIds, setSavedMovieIds] = useState([]);
<<<<<<< HEAD

  // removeMovie mutation
  const [ removeMovie ] = useMutation(REMOVE_MOVIE);
  
  // const [ addFavorite ] = useMutation(ADD_FAVORITE)
  // const [favMovieIds, setFavMovieIds] = useState([]);

  // const handleFavMovie = async (movieId) => {
  //   const movieToFav = userSavedMovies.find((movie) => movie.movieId === movieId);
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;
  //   if (!token) {
  //     return false;
  //   }
  //   try {
  //     await addFavorite({
  //       variables: {
  //         movieId: movieToRemove.movieId,
  //       },
  //     });
  //     setSavedMovieIds([...savedMovieIds]);
  //   } catch (err) {
=======
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
>>>>>>> develop
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
<<<<<<< HEAD
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
=======
       
          {userSavedMovies.map((movie) => {
            return (
              <CardGroup>
              <Row>
                <Col>
                <Card key={movie.movieId} border='dark'>
                
                <Card.Title className='text-center'>{movie.title}</Card.Title>
                <Card.Body className='d-flex justify-content-center'>
                {movie.posterPath ? (
                  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.posterPath}`} alt={`The cover for ${movie.title}`} variant='center' />
                ) : null}
                  
                  {/* <Card.Text>{movie.overview}</Card.Text> */}
>>>>>>> develop
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieIds) => savedMovieIds === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleRemoveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
<<<<<<< HEAD
                        ? 'This movie has already been removed!'
                        : 'Delete this Movie!'}
                    </Button>
                  )}
                   {/* {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieIds) => savedMovieIds === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleFavMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been favorited!'
                        : 'Favorite this Movie!'}
                    </Button>
                  )} */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
=======
                        ? 'Removed from your lot!'
                        : 'Remove from your lot'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
              </Col>
              </Row>
              </CardGroup>
            );
          })}

>>>>>>> develop
      </Container>
    </>
  );
};
export default SavedMovies;