/* eslint-disable no-console */
/* eslint-disable max-len */
/**
 * Una callback es una funcion que se recibe por parametro y se invoca adentro de otra funcion
 * - Su traduccion seria "llamada de vuelta" (call-back)
 * La funcion mostrar recibe los dos primeros parametros y se los pasa a la funcion que se pase
 * por tercer parametro
 * - La funcion callback del tercer parametro recibe tambien un string con informacion
 * en el tercer parametro
 */
function mostrar(a, b, callback) {
  const resultado = callback(a, b, 'Se esta usando la funcion mostrar');
  console.log(resultado);
}

function suma(a, b) {
  return a + b;
}

function multiplicacion(a, b) {
  return a * b;
}

mostrar(1, 2, suma);

mostrar(5, 4, multiplicacion);
