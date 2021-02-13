//* ===============================================================================================
//* FUNCIÓN QUE MUESTRA LAS PELÍCULAS EXISTENTES EN FAVORITOS.
//* Busca en el local storage los favoritos que tenga el usuario.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, starIcon, globalVariables } from '../global/global-variables';
import { getLocalStorage, getSessionStorage } from '../storage/local-session-storage';
import { END_POINT_MOVIE } from '../omdb-api/omdb-api';
import callOmdbApi from '../omdb-api/call-omdb-api';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $favoritesLoader = d.getElementById('favorites-loader');
const $favoritesMoviesContainer = d.getElementById('favoritesMoviesContainer');
const $errorMessageContainerFavorites = d.querySelector('.main-favorites__errorMessages');
const $favoritesSpan = d.getElementById('favoritesSpan');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (showFavoritesMovies)
//* ---------------------------------------------------------------------------------------------
const showFavoritesMovies = async () => {
 $favoritesLoader.classList.remove('none');
 $favoritesMoviesContainer.classList.add('none');
 $errorMessageContainerFavorites.classList.add('none');

 const $fragment = d.createDocumentFragment();
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();
 let counter = 0;

 globalVariables.arrayUsers.find((user) => {
  if (user.id === userID) {
   if (user.favorites.length > 0) {
    const totalMovies = user.favorites.length;
    $favoritesSpan.textContent = totalMovies;

    user.favorites.forEach(async (favorite) => {
     counter += 1;
     const { imdbId } = favorite;
     const apiUrlQuery = `${END_POINT_MOVIE}${imdbId}`;

     try {
      const { dataJson } = await callOmdbApi(apiUrlQuery);

      $favoritesLoader.classList.add('none');
      $favoritesMoviesContainer.classList.remove('none');

      if (dataJson.Response === 'False') throw new Error(`${dataJson.Error}`);

      const $favoriteMovieContainer = d.createElement('div');
      $favoriteMovieContainer.classList.add('main-favorites__moviesContainer__movieContainer');

      const $favoriteMovieButton = d.createElement('button');
      $favoriteMovieButton.classList.add('main-favorites__moviesContainer__movieContainer__button');
      $favoriteMovieButton.classList.add('movieIsFavorite');
      $favoriteMovieButton.textContent = starIcon;
      $favoriteMovieButton.setAttribute('data-imdbId', dataJson.imdbID);
      $favoriteMovieContainer.appendChild($favoriteMovieButton);

      const $favoriteMovieImage = d.createElement('img');
      $favoriteMovieImage.classList.add('main-favorites__moviesContainer__movieContainer__image');
      $favoriteMovieImage.src =
       dataJson.Poster !== 'N/A' ? dataJson.Poster : 'assets/img/no-image.jpg';
      $favoriteMovieImage.alt = dataJson.Title ? dataJson.Title : 'No title';
      $favoriteMovieImage.setAttribute('data-imdbId', dataJson.imdbID);
      $favoriteMovieContainer.appendChild($favoriteMovieImage);

      const $favoriteMovieSpanTitle = d.createElement('span');
      $favoriteMovieSpanTitle.classList.add(
       'main-favorites__moviesContainer__movieContainer__spanTitle',
      );
      $favoriteMovieSpanTitle.textContent = dataJson.Title ? dataJson.Title : 'No title';
      $favoriteMovieContainer.appendChild($favoriteMovieSpanTitle);

      const $favoriteMovieSpanYear = d.createElement('span');
      $favoriteMovieSpanYear.classList.add(
       'main-favorites__moviesContainer__movieContainer__spanYear',
      );
      $favoriteMovieSpanYear.textContent = dataJson.Year ? dataJson.Year : 'No Year';
      $favoriteMovieContainer.appendChild($favoriteMovieSpanYear);

      const $favoriteMovieSpanType = d.createElement('span');
      $favoriteMovieSpanType.classList.add('main-search__movies__movie__spanType');
      $favoriteMovieSpanType.textContent = dataJson.Type ? dataJson.Type : 'No Type';
      $favoriteMovieContainer.appendChild($favoriteMovieSpanType);

      const $favoriteMovieSpanImdbId = d.createElement('span');
      $favoriteMovieSpanImdbId.classList.add('main-search__movies__movie__spanImdbId');
      $favoriteMovieSpanImdbId.setAttribute('data-imdbId', dataJson.imdbID);
      $favoriteMovieContainer.appendChild($favoriteMovieSpanImdbId);

      $fragment.appendChild($favoriteMovieContainer);

      if (counter === totalMovies) {
       $favoritesMoviesContainer.appendChild($fragment);
      }
     } catch (Error) {
      const ErrorMessage = Error.toString();
      let ErrorCode;
      let messageUser;

      if (ErrorMessage === "TypeError: Cannot read property 'Response' of undefined") {
       ErrorCode = '002';
       messageUser = `
                <p>ERROR CODE: ${ErrorCode}</p>
                <p>SIN DATA NI RESPUESTA DE LA APLICACIÓN</p>
                <p>VALIDE LA CONEXIÓN A INTERNET</p>
              `;
      } else {
       messageUser = `<p>${ErrorMessage}</p>`;
      }

      if ($errorMessageContainerFavorites) {
       $favoritesMoviesContainer.innerHTML = '';
       $errorMessageContainerFavorites.classList.remove('none');
       $errorMessageContainerFavorites.innerHTML = '';
       $errorMessageContainerFavorites.innerHTML = messageUser;
      }
     }
    });
   }
  }
  return false;
 });
};

export default showFavoritesMovies;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
