//* ===============================================================================================
//* FUNCIÓN QUE MUESTRA LAS PELÍCULAS INMEDIATAMENTE AL ENTRAR A LA APLICACIÓN.
//* Busca en el local storage la ultima búsqueda del usuario.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { globalVariables } from '../global/global-variables';
import { END_POINT_MOVIES } from '../omdb-api/omdb-api';
import { getLocalStorage, getSessionStorage } from '../storage/local-session-storage';
import { setLocalStorageLastSearch } from '../search/set-get-last-search';
import showMovies from './show-movies';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (showLastSearchMovies)
//* ---------------------------------------------------------------------------------------------
const showLastSearchMovies = () => {
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();

 globalVariables.arrayUsers.find((user) => {
  if (user.id === userID) {
   let { lastSearch } = user;
   let apiUrlQuery;

   if (lastSearch !== '') {
    apiUrlQuery = `${END_POINT_MOVIES}${lastSearch}`;
    showMovies(apiUrlQuery);
   } else {
    lastSearch = 'series';
    apiUrlQuery = `${END_POINT_MOVIES}${lastSearch}`;
    setLocalStorageLastSearch(lastSearch);
    showMovies(apiUrlQuery);
   }
  }
  return false;
 });
};

export default showLastSearchMovies;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
