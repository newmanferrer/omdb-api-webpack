//* ===============================================================================================
//* 1.- IMPORTACIONES
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* 1.1.- Modulos JavaScript
//* ---------------------------------------------------------------------------------------------
import { d, w, sunIcon, globalVariables } from './modules/global/global-variables';
import { END_POINT_MOVIE, END_POINT_MOVIES } from './modules/omdb-api/omdb-api';

import sessionValidate from './modules/session/session-validate';
import closeSession from './modules/session/close-session';

import {
 getSessionStorage,
 localStorageValidateUsers,
} from './modules/storage/local-session-storage';

import formLoginDataUser from './modules/login/form-login-data-user';
import formLoginValidations from './modules/login/form-login-validations';

import {
 setLocalStorageLastSearch,
 getLocalStorageLastSearch,
} from './modules/search/set-get-last-search';

import favoritesValidation from './modules/favorites/favorites-validation';
import localStorageSetDelFavorites from './modules/favorites/set-del-favorites';
import getLocalStorageTotalFavoritesMovies from './modules/favorites/get-total-favorite-movies';

import showMovies from './modules/show/show-movies';
import showMovieModal from './modules/show/show-modal';
import showLastSearchMovies from './modules/show/show-last-search-movies';
import showFavoritesMovies from './modules/show/show-favorites-movies';

import { validateTheme, lightMode, darkMode } from './modules/theme/light-dark-mode';

import networkStatus from './modules/helpers/network-status';

import { redirectToSearch, redirectToFavorites } from './modules/helpers/redirect';

import scrollTopButton from './modules/helpers/scrollTopButton';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 1.2.- Estilos CSS
//* ---------------------------------------------------------------------------------------------
import '../scss/styles.scss';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 1.3.- Assets
//* ---------------------------------------------------------------------------------------------
import '../assets/favicon/favicon.ico';
import '../assets/images/no-image.jpg';
import '../assets/images/oval-blanco.svg';
import '../assets/images/oval-negro.svg';
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================

//* ===============================================================================================
//* 2.- UBICACIÓN DE ELEMENTOS EN HTML
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* 2.2.- index.html
//* ---------------------------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------
//* 2.2.1.- Formulario Login
//* ------------------------------------------------------------------------------------------
const $formLogin = d.getElementById('formLogin');
const $formLoginLoader = d.getElementById('login-loader');
//* ------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 2.3.- search.html
//* ---------------------------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------
//* 2.3.1.- Search "User" (Bienvenido, Tema, Salir, Icons)
//* ------------------------------------------------------------------------------------------
const $searchUser = d.querySelector('.main-search__user');
const $searchSpan = d.querySelector('.main-search__user__span');
//* ------------------------------------------------------------------------------------------

//* ------------------------------------------------------------------------------------------
//* 2.3.2.- Search "Favorites" (Container, button)
//* ------------------------------------------------------------------------------------------
const $favoritesButton = d.getElementById('favoritesButton');
//* ------------------------------------------------------------------------------------------

//* ------------------------------------------------------------------------------------------
//* 2.3.3.- Search "Search" (Formulario, input, button, Icon)
//* ------------------------------------------------------------------------------------------
const $formSearch = d.getElementById('formSearch');
//* ------------------------------------------------------------------------------------------

//* ------------------------------------------------------------------------------------------
//* 2.3.4.- Search "lastSearch" (Container, span Ultima búsqueda)
//* ------------------------------------------------------------------------------------------
const $lastSearchSpan = d.querySelector('.main-search__lastSearch__span');
//* ------------------------------------------------------------------------------------------

//* ------------------------------------------------------------------------------------------
//* 2.3.5.- Search "pagination" (Variables, Constantes, Container, label, span)
//* ------------------------------------------------------------------------------------------
const $paginationDiv = d.querySelector('.main-search__pagination');
//* ------------------------------------------------------------------------------------------

//* ------------------------------------------------------------------------------------------
//* 2.3.6.- Search "Movies" (Contenedor Películas, star icon)
//* ------------------------------------------------------------------------------------------
const $moviesDiv = d.getElementById('moviesDiv');
//* ------------------------------------------------------------------------------------------

