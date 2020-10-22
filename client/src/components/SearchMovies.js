import React from 'react';

const SearchMovies = () => {
  return (
    <div>
      <h2>Search Movies:</h2>
      <input className="form-input" placeholder="Enter movie title or genre!" type="text"/>
      <button type="button" id="search">Search</button>
    </div>
  );
};

export default SearchMovies;