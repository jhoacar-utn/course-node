/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
const { MongoClient } = require('mongodb');

/**
 * Para crear una URI de conexion
 * Es necesario seguir la siguiente estructura
 *
 * protocolo://usuario:contraseña@dominio_o_IP:puerto/baseDeDatos
 *
 * Para el caso nuestro de MongoDB en nuestra maquina loca seria la siguiente:
 *
 * Para el usuario 'root'
 * - mongodb://root:root@localhost:27017/utn
 *
 * Para el usuario 'utn'
 * - mongodb://utn:utn@localhost:27017/utn
 */

async function main() {
  const uri = 'mongodb://utn:utn@localhost:27017/utn';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conexion exitosa');
    const result = await client.db('utn').collection('ejemplo').findOne();
    console.log("Este ha sido el resultado de la consulta hacia la coleccion 'ejemplo' de la base de datos de 'utn'");
    console.log(result);
  } catch (error) {
    console.log('Un error ha ocurrido: ', error.message);
  } finally {
    client.close();
  }
}

main();
