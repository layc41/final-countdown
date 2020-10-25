import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchMovieDb } from '../utils/API';
// import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_MOVIE, ADD_FAVORITE } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

//import local storage functionality to store saved books and favorited books
import { getSavedMovieIds, saveMovieIds, getSavedFavoriteIds, saveFavoriteIds } from '../utils/localStorage'

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // local storage to save movie ids
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // local storage to save favorite ids
  const [savedFavoriteIds, setSavedFavoriteIds] = useState(getSavedFavoriteIds());

  useEffect(() => {
    return () => saveFavoriteIds(savedFavoriteIds);
  });

  // get the save movie mutation
  const [saveMovie] = useMutation(SAVE_MOVIE, {
    update(cache, { data: { saveMovie } }) {
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, savedMovies: [...me.savedMovies, saveMovie] } }
      })
    }
  })

  //get the add favorite mutation
  const [addFavorite] = useMutation(ADD_FAVORITE, {
    update(cache, { data: { saveMovie } }) {
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, favorites: [...me.favorites, addFavorite] } }
      })
    }
  })

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
        description: movie.overview,
        image: movie.poster_path || '',
      }));
      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // handle saved movies
  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
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

  // handle favorite movies
  const handleFavoriteMovie = async (movieId) => {
    const favoriteToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await addFavorite({
        variables: {
          movie: favoriteToSave,
        },
      });
      setSavedFavoriteIds([...savedFavoriteIds, favoriteToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

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
                  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.image}`} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedFavoriteIds?.some((savedFavoriteIds) => savedFavoriteIds === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleFavoriteMovie(movie.movieId)}>
                      {savedFavoriteIds?.some((savedFavoriteId) => savedFavoriteId === movie.movieId)
                        ? 'This movie has already been favorited!'
                        : 'Favorite this Movie!'}
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