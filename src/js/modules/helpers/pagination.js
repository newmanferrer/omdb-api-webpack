//* ===============================================================================================
//* FUNCIÓN QUE MANEJA LA PAGINACIÓN
//* * Muestra el número de la página.
//* * Muestra y oculta botones Last y Next.
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* IMPORTACIONES
//* ---------------------------------------------------------------------------------------------
import { d, globalVariables } from '../global/global-variables';
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* CONSTANTES Y VARIABLES
//* ---------------------------------------------------------------------------------------------
const $paginationDiv = d.querySelector('.main-search__pagination');
const $paginationLabelLast = d.querySelector('.main-search__pagination__last');
const $paginationLabelNext = d.querySelector('.main-search__pagination__next');
const $paginationSpan = d.querySelector('.main-search__pagination__span');
//* ---------------------------------------------------------------------------------------------

//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN (pagination)
//* ---------------------------------------------------------------------------------------------
const pagination = (totalPages) => {
 $paginationSpan.textContent = globalVariables.page;

 if (globalVariables.page === 1 && totalPages === 1) {
  $paginationDiv.classList.add('none');
 } else if (globalVariables.page === 1 && totalPages > 1) {
  $paginationDiv.classList.remove('none');
  $paginationLabelNext.classList.remove('none');
  $paginationLabelLast.classList.add('none');
 } else if (globalVariables.page > 1 && globalVariables.page < totalPages) {
  $paginationDiv.classList.remove('none');
  $paginationLabelLast.classList.remove('none');
  $paginationLabelNext.classList.remove('none');
 } else if (globalVariables.page > 1 && globalVariables.page >= totalPages) {
  $paginationDiv.classList.remove('none');
  $paginationLabelLast.classList.remove('none');
  $paginationLabelNext.classList.add('none');
 }
};

export default pagination;
//* ---------------------------------------------------------------------------------------------
//* ===============================================================================================
