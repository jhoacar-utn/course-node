/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/**
 * Funcion encargada de extraer la informacion
 * del DOM para las monedas y los multiplicadores
 * @return object
 */
function getCorrectMultipliers(coins, multipliers) {
  const solution = [];

  /* Primero ordenamos las monedas */
  const sortedCoins = sortDescending(coins);
  /* Ordenamos tambien los multiplicadores */
  const sortedMultipliers = sortDescending(multipliers);
  /* Extraemos los indices (posicion en el array) de las monedas ordenadas */
  const indexSortedCoins = getIndexesFromArray(coins, sortedCoins);
  /**
     * Ordenamos el array como corresponde
     * haciendo match del numero mas grande de la moneda
     * con el numero mas grande, correspondiente al multiplicador
     */
  indexSortedCoins.map((indexCoin, index) => {
    solution[indexCoin] = sortedMultipliers[index];
  });

  return solution;
}

/**
 * Esta funcion devuelve la suma de la multiplicacion de
 * las monedas con su multiplicador
 * @param {number[]} coins
 * @param {number[]} multipliers
 * @return number
 */
function getTotalFromCoinsAndMultiplier(coins, multipliers) {
  let total = 0;
  coins.map((coin, index) => total += coin * multipliers[index]);
  return total;
}

/**
 * Esta funcion devuelve una copia del array ordenado descendentemente
 * @param {number[]} array
 * @return Array
 */
function sortDescending(array) {
  /**
     * Necesitamos utilizar el metodo .slice() debido a que devolvera una copia del array
     * La funcion .sort() recibe una callback como parametro para el ordenamiento, con los siguientes requisitos:
     * - Esta callback recibe dos parametros, que seran dos elementos del array a comparar
     * - Si la callback devuelve un resultado > 0 entonces, ordena 'a' despues de 'b'
     * - Si la callback devuelve un resultado < 0 entonces, ordena 'a' antes de 'b'
     * - Si la callback devuelve un resultado === 0 entonces, mantiene el orden original de 'a' y 'b'
    */
  return array.slice().sort((a, b) => b - a);
}

/**
 * Esta funcion devuelve las posiciones del primer vector
 * que encuentra de los valores del segundo vector
 * - Tomara en cuenta el caso que existan valores repetidos en el array
 * @param {number[]} arrayA
 * @param {number[]} arrayB
 * @return Array
 */
function getIndexesFromArray(arrayA, arrayB) {
  const copyA = arrayA.slice();
  const indexes = [];

  for (let i = 0; i < arrayB.length; i++) {
    const index = copyA.indexOf(arrayB[i]);
    indexes.push(index);
    // Lo borramos directamente del array para evitar repetidos
    delete copyA[index];
  }
  return indexes;
}
