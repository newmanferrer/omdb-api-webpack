//* ===============================================================================================
//* FUNCIONES RELACIONADAS AL LOCAL Y SESSION STORAGE
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { globalVariables } from '../global/global-variables';
import { redirectToSearch } from '../helpers/redirect';
import generateId from '../helpers/generateId';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 1.- FUNCIÓN QUE INCLUYE USUARIOS AL LOCALSTORAGE
//* ---------------------------------------------------------------------------------------------
const localStorageAddUsers = () => {
 localStorage.setItem('users', JSON.stringify(globalVariables.arrayUsers));
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 2.- FUNCIÓN QUE INCLUYE USUARIOS AL SESSIONSTORAGE
//* ---------------------------------------------------------------------------------------------
const sessionStorageAddUser = (user) => {
 sessionStorage.setItem('session', JSON.stringify(user));
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 3.- FUNCIÓN QUE CREA NUEVOS USUARIOS
//*     Agrega usuarios en el arreglo (arrayUsers)
//*     Agrega usuarios en el local store (localStorageAddUsers())
//*     Agrega usuario en el session storage (sessionStorageAddUser())
//* ---------------------------------------------------------------------------------------------
const createUser = (name, password) => {
 const user = {
  id: generateId(),
  name,
  password,
  lastSearch: '',
  theme: 'darkmode',
  favorites: [],
 };

 globalVariables.arrayUsers.push(user);
 localStorageAddUsers();
 sessionStorageAddUser(user);
};
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 4.- FUNCION QUE ENTREGA LOS USUARIOS SI EXISTE EN EL LOCAL STORAGE
//* ---------------------------------------------------------------------------------------------
const getLocalStorage = () => JSON.parse(localStorage.getItem('users'));
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 5.- FUNCION QUE ENTREGA LA SESIÓN SI EXISTE EN EL SESSION STORAGE
//* ---------------------------------------------------------------------------------------------
const getSessionStorage = () => JSON.parse(sessionStorage.getItem('session'));
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* 6.- FUNCIÓN QUE VALIDA USUARIOS EXISTENTES EN EL LOCALSTORAGE
//*     Si el usuario existe crea la sesión. sessionStorageAddUsers()
//*     Si el usuario existe valida si tiene un tema seleccionado. validateTheme()
//*     Si el usuario NO existe crea el usuario e inicia la sesión. createUsers()
//* ---------------------------------------------------------------------------------------------
const localStorageValidateUsers = (username, password) => {
 globalVariables.arrayUsers = getLocalStorage();
 let userExist = false;

 if (globalVariables.arrayUsers === null) {
  globalVariables.arrayUsers = [];
 } else {
  globalVariables.arrayUsers.find((user) => {
   if (user.name === username && user.password === password) {
    userExist = true;
    sessionStorageAddUser(user);
   } else {
    userExist = false;
   }

   return userExist;
  });
 }

 if (userExist === false) {
  createUser(username, password);
  redirectToSearch();
 } else {
  redirectToSearch();
 }
};
//* ---------------------------------------------------------------------------------------------

export {
 createUser,
 localStorageValidateUsers,
 getLocalStorage,
 getSessionStorage,
 localStorageAddUsers,
 sessionStorageAddUser,
};
//* ===============================================================================================
