//* ===============================================================================================
//* FUNCIONES RELACIONADAS A MOSTRAR LAS PELICULAS
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, w, starIcon, globalVariables } from '../global/global-variables';
import { getLocalStorageLastSearch } from '../search/set-get-last-search';
import { getLocalStorage, getSessionStorage } from '../storage/local-session-storage';
import callOmdbApi from '../omdb-api/call-omdb-api';
import pagination from '../helpers/pagination';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $moviesDiv = d.getElementById('moviesDiv');
const $divSearchLoader = d.getElementById('search-loader');
const $lastSearchDiv = d.querySelector('.main-search__lastSearch.none');
const $lastSearchSpan = d.querySelector('.main-search__lastSearch__span');
const $errorMessageContainerSearch = d.querySelector('.main-search__errorMessages');
const $lastResultDiv = d.querySelector('.main-search__lastResult');
const $lastResultSpan = d.querySelector('.main-search__lastResult__span');
const $paginationDiv = d.querySelector('.main-search__pagination');
const $favoritesDiv = d.querySelector('.main-search__favorites');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (showMovies)
//* ---------------------------------------------------------------------------------------------
const showMovies = async (apiUrlQuery) => {
 const lastSearch = getLocalStorageLastSearch();
 const $fragment = d.createDocumentFragment();
 let movies;
 let totalMovies = 0;
 let totalPages = 0;

 $divSearchLoader.classList.remove('none');
 $moviesDiv.classList.add('none');

 $lastSearchDiv.classList.remove('none');
 $lastSearchSpan.textContent = lastSearch;

 $errorMessageContainerSearch.classList.add('none');

 try {
  const { dataJson } = await callOmdbApi(apiUrlQuery);

  $divSearchLoader.classList.add('none');
  $moviesDiv.classList.remove('none');

  if (dataJson.Response === 'False') {
   $lastResultDiv.classList.add('none');
   $paginationDiv.classList.add('none');
   throw new Error(`${dataJson.Error}`);
  }

  if (dataJson.Response === 'True' && dataJson.Search) {
   movies = dataJson.Search;
   totalMovies = dataJson.totalResults;
   totalPages = Math.ceil(totalMovies / globalVariables.moviesForPage);

   $lastResultDiv.classList.remove('none');
   $lastResultSpan.textContent = totalMovies;
   $moviesDiv.textContent = '';

   //* Pagination
   //* ---------------------------------------------------------------------------------
   pagination(totalPages);
   //* ---------------------------------------------------------------------------------

   movies.forEach((movie) => {
    const $movieDiv = d.createElement('div');
    $movieDiv.classList.add('main-search__movies__movie');

    //* Botón favoritos
    //* -------------------------------------------------------------------
    const $movieButton = d.createElement('button');
    $movieButton.classList.add('main-search__movies__movie__button');

    //* De ser un favorito en LS, coloca el botón amarillo
    //* ---------------------------------------------------------
    const userID = getSessionStorage().id;
    globalVariables.arrayUsers = getLocalStorage();

    globalVariables.arrayUsers.find((user) => {
     if (user.id === userID) {
      user.favorites.find((favorite) => {
       if (favorite.imdbId === movie.imdbID) {
        $movieButton.classList.add('movieIsFavorite');
        $favoritesDiv.classList.remove('none');
       }
       return false;
      });
     }
     return false;
    });
    //* ---------------------------------------------------------

    $movieButton.textContent = starIcon;
    $movieButton.setAttribute('data-imdbId', movie.imdbID);
    //* -------------------------------------------------------------------

    const $movieImage = d.createElement('img');
    $movieImage.classList.add('main-search__movies__movie__image');
    $movieImage.src = movie.Poster !== 'N/A' ? movie.Poster : 'assets/img/no-image.jpg';
    $movieImage.alt = movie.Title ? movie.Title : 'No title';
    $movieImage.setAttribute('data-imdbId', movie.imdbID);

    const $movieSpanTitle = d.createElement('span');
    $movieSpanTitle.classList.add('main-search__movies__movie__spanTitle');
    $movieSpanTitle.textContent = movie.Title ? movie.Title : 'No title';

    const $movieSpanYear = d.createElement('span');
    $movieSpanYear.classList.add('main-search__movies__movie__spanYear');
    $movieSpanYear.textContent = movie.Year ? movie.Year : 'No Year';

    const $movieSpanType = d.createElement('span');
    $movieSpanType.classList.add('main-search__movies__movie__spanType');
    $movieSpanType.textContent = movie.Type ? movie.Type : 'No Type';

    const $movieSpanImdbId = d.createElement('span');
    $movieSpanImdbId.classList.add('main-search__movies__movie__spanImdbId');
    $movieSpanImdbId.setAttribute('data-imdbId', movie.imdbID);

    $movieDiv.appendChild($movieButton);
    $movieDiv.appendChild($movieImage);
    $movieDiv.appendChild($movieSpanTitle);
    $movieDiv.appendChild($movieSpanYear);
    $movieDiv.appendChild($movieSpanType);
    $movieDiv.appendChild($movieSpanImdbId);

    $fragment.appendChild($movieDiv);
   });
   $moviesDiv.appendChild($fragment);
  }
 } catch (Error) {
  const ErrorMessage = Error.toString();
  let ErrorCode;
  let messageUser;

  if (ErrorMessage === 'Error: Movie not found!') {
   messageUser = `
        <p>Lo sentimos, sin resultados...</p>
        <p>Movie not found!</p>
      `;
  } else if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
   ErrorCode = '002';
   messageUser = `
        <p>ERROR CODE: ${ErrorCode}</p>
        <p>SIN DATA NI RESPUESTA DE LA APLICACIÓN</p>
        <p>VALIDE LA CONEXIÓN A INTERNET</p>
      `;
  } else {
   messageUser = `<p>${ErrorMessage}</p>`;
  }

  if (w.location.pathname === '/search.html') {
   $moviesDiv.innerHTML = '';
   $errorMessageContainerSearch.classList.remove('none');
   $errorMessageContainerSearch.innerHTML = '';
   $errorMessageContainerSearch.innerHTML = messageUser;
  }
 }
};

export default showMovies;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
