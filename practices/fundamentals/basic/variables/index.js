/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// comentario de una linea
/*
    Esto es un comentario
    con mas lineas
*/

/**
 * Esta variable es declarada globalmente en toda la aplicacion
 */
let miVariable;

/**
 * Esta variable es declarada solamente en un bloque de codigo
 */
let otraVariable = 'un nombre';
/**
 * Esta variable es declarada solamente en un bloque de codigo
 * pero no podra ser cambiada mas adelante
 */
const unaConstante = 'un valor';

otraVariable = 'otro nombre';

console.log(otraVariable);