//* ------------------------------------------------------------------------------------------
//* 2.3.7.- Ventana Modal "Movies" (Container)
//* ------------------------------------------------------------------------------------------
const $modalMovies = d.getElementById('modalMovies');
//* ------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 2.4.- favorites.html
//* ---------------------------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------
//* 2.4.1.- Elementos de "Favorites" (button, span, loader, Container Movies)
//* ------------------------------------------------------------------------------------------
const $favoritesButtonHome = d.getElementById('favoritesButtonHome');
const $favoritesSpan = d.getElementById('favoritesSpan');
const $favoritesMoviesContainer = d.getElementById('favoritesMoviesContainer');
//* ------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================

//* ===============================================================================================
//* 3.- FUNCIONES.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* 3..1.- FUNCIÓN QUE VALIDA CONSTANTEMENTE SI EXISTE UNA SESIÓN ACTIVA
//* ---------------------------------------------------------------------------------------------
(() => {
 sessionValidate();
})();
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================

//* ===============================================================================================
//* 4.- CÓDIGO PRINCIPAL Y EVENT LISTENER.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* 4.1.- EVENTO DE ESCUCHA AL CARGAR EL DOCUMENTO.
//* ---------------------------------------------------------------------------------------------
d.addEventListener('DOMContentLoaded', () => {
 formLoginDataUser();
});
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.2.- INDEX.HTML
//* ---------------------------------------------------------------------------------------------
//* ------------------------------------------------------------------------------------------
//* 4.2.1.- EVENTO DE ESCUCHA DEL SUBMIT EN FORMULARIO LOGIN (index.html).
//* ------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/')) {
 if ($formLogin) {
  $formLogin.addEventListener('submit', (e) => {
   e.preventDefault();
   $formLoginLoader.classList.remove('none');

   if (formLoginValidations()) {
    const userName = $formLogin.username.value.toLowerCase();
    const userPassword = $formLogin.password.value;

    localStorageValidateUsers(userName, userPassword);

    $formLogin.reset();
    $formLoginLoader.classList.add('none');
   } else {
    // eslint-disable-next-line no-alert
    alert('Alerta submit: Posible manipulación inadecuada del html en línea');
    window.location.reload();
   }
  });
 }
}
//* ------------------------------------------------------------------------------------------
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.3.- SEARCH.HTML
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/search.html')) {
 //* -------------------------------------------------------------------------------------------
 //* 4.3.1.- VALIDA EL TEMA (darkMode - lightMode), DEL USUARIO EN lOCAL STORAGE.
 //* -------------------------------------------------------------------------------------------
 favoritesValidation();
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 4.3.2.- CARGA DE PELÍCULAS INICIALES (ultima búsqueda del usuario o aleatorio).
 //* -------------------------------------------------------------------------------------------
 showLastSearchMovies();
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.3.- EVENTO DE ESCUCHA DEL CONTENEDOR ".main-search__user".
 //*         * Se encarga de colocar el nombre del usuario en la bienvenida.
 //*         * Escucha por delegación de eventos el icono de tema seleccionado. (div icon).
 //*         * Escucha por delegación de eventos el cierre de sesión. (boton salir).
 //* -------------------------------------------------------------------------------------------
 const sessionUser = getSessionStorage();
 $searchSpan.textContent = sessionUser.name.toLowerCase();

 $searchUser.addEventListener('click', (event) => {
  event.preventDefault();

  if (event.target.matches('.main-search__user__button')) {
   closeSession();
  }

  if (event.target.matches('.main-search__user__theme__icon')) {
   const icon = event.target.textContent;
   const userID = getSessionStorage().id;

   if (icon === sunIcon) {
    lightMode(userID);
   } else {
    darkMode(userID);
   }
  }
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.4.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS.
 //*         * Detecta el click y dirige hacia la página de favoritos (favorites.html).
 //* -------------------------------------------------------------------------------------------
 $favoritesButton.addEventListener('click', (event) => {
  event.preventDefault();
  redirectToFavorites();
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.5.- EVENTO DE ESCUCHA DEL SUBMIT EN FORMULARIO SEARCH.
 //* -------------------------------------------------------------------------------------------
 $formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  globalVariables.page = 1;
  const userQuery = $formSearch.search.value.toLowerCase();
  const apiUrlQuery = `${END_POINT_MOVIES}${userQuery}`;
  $formSearch.reset();
  setLocalStorageLastSearch(userQuery);
  showMovies(apiUrlQuery);
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.6.- EVENTO DE ESCUCHA DE LA ULTIMA BÚSQUEDA DEL USUARIO.
 //*         * Al hacer click en el span de la ultima búsqueda la coloca en el input.
 //*         * Coloca el foco en el input.
 //* -------------------------------------------------------------------------------------------
 $lastSearchSpan.addEventListener('click', (event) => {
  event.preventDefault();
  const lastSearch = event.target.textContent;
  $formSearch.search.value = lastSearch;
  $formSearch.search.focus();
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.7.- EVENTO DE ESCUCHA BOTONES DE PAGINACIÓN.
 //* -------------------------------------------------------------------------------------------
 $paginationDiv.addEventListener('click', (event) => {
  event.preventDefault();
  const lastSearch = getLocalStorageLastSearch();

  if (event.target.matches('.main-search__pagination__last')) {
   globalVariables.page -= 1;
  } else if (event.target.matches('.main-search__pagination__next')) {
   globalVariables.page += 1;
  }

  const apiUrlQuery = `${END_POINT_MOVIES}${lastSearch}&page=${globalVariables.page}`;
  showMovies(apiUrlQuery);
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.8.- EVENTO DE ESCUCHA BOTÓN FAVORITOS DE LA PELÍCULA  EN "moviesDiv".
 //* -------------------------------------------------------------------------------------------
 $moviesDiv.addEventListener('click', (event) => {
  event.preventDefault();
  const $element = event.target;

  if ($element.matches('.main-search__movies__movie__button')) {
   $element.classList.toggle('movieIsFavorite');

   const imdbId = $element.getAttribute('data-imdbId');
   localStorageSetDelFavorites(imdbId);
  }
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.9.- EVENTO DE ESCUCHA IMAGEN DE PELÍCULA EN "moviesDiv" - (VENTANA MODAL).
 //*         * Escucha el click en contenedor de películas.
 //*         * Al hacer click en la imagen de película, abre la ventana modal.
 //*         * Realiza una nueva llamada a la api y muestra en modal los resultados.
 //* -------------------------------------------------------------------------------------------
 $moviesDiv.addEventListener('click', (event) => {
  event.preventDefault();
  const $element = event.target;

  if ($element.classList.contains('main-search__movies__movie__image')) {
   d.body.classList.add('overflowModal');
   const imdbId = $element.getAttribute('data-imdbId');
   const apiUrlQuery = `${END_POINT_MOVIE}${imdbId}`;

   $modalMovies.classList.add('showModal');
   showMovieModal(apiUrlQuery);
  }
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.10.- EVENTO DE ESCUCHA CONTENEDOR "modalMovies" - (VENTANA MODAL).
 //*         * Escuha el click en el contenedor modal.
 //*         * Al hacer click en el contenedor modal, cierra la ventana modal.
 //* -------------------------------------------------------------------------------------------
 $modalMovies.addEventListener('click', (event) => {
  event.preventDefault();
  const $element = event.target;

  if ($element.classList.contains('main-search__modal-movies')) {
   d.body.classList.remove('overflowModal');
   $modalMovies.classList.remove('showModal');
  }
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 3.3.11.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS DE LA PELÍCULA - (VENTANA MODAL).
 //*          * Escucha el click en el contenedor de películas de ventana modal.
 //*          * Al hacer click en el botón de favoritos, coloca en amarillo el botón, agrega
 //*            o quita la película de favoritos, tanto de la modal como del contenedor de
 //*            películas, asi como del local y session storage.
 //* -------------------------------------------------------------------------------------------
 $modalMovies.addEventListener('click', (event) => {
  event.preventDefault();
  const $element = event.target;

  if ($element.matches('.main-search__modal-movies__movieContent__imageButton__button')) {
   const imdbId = $element.getAttribute('data-imdbId');
   $element.classList.toggle('movieIsFavorite');

   const $moviesDivMovies = $moviesDiv.querySelectorAll('.main-search__movies__movie');

   $moviesDivMovies.forEach((element) => {
    if (element.children[5].dataset.imdbid === imdbId) {
     element.children[0].classList.toggle('movieIsFavorite');
    }
   });

   localStorageSetDelFavorites(imdbId);
  }
 });
 //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.4.- FAVORITES.HTML
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/favorites.html')) {
 //* -------------------------------------------------------------------------------------------
 //* 4.4.1.- MUESTRA LAS PELÍCULAS INCLUIDAS A FAVORITOS.
 //* -------------------------------------------------------------------------------------------
 showFavoritesMovies();
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 4.4.2.- EVENTO DE ESCUCHA DEL BOTÓN HOME.
 //* -------------------------------------------------------------------------------------------
 $favoritesButtonHome.addEventListener('click', (event) => {
  event.preventDefault();
  redirectToSearch();
 });
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 4.4.3.- EVENTO DE ESCUCHA DEL BOTÓN FAVORITOS DE LA PELÍCULA.
 //*         * Escucha el contenedor de películas en favoritos.
 //*         * Al hacer click en el botón de favoritos:
 //*           - Quita el color amarillo del botón.
 //*           - Elimina la película del contenedor de favoritos.
 //*           - Elimina de favoritos en el local y session storage.
 //* -------------------------------------------------------------------------------------------
 $favoritesMoviesContainer.addEventListener('click', (event) => {
  event.preventDefault();
  const $element = event.target;

  if ($element.matches('.main-favorites__moviesContainer__movieContainer__button')) {
   const imdbId = $element.getAttribute('data-imdbId');
   const $favoriteMoviesNodeList = $favoritesMoviesContainer.querySelectorAll(
    '.main-favorites__moviesContainer__movieContainer',
   );

   $favoriteMoviesNodeList.forEach((element) => {
    if (element.children[5].dataset.imdbid === imdbId) {
     element.children[0].classList.toggle('movieIsFavorite');
     element.children[0].parentElement.remove();
    }
   });

   localStorageSetDelFavorites(imdbId);
   $favoritesSpan.textContent = getLocalStorageTotalFavoritesMovies();
  }
 });
 //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.5.- SEARCH.HTML - FAVORITES.HTML
//* ---------------------------------------------------------------------------------------------
if (
 w.location.pathname.includes('/search.html') ||
 w.location.pathname.includes('/favorites.html')
) {
 //* -------------------------------------------------------------------------------------------
 //* 4.5.1.- LLAMA A LA FUNCIÓN "validateTheme".
 // *        * Se encarga de validar el tema (darkMode - lightMode), seleccionado por el usuario.
 //* -------------------------------------------------------------------------------------------
 validateTheme();
 //* -------------------------------------------------------------------------------------------

 //* -------------------------------------------------------------------------------------------
 //* 4.5.2.- LLAMA A LA FUNCIÓN "scrollTopButton".
 //*         * Se encargada de mostar el botón para ir al inicio de la página.
 //* -------------------------------------------------------------------------------------------
 scrollTopButton();
 //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.6.- INDEX.HTML - SEARCH.HTML - FAVORITES.HTML
//* ---------------------------------------------------------------------------------------------
if (w.location.pathname.includes('/')) {
 //* -------------------------------------------------------------------------------------------
 //* 3.7.1.- EVENTO DE ESCUCHA AL CAMBIAR EL ESTATUS DE LA CONEXIÓN DE RED.
 //* -------------------------------------------------------------------------------------------
 window.addEventListener('online', () => networkStatus());
 window.addEventListener('offline', () => networkStatus());
 //* -------------------------------------------------------------------------------------------
}
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
