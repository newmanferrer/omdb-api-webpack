//* ===============================================================================================
//* PATRONES DE EXPRESIONES REGULARES
//* Usado por: (form-login-data-user - form-login-validations)
//* ===============================================================================================
const patternUserName = '^([A-Za-z]{6,12})$';
const patternPassword = '^([A-Za-z0-9]{6,8})$';
//* ===============================================================================================

export { patternUserName, patternPassword };
