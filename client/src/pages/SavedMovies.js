import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Container, Col,  Button, Card, CardGroup, Row } from 'react-bootstrap';
import Auth from '../utils/auth'
import { REMOVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useMutation } from '@apollo/react-hooks';
import { removeMovieId, getSavedMovieIds } from '../utils/localStorage';

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
      removeMovieId(movieId)
      setSavedMovieIds([...savedMovieIds]);
      window.location.reload()
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <>
      <Container className='justify-content-between' style={{ textAlign: 'center', paddingLeft: '0px', paddingRight: '0px', marginTop: '15px' }} >
        <h2 className='title-heading'>
          {userSavedMovies.length
            ? `Viewing Your Saved Movies:`
            : `${username}: you have no saved movies`}
        </h2>
        <Row style={{ justifyContent: 'center'}}>
          {userSavedMovies.map((movie) => {
            return (
              <CardGroup style={{ justifyContent: 'center', textAlign: 'center' }}>
              
                <Col>
                <Card key={movie.movieId} border='dark'>
                
                {/* <Card.Title className='text-center' style={{ textAlign: 'center', flexWrap: 'wrap'}}>{movie.title}</Card.Title> */}
                {movie.posterPath ? (
                  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.posterPath}`} alt={`The cover for ${movie.title}`} variant='center' className='saved'/>
                ) : null}
                <Card.Body className='d-flex justify-content-center'>
                
                  
                  {/* <Card.Text>{movie.overview}</Card.Text> */}
                  <div>
                  {Auth.loggedIn() && (
                    <Button
                      style={{ justifyContent: 'center'}}
                      disabled={savedMovieIds?.some((savedMovieIds) => savedMovieIds === movie.movieId)}
                      className="btn btn-dark btn-lg btn-block align-self-center save-button mx-auto"
                      onClick={() => handleRemoveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'Removed from your lot!'
                        : 'Remove from your lot'}
                    </Button>
                  )}
                  </div>
                </Card.Body>
            
              </Card>
              </Col>
              
              </CardGroup>
              
            );
            
          })}
          </Row>

      </Container>
    </>
  );
};
export default SavedMovies;