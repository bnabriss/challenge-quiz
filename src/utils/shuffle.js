/**
 * Shuffles array in place.
 * @ref https://stackoverflow.com/a/6274381/3745789
 * @param {Array} a items An array containing the items.
 * @returns {Array}
 */
export default  (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;

}
