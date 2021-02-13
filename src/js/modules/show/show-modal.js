//* ===============================================================================================
//* FUNSIÓN QUE MUESTRA DETALLE DE PELÍCULA EN VENTANA MODAL "search.html"
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, starIcon, globalVariables } from '../global/global-variables';
import callOmdbApi from '../omdb-api/call-omdb-api';
import { getLocalStorage, getSessionStorage } from '../storage/local-session-storage';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $divSearchLoader = d.getElementById('search-loader');
const $modalMovies = d.getElementById('modalMovies');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (showMovieModal)
//* ---------------------------------------------------------------------------------------------
const showMovieModal = async (apiUrlQuery) => {
 $divSearchLoader.classList.remove('none');
 const $fragment = d.createDocumentFragment();

 try {
  const { dataJson } = await callOmdbApi(apiUrlQuery);

  $divSearchLoader.classList.add('none');

  if (dataJson.Response === 'False') throw new Error(`${dataJson.Error}`);

  if (dataJson.Response === 'True') {
   const $movieDiv = d.createElement('div');
   $movieDiv.classList.add('main-search__modal-movies__movieContent');

   //* ---------------------------------------------------------------------------------------
   const $movieDivImgageButton = d.createElement('div');
   $movieDivImgageButton.classList.add('main-search__modal-movies__movieContent__imageButton');

   const $movieImage = d.createElement('img');
   $movieImage.classList.add('main-search__modal-movies__movieContent__imageButton__image');
   $movieImage.src = dataJson.Poster !== 'N/A' ? dataJson.Poster : 'assets/img/no-image.jpg';
   $movieImage.alt = dataJson.Title ? dataJson.Title : 'No title';
   $movieImage.setAttribute('data-imdbId', dataJson.imdbID);

   const $movieButton = d.createElement('button');
   $movieButton.classList.add('main-search__modal-movies__movieContent__imageButton__button');

   //* De ser un favorito en LS, coloca el botón amarillo
   //* ---------------------------------------------------------
   const userID = getSessionStorage().id;
   globalVariables.arrayUsers = getLocalStorage();

   globalVariables.arrayUsers.find((user) => {
    if (user.id === userID) {
     user.favorites.find((favorite) => {
      if (favorite.imdbId === dataJson.imdbID) {
       $movieButton.classList.add('movieIsFavorite');
      }
      return false;
     });
    }
    return false;
   });
   //* ---------------------------------------------------------

   $movieButton.textContent = starIcon;
   $movieButton.setAttribute('data-imdbId', dataJson.imdbID);

   $movieDivImgageButton.appendChild($movieImage);
   $movieDivImgageButton.appendChild($movieButton);
   $movieDiv.appendChild($movieDivImgageButton);
   //* ---------------------------------------------------------------------------------------

   //* ---------------------------------------------------------------------------------------
   const $movieDivInfo = d.createElement('div');
   $movieDivInfo.classList.add('main-search__modal-movies__movieContent__info');

   const $movieSpanTitle = d.createElement('span');
   $movieSpanTitle.classList.add('main-search__modal-movies__movieContent__info__spanTitle');
   $movieSpanTitle.textContent = dataJson.Title ? dataJson.Title : 'No title';

   const $movieSpanYear = d.createElement('span');
   $movieSpanYear.classList.add('main-search__modal-movies__movieContent__info__spanYear');
   $movieSpanYear.textContent = dataJson.Year ? dataJson.Year : 'No Year';

   const $movieSpanType = d.createElement('span');
   $movieSpanType.classList.add('main-search__movies__movie__info__spanType');
   $movieSpanType.textContent = dataJson.Type ? dataJson.Type : 'No Type';

   const $movieSpanRuntime = d.createElement('span');
   $movieSpanRuntime.classList.add('main-search__modal-movies__movieContent__info__spanRuntime');
   $movieSpanRuntime.textContent = dataJson.Runtime ? dataJson.Runtime : 'No Runtime';

   const $movieSpanLanguage = d.createElement('span');
   $movieSpanLanguage.classList.add('main-search__modal-movies__movieContent__info__spanLanguage');
   $movieSpanLanguage.textContent = dataJson.Language ? dataJson.Language : 'No Language';

   const $movieSpanGender = d.createElement('span');
   $movieSpanGender.classList.add('main-search__modal-movies__movieContent__info__spanGender');
   $movieSpanGender.textContent = dataJson.Genre ? dataJson.Genre : 'No Gender';

   const $movieSpanCountry = d.createElement('span');
   $movieSpanCountry.classList.add('main-search__modal-movies__movieContent__info__spanCountry');
   $movieSpanCountry.textContent = dataJson.Country ? dataJson.Country : 'No Country';

   const $movieSpanActors = d.createElement('span');
   $movieSpanActors.classList.add('main-search__modal-movies__movieContent__info__spanActors');
   $movieSpanActors.textContent = dataJson.Actors ? dataJson.Actors : 'No Actors';

   const $movieSpanDirector = d.createElement('span');
   $movieSpanDirector.classList.add('main-search__modal-movies__movieContent__info__spanDirector');
   $movieSpanDirector.textContent = dataJson.Director ? dataJson.Director : 'No Director';

   const $movieSpanPlot = d.createElement('span');
   $movieSpanPlot.classList.add('main-search__modal-movies__movieContent__info__spanPlot');
   $movieSpanPlot.textContent = dataJson.Plot ? dataJson.Plot : 'No Plot';

   $movieDivInfo.appendChild($movieSpanTitle);
   $movieDivInfo.appendChild($movieSpanYear);
   $movieDivInfo.appendChild($movieSpanType);
   $movieDivInfo.appendChild($movieSpanRuntime);
   $movieDivInfo.appendChild($movieSpanLanguage);
   $movieDivInfo.appendChild($movieSpanGender);
   $movieDivInfo.appendChild($movieSpanCountry);
   $movieDivInfo.appendChild($movieSpanActors);
   $movieDivInfo.appendChild($movieSpanDirector);
   $movieDivInfo.appendChild($movieSpanPlot);

   $movieDiv.appendChild($movieDivInfo);
   //* ---------------------------------------------------------------------------------------

   $fragment.appendChild($movieDiv);
   $modalMovies.innerHTML = '';
   $modalMovies.appendChild($fragment);
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

  if ($modalMovies) {
   $modalMovies.innerHTML = '';
   $modalMovies.classList.add('modalErrorMessage');
   $modalMovies.innerHTML = messageUser;
  }
 }
};

export default showMovieModal;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
