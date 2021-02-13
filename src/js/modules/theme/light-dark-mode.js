//* ===============================================================================================
//* FUNCIONES RELACIONADAS AL TEMA DE LA APLICACIÓN (LIGHT - DARK)
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, w, sunIcon, moonIcon, globalVariables } from '../global/global-variables';
import {
 getLocalStorage,
 getSessionStorage,
 localStorageAddUsers,
 sessionStorageAddUser,
} from '../storage/local-session-storage';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $selectors = d.querySelectorAll('[data-light]');
const $searchDivIcon = d.querySelector('.main-search__user__theme__icon');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE APLICA EL TEMA (LIGHT)
//* ---------------------------------------------------------------------------------------------
const lightMode = (userID) => {
 globalVariables.arrayUsers = getLocalStorage();
 $selectors.forEach((ele) => ele.classList.add('lightTheme'));

 if (w.location.pathname.includes('/search.html')) {
  $searchDivIcon.textContent = moonIcon;
 }

 globalVariables.arrayUsers.find((user) => {
  const userLS = user;
  if (userLS.id === userID) {
   userLS.theme = 'lightmode';
   sessionStorageAddUser(user);
   localStorageAddUsers();
  }
  return false;
 });
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE APLICA EL TEMA (DARK)
//* ---------------------------------------------------------------------------------------------
const darkMode = (userID) => {
 globalVariables.arrayUsers = getLocalStorage();
 $selectors.forEach((ele) => ele.classList.remove('lightTheme'));

 if (w.location.pathname.includes('/search.html')) {
  $searchDivIcon.textContent = sunIcon;
 }

 globalVariables.arrayUsers.find((user) => {
  const userLS = user;
  if (userLS.id === userID) {
   userLS.theme = 'darkmode';
   sessionStorageAddUser(user);
   localStorageAddUsers();
  }
  return false;
 });
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE VALIDA SI EL USUARIO TIENE UN TEMA SELECCIONADO (LIGHT - DARK)
//* ---------------------------------------------------------------------------------------------
const validateTheme = () => {
 const userID = getSessionStorage().id;
 globalVariables.arrayUsers = getLocalStorage();

 globalVariables.arrayUsers.find((user) => {
  if (user.id === userID) {
   if (user.theme === 'darkmode') {
    darkMode(userID);
   } else {
    lightMode(userID);
   }
  }
  return false;
 });
};
//* ---------------------------------------------------------------------------------------------

export { validateTheme, lightMode, darkMode };
//* ===============================================================================================
