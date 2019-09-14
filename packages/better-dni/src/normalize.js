/**
 * Returns a "clean" dni string removing spaces, dashes, etc.
 * @param {string} value
 * @returns {string}
 * @since 2.2.0
 * @example
 * normalize(" x-9464186_p   "); // => "X9464186P"
 */
export const normalize = (str) => {
  return str.replace(/[-_\s]/gi, "").toUpperCase();
};
