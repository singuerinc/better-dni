/**
 * Returns a "clean" dni string removing spaces, dashes, etc.
 */
declare const normalize = (str: string) => string;
/**
 * Returns a random NIE with a specific letter
 * A seed can be passed as a third parameter and
 * it will always return the same value
 */
declare const randomNIEWith = (xyz: string, char: string, seed: number) =>
  string | null;
/**
 * Returns a random NIF with a specific letter
 * A seed can be passed as a second parameter and
 * it will always return the same value
 */
declare const randomNIFWith = (char: string, seed: number) => string | null;
/**
 * Returns the control letter in upper case
 * for a NIF or NIE with or without control letter
 */
declare const ctrlChar = (dni: string) => string;
/**
 * Returns a valid NIF string
 */
declare const randomNIF = () => string;
/**
 * Returns a valid NIE string
 */
declare const randomNIE = () => string;
/**
 * Returns true if the string is a NIE
 */
declare const isNIE: (nie: string) => boolean;
/**
 * Returns true if the string is a NIF
 */
declare const isNIF: (nif: string) => boolean;
/**
 * Returns true if the string is a valid DNI
 */
declare const isValid: (dni: string) => boolean;
export { randomNIF, randomNIE, isValid, isNIF, isNIE };
