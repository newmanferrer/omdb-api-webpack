//* ===============================================================================================
//* 1.- FUNCIÓN QUE VALIDA EL STATUS DE LA CONEXIÓN DE RED
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, w } from '../global/global-variables';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (networkStatus)
//* ---------------------------------------------------------------------------------------------
const networkStatus = () => {
 const $containerNetworkStatus = d.createElement('div');
 const $footer = d.querySelector('.footer');
 const isOnLine = w.navigator.onLine;

 if (isOnLine) {
  $containerNetworkStatus.textContent = 'nuevamente conectado';
  $containerNetworkStatus.classList.add('onLine');
  $containerNetworkStatus.classList.remove('offLine');
  setTimeout(() => {
   w.location.reload();
  }, 5000);
 } else {
  $containerNetworkStatus.textContent = 'sin conexión';
  $containerNetworkStatus.classList.add('offLine');
  $containerNetworkStatus.classList.remove('onLine');
 }

 $footer.insertAdjacentElement('beforeend', $containerNetworkStatus);

 setTimeout(() => {
  $containerNetworkStatus.textContent = '';
  $containerNetworkStatus.classList.remove('onLine');
  $containerNetworkStatus.classList.remove('offLine');
 }, 5000);
};

export default networkStatus;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
