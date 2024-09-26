/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/**
 * Procedemos a requerir el modulo para crear un socket
 */
const net = require('net');

/**
 * Definimos un objeto con la informacion para la conexion
 */
const optionsConection = {
  port: 8888,
};

/**
 * Creamos el socket de conexion al servidor, usando el metodo
 * .connect() que tambien podriamos usar el metodo .createConnection()
 * y le especificamos el objeto con las opciones para la conexion y
 * como segundo parametro una callback para proceder a manejar la conexion
 * cuando sea exitosa
 */
net.connect(optionsConection, handleConnection);

/**
 * Cuando la conexion se realice se invocara esta funcion
 * para ello procedemos a crear la logica para enviar data
 */
function handleConnection() {
  console.log('Conexion al servidor exitosa');

  /**
     * Llegados a este punto es importante entender el porque
     * el uso de una function y no una arrow function ()=>{},
     * esto debido a que podemos hacer uso de una variable llamada
     * this que contendra todo el contexto en el que se encuentra
     * para aprovecharme asi de funciones tales como:
     * - .write() Me permite escribir informacion en el socket
     * - .on() Me permite registrar callbacks a eventos que se vayan a emitir
     */
  this.write('Hola desde el cliente');
  /**
     * En el caso del evento "data", sera cuando el servidor proceda
     * a enviarme la informacion de respuesta
     */
  this.on('data', handleIncomingData);
  /**
     * En el caso del evento "end", sera cuando el servidor ya se haya desconectado
     */
  this.on('end', handleServerDisconnected);
}

/**
 * Esta funcion se invocara cuando el servidor haya terminado esta conexion
 */
function handleServerDisconnected() {
  console.log('Servidor desconectado');
}

/**
 * Esta funcion se invocara cuando el servidor proceda a enviar la informacion
 * @param {*} data
 */
function handleIncomingData(data) {
  console.log('Informacion recibida del servidor: ', data.toString());
}
