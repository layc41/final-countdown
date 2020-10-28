<<<<<<< HEAD
export const getSavedMovieIds = () => {
    const savedMovieIds = localStorage.getItem('saved_movies')
      ? JSON.parse(localStorage.getItem('saved_movies'))
      : [];
  
    return savedMovieIds;
  };
  
  export const saveMovieIds = (movieIdArr) => {
    if (movieIdArr.length) {
      localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
    } else {
      localStorage.removeItem('saved_movies');
    }
  };
  
  export const removeMovieId = (movieId) => {
    const savedMovieIds = localStorage.getItem('saved_movies')
      ? JSON.parse(localStorage.getItem('saved_movies'))
      : null;
  
    if (!savedMovieIds) {
      return false;
    }
  
    const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId);
    localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));
  
    return true;
  };
=======
// export const getSavedMovieIds = () => {
//     const savedMovieIds = localStorage.getItem('saved_movies')
//       ? JSON.parse(localStorage.getItem('saved_movies'))
//       : [];
  
//     return savedMovieIds;
//   };
  
//   export const saveMovieIds = (movieIdArr) => {
//     if (movieIdArr.length) {
//       localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
//     } else {
//       localStorage.removeItem('saved_movies');
//     }
//   };
  
//   export const removeMovieId = (movieId) => {
//     const savedMovieIds = localStorage.getItem('saved_movies')
//       ? JSON.parse(localStorage.getItem('saved_movies'))
//       : null;
  
//     if (!savedMovieIds) {
//       return false;
//     }
  
//     const updatedSavedMovieIds = savedMoviesIds?.filter((savedMovieId) => savedMovieId !== movieId);
//     localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));
  
//     return true;
//   };
>>>>>>> develop

//   export const getSavedFavoriteIds = () => {
//     const savedFavoriteIds = localStorage.getItem('favorite_movies')
//       ? JSON.parse(localStorage.getItem('favorite_movies'))
//       : [];
  
//     return savedFavoriteIds;
//   };
  
//   export const saveFavoriteIds = (favoriteIdArr) => {
//     if (favoriteIdArr.length) {
//       localStorage.setItem('favorite_movies', JSON.stringify(favoriteIdArr));
//     } else {
//       localStorage.removeItem('favorite_movies');
//     }
//   };
  
//   export const removeFavoriteId = (favoriteId) => {
//     const savedFavoriteIds = localStorage.getItem('favorite_movies')
//       ? JSON.parse(localStorage.getItem('favorite_movies'))
//       : null;
  
//     if (!savedFavoriteIds) {
//       return false;
//     }
  
//     const updatedSavedFavoriteIds = savedFavoriteIds?.filter((savedFavoriteId) => savedFavoriteId !== favoriteId);
//     localStorage.setItem('favorite_movies', JSON.stringify(updatedSavedFavoriteIds));
  
//     return true;
//   };