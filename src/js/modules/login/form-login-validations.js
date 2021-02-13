//* ===============================================================================================
//* FUNCIÓN QUE VALIDA LOS DATOS INTRODUCIDOS POR EL USUARIO EN EL FORMULARIO LOGIN
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { patternUserName, patternPassword } from './patterns';
import { d } from '../global/global-variables';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $formLogin = d.getElementById('formLogin');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (formLoginValidations)
//* ---------------------------------------------------------------------------------------------
const formLoginValidations = () => {
 const $inputUsernameValue = $formLogin.username.value;
 const $inputPasswordValue = $formLogin.password.value;
 const regexpUserName = new RegExp(patternUserName);
 const regexpPassword = new RegExp(patternPassword);
 let response = false;

 if ($inputUsernameValue === '' || $inputPasswordValue === '') {
  response = false;
 } else if (
  !regexpUserName.exec($inputUsernameValue) ||
  !regexpPassword.exec($inputPasswordValue)
 ) {
  response = false;
 } else {
  response = true;
 }

 return response;
};

export default formLoginValidations;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
