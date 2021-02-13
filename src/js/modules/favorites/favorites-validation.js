//* ===============================================================================================
//* FUNCIÓN QUE VALIDA SI EL USUARIO TIENE FAVORITOS EN EL LOCAL STORAGE
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, w, globalVariables } from '../global/global-variables';
import { getLocalStorage, getSessionStorage } from '../storage/local-session-storage';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $favoritesDiv = d.querySelector('.main-search__favorites');
//* ---------------------------------------------------------------------------------------------

const favoritesValidation = () => {
 if (w.location.pathname.includes('/search.html')) {
  const userID = getSessionStorage().id;
  globalVariables.arrayUsers = getLocalStorage();

  globalVariables.arrayUsers.find((user) => {
   if (user.id === userID) {
    if (user.favorites.length > 0) {
     $favoritesDiv.classList.remove('none');
     return true;
    }
    $favoritesDiv.classList.add('none');
   }
   return false;
  });
 }
};

export default favoritesValidation;
//* ===============================================================================================
