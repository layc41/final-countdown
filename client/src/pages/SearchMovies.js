import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchMovieDb } from '../utils/API';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_MOVIE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

//import local storage functionality to store saved books and favorited books
import { getSavedMovieIds, saveMovieIds, getSavedFavoriteIds, saveFavoriteIds } from '../utils/localStorage'

const SearchMovies = () => {
  const { data } = useQuery(QUERY_ME);
  // Set the movies they have saved
  const userSavedMovies = data?.me.savedMovies || [];
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [savedMovieIds, setSavedMovieIds] = useState(data?.me.savedMovies, []);

  console.log(savedMovieIds)

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  }, []);

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
      removeDuplicate(movieId)
    } catch (err) {
      console.error(err);
    }
  };

  function removeDuplicate(movieId) {
    return userSavedMovies.filter((value, index) => userSavedMovies.indexOf(value) === index)
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
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
      </Jumbotron>
      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.posterPath}`} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieIds) => savedMovieIds === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this Movie!'}
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
export default SearchMovies;