//* ===============================================================================================
//* FUNCIONES RELACIONADAS AL ENRUTAMIENTO HACIA LAS PAGINAS DE LA APLICACIÓN
//* ===============================================================================================
//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE DIRIGE USUARIOS AL LOGIN (index.html)
//* ---------------------------------------------------------------------------------------------
const redirectToLogin = () => {
 document.location.href = 'index.html';
};
//* ---------------------------------------------------------------------------------------------

//* FUNCIÓN QUE DIRIGE USUARIOS AL SEARCH HOME (search.html)
//* ---------------------------------------------------------------------------------------------
const redirectToSearch = () => {
 document.location.href = 'search.html';
};
//* ---------------------------------------------------------------------------------------------
//* FUNCIÓN QUE DIRIGE USUARIOS A FAVORITOS (favorites.html)
//* ---------------------------------------------------------------------------------------------
const redirectToFavorites = () => {
 document.location.href = 'favorites.html';
};
//* ---------------------------------------------------------------------------------------------

export { redirectToLogin, redirectToSearch, redirectToFavorites };
//* ===============================================================================================