import React, { useState } from 'react';
import { topRated } from '../utils/API';
import { Container, Card, CardColumns } from 'react-bootstrap';


const TopRated = () => {
  const [trendingData, setTrendingData] = useState([]);
  
  async function trendingMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=880251381507cd0cb4e8235985a64cbc`);
    const trending = await response.json();

    const trendingData = trending.results.map((movie) => ({
      movieId: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      description: movie.overview,
      image: movie.poster_path
    }));
    setTrendingData(trendingData);
  }

  trendingMovies()
    .catch(error => {
      console.error(error);
    });
    


  return (
    <Container>
        <h2>
          {trendingData.length
            ? `Movies Trending Today ${trendingData.length} results:`
            : 'Movies Trending Today'}
        </h2>
        <CardColumns>
          {trendingData.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.image}`} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.releaseDate}</Card.Text>
                  <Card.Text>{movie.description}</Card.Text>
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
    
  );
};

export default TopRated;