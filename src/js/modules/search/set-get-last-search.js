//* ===============================================================================================
//* FUNCIONES SET Y GET LAST SEARCH.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { globalVariables } from '../global/global-variables';
import {
 getLocalStorage,
 getSessionStorage,
 localStorageAddUsers,
 sessionStorageAddUser,
} from '../storage/local-session-storage';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE INCLUYE LA ULTIMA BÚSQUEDA EN EL LOCAL Y SESSION STORAGE
//* ---------------------------------------------------------------------------------------------
const setLocalStorageLastSearch = (lastSearch) => {
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();

 globalVariables.arrayUsers.find((user) => {
  const userLS = user;
  if (userLS.id === userID) {
   userLS.lastSearch = lastSearch;
   sessionStorageAddUser(user);
   localStorageAddUsers();
   return true;
  }
  return false;
 });
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE REGRESA LA ULTIMA BÚSQUEDA EN EL LOCAL STORAGE
//* ---------------------------------------------------------------------------------------------
const getLocalStorageLastSearch = () => {
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();
 let lastSearch;

 globalVariables.arrayUsers.find((user) => {
  if (user.id === userID) {
   lastSearch = user.lastSearch;
   return true;
  }
  return false;
 });
 return lastSearch;
};
//* ---------------------------------------------------------------------------------------------

export { setLocalStorageLastSearch, getLocalStorageLastSearch };
//* ===============================================================================================
