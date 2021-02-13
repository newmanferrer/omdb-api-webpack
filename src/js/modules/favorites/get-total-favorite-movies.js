//* ===============================================================================================
//* FUNCION QUE REGRESA LA CANTIDAD DE PELÍCULAS DEL USUARIO CONTENIDAS EN FAVORITES
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { globalVariables } from '../global/global-variables';
import { getLocalStorage, getSessionStorage } from '../storage/local-session-storage';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (getLocalStorageTotalFavoritesMovies)
//* ---------------------------------------------------------------------------------------------
const getLocalStorageTotalFavoritesMovies = () => {
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();
 let total;

 globalVariables.arrayUsers.find((user) => {
  if (user.id === userID) {
   if (user.favorites.length > 0) {
    total = user.favorites.length;
   } else {
    total = 0;
   }
  }
  return false;
 });
 return total;
};

export default getLocalStorageTotalFavoritesMovies;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
