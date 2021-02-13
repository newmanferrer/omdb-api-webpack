//* ===============================================================================================
//* FUNCIÓN QUE INCLUYE Y ELIMINA FAVORITOS EN EL LOCAL Y SESSION STORAGE.
//*   Valida si el favorito ya fue agregado o no (Agrega - Elimina).
//*   Activa o Desactiva el botón de favoritos en el menú principal.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { globalVariables } from '../global/global-variables';
import favoritesValidation from './favorites-validation';
import {
 getLocalStorage,
 getSessionStorage,
 sessionStorageAddUser,
 localStorageAddUsers,
} from '../storage/local-session-storage';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (localStorageSetDelFavorites)
//* ---------------------------------------------------------------------------------------------
const localStorageSetDelFavorites = (imdbId) => {
 //* -----------------------------------------------------------------------------------------
 //* Agrega o Elimina favoritos
 //* -----------------------------------------------------------------------------------------
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();

 const favorites = {
  imdbId,
 };

 globalVariables.arrayUsers.find((user) => {
  if (user.id === userID) {
   const indexId = user.favorites.findIndex((favorite) => favorite.imdbId === imdbId);

   if (indexId === -1) {
    user.favorites.push(favorites);
   } else {
    user.favorites.splice(indexId, 1);
   }

   sessionStorageAddUser(user);
   localStorageAddUsers();
  }
  return false;
 });
 //* -----------------------------------------------------------------------------------------

 //* -----------------------------------------------------------------------------------------
 //* Activa o Desactiva botón de favoritos
 //* -----------------------------------------------------------------------------------------
 favoritesValidation();
 //* -----------------------------------------------------------------------------------------
};

export default localStorageSetDelFavorites;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
