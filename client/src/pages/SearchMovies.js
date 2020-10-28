import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, CardGroup, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchMovieDb } from '../utils/API';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_MOVIE} from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

//import local storage functionality to store saved books and favorited books
import { getSavedMovieIds, saveMovieIds, getSavedFavoriteIds, saveFavoriteIds } from '../utils/localStorage'

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => saveMovieIds(savedMovieIds))

  const [ saveMovie ] = useMutation(SAVE_MOVIE)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchMovieDb(searchInput);
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { results } = await response.json();
      const movieData = results.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path || '',
      }));
      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      console.log(movieToSave)
      await saveMovie({
        variables: {
          movie: movieToSave,
        },
      });
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      
        <Container className='search bg-secondary'>
          <h1 className='search-headers'>Search for a Movie!</h1>
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
      
      <Container>
        <h2 className='search-headers'>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : ''}
        </h2>
        
          {searchedMovies.map((movie) => {
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
                  
                  <Card.Text>{movie.overview}</Card.Text>
                  
                  {Auth.loggedIn() && ( 
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className="btn btn-dark btn-lg btn-block align-self-end save-button"
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'Saved to your lot!'
                        : 'Save this Movie!'}
                    </Button>
                  )}
                  
                </Card.Body>
              </Card>
              </Col>
              </Row>
              </CardGroup>
            );
          })}
        
      </Container>
    </>
  );
};
export default SearchMovies;