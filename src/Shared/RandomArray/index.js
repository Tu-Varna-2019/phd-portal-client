/**
 * Generates an array of numbers in increasing order with a specified start and end value.
 * @param {number} start - The starting value of the array.
 * @param {number} end - The ending value of the array.
 * @returns {Array} The array of numbers in increasing order.
 */
export const randomArray = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
