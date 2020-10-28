import React, { useEffect, useState } from 'react';

import { Container, Card, CardColumns, Row, Col, CardDeck } from 'react-bootstrap';
import { popular } from '../utils/API';

const TopRated = () => {
  const [trendingData, setTrendingData] = useState([]);

  
  const trendingMovies = async (event) => {
    try{
    const response = await popular();
    const trending = await response.json();

    const trendingData = trending.results.map((movie) => ({
      movieId: movie.id,
      image: movie.poster_path
    }));
  
    setTrendingData(trendingData);
  } catch (err) {
    console.error(err);
  }
  };

//   trendingMovies()
//     .catch(error => {
//       console.error(error);
//   });
    
    useEffect(() => {
        const trendingMovies = async (event) => {
            try{
            const response = await popular();
            const trending = await response.json();
        
            const trendingData = trending.results.map((movie) => ({
              movieId: movie.id,
              image: movie.poster_path
            }));
          
            setTrendingData(trendingData);
          } catch (err) {
            console.error(err);
          }
          };
          trendingMovies(trendingData);
    }, [])


  return (
    <Container className='justify-content-around' >
        <h2>
          {trendingData.length
            ? `Movies Trending Today ${trendingData.length} results:`
            : 'Movies Trending Today'}
        </h2>
        <div style={{ display: 'flex', flexWrap: "wrap" }}>
          {trendingData.map((movie) => {
              return (
                  <div style={{ width: '200px', margin: '5px'}}>
                  <CardDeck style={{ width: '100px'}}>
                      <Card>
                          <div className={Row} key={movie.movieId} border='dark'>

                              {movie.image ? (
                                  <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.image}`} alt={`The cover for ${movie.title}`} variant='top' />
                              ) : null}

                          </div>
                      </Card>
                  </CardDeck>
                  </div>

         
              );
          })}
                 </div>
      </Container>
    
  );
};

export default TopRated;