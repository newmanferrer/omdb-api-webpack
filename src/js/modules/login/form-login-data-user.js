//* ===============================================================================================
//* FUNCIÓN QUE RECIBE LOS DATOS INTRODUCIDOS POR EL USUARIO DE FORMA REACTIVA
//*         * Recive los datos del usuario y realiza una primera validación.
//*         * Informa al usuario sobre el formato requerido de los datos.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, w } from '../global/global-variables';
import { patternUserName, patternPassword } from './patterns';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $formLoginInputs = d.querySelectorAll('.login-input');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (formLoginDataUser)
//* ---------------------------------------------------------------------------------------------
const formLoginDataUser = () => {
 $formLoginInputs.forEach((input) => {
  const $span = d.createElement('span');
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add('form-input-error', 'none');

  input.insertAdjacentElement('afterend', $span);
 });

 d.addEventListener('keyup', (e) => {
  if (e.target.matches('.login-input')) {
   const { name, title, value } = e.target;
   let { pattern } = e.target;

   if (value === '') {
    d.getElementById(name).classList.add('is-active');
    if (name === 'username') {
     d.getElementById(name).textContent = 'Nombre de usuario requerido';
    } else {
     d.getElementById(name).textContent = 'Contraseña requerida';
    }
   } else {
    d.getElementById(name).textContent = title;
   }

   if (name === 'username' && (!pattern || pattern === '' || pattern !== patternUserName)) {
    pattern = patternUserName;
    // eslint-disable-next-line no-alert
    alert('Alerta: Posible manipulación inadecuada del html en línea. (username patern)');
    w.location.reload();
   }

   if (name === 'password' && (!pattern || pattern === '' || pattern !== patternPassword)) {
    pattern = patternPassword;
    // eslint-disable-next-line no-alert
    alert('Alerta: Posible manipulación inadecuada del html en línea. (password patern)');
    w.location.reload();
   }

   if (value.length >= 0) {
    const regexp = new RegExp(pattern);

    if (regexp.exec(value)) {
     d.getElementById(name).classList.remove('is-active');
    } else {
     d.getElementById(name).classList.add('is-active');
    }
   }
  }
 });
};

export default formLoginDataUser;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
