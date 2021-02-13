//* ===============================================================================================
//* FUNCIÓN QUE LLAMA A LA API DE OMDB
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { options } from './omdb-api';
import { d } from '../global/global-variables';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $errorMessageContainerSearch = d.querySelector('.main-search__errorMessages');
const $errorMessageContainerFavorites = d.querySelector('.main-favorites__errorMessages');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (callOmdbApi)
//* ---------------------------------------------------------------------------------------------
const callOmdbApi = async (apiUrlQuery) => {
 const url = apiUrlQuery;
 let response;
 let dataJson;

 try {
  response = await fetch(url, options);
  dataJson = await response.json();
 } catch (Error) {
  const ErrorMessage = Error.toString();
  let ErrorCode;
  let messageUser;

  if (ErrorMessage === 'TypeError: Failed to fetch') {
   ErrorCode = '001';
   messageUser = `
        <p>ERROR CODE: ${ErrorCode}</p>
        <p>SIN RESPUESTA DE LA APLICACIÓN</p>
        <p>VALIDE LA CONEXIÓN A INTERNET</p>
      `;
  } else {
   messageUser = `<p>${ErrorMessage}</p>`;
  }

  if ($errorMessageContainerSearch) {
   $errorMessageContainerSearch.innerHTML = messageUser;
  } else if ($errorMessageContainerFavorites) {
   $errorMessageContainerFavorites.innerHTML = messageUser;
  }
 }
 return { response, dataJson };
};

export default callOmdbApi;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
