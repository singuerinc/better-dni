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
declare const isNIE: (value: string) => boolean;
/**
 * Returns true if the string is a NIF
 */
declare const isNIF: (value: string) => boolean;
/**
 * Returns true if the string is a valid DNI
 */
declare const isValid: (value: string) => boolean;
export { randomNIF, randomNIE, isValid, isNIF, isNIE };
