//* ===============================================================================================
//* FUNCIÓN QUE MANEJA EL BOTÓN DE SCROLL TOP
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, w } from '../global/global-variables';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $scrollTopButton = d.querySelector('.scroll-top-btn');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (scrollTopButton)
//* ---------------------------------------------------------------------------------------------
const scrollTopButton = () => {
 w.addEventListener('scroll', (event) => {
  event.preventDefault();
  const scrollTop = w.pageYOffset || d.documentElement.scrollTop;

  if (scrollTop > 1500) {
   $scrollTopButton.classList.remove('hidden');
  } else {
   $scrollTopButton.classList.add('hidden');
  }
 });

 $scrollTopButton.addEventListener('click', (event) => {
  event.preventDefault();
  w.scrollTo({
   behavior: 'smooth',
   top: 0,
  });
 });
};

export default scrollTopButton;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================