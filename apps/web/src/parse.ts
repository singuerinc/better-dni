import { ctrlChar, isNIE, isNIF, isValid, normalize } from "better-dni";

export const LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

const NIE_PREFIX_DIGIT: Record<string, string> = { X: "0", Y: "1", Z: "2" };
const SHAPE = /^([XYZ])?(\d{0,8})([A-Z])?$/;

export type Reading = {
  raw: string;
  normalized: string;
  /** False when the normalized value cannot be split into prefix, body and letter. */
  shaped: boolean;
  prefix: string;
  body: string;
  letter: string;
  /** True once the body has every digit (7 for an NIE, 8 for a NIF). */
  complete: boolean;
  /** Body (with the NIE prefix swapped for its digit) mod 23, once complete. */
  remainder: number | null;
  /** The control letter better-dni computes, once complete. */
  expected: string | null;
  isValid: boolean;
  isNIE: boolean;
  isNIF: boolean;
};

export function read(raw: string): Reading {
  const normalized = normalize(raw);
  const match = SHAPE.exec(normalized);
  const prefix = match?.[1] ?? "";
  const body = match?.[2] ?? "";
  const letter = match?.[3] ?? "";
  const complete = Boolean(match) && body.length === (prefix ? 7 : 8);
  const digits = (NIE_PREFIX_DIGIT[prefix] ?? "") + body;

  return {
    raw,
    normalized,
    shaped: Boolean(match),
    prefix,
    body,
    letter,
    complete,
    remainder: complete ? Number(digits) % 23 : null,
    expected: complete ? ctrlChar(prefix + body) : null,
    isValid: isValid(raw),
    isNIE: isNIE(raw),
    isNIF: isNIF(raw),
  };
}

export function verdict(reading: Reading): string {
  if (!reading.raw.trim()) return "Awaiting a number.";
  if (!reading.shaped) return `${reading.normalized} is not shaped like a DNI.`;
  if (!reading.complete) {
    const missing = (reading.prefix ? 7 : 8) - reading.body.length;
    return `${missing} more digit${missing === 1 ? "" : "s"} to go.`;
  }
  if (!reading.letter) return `Control letter should be ${reading.expected}.`;
  if (reading.isValid)
    return `${reading.normalized} is a valid ${reading.isNIE ? "NIE" : "NIF"}.`;
  if (reading.letter !== reading.expected) {
    return `Control letter is ${reading.letter}, should be ${reading.expected}.`;
  }
  return `${reading.normalized} is valid once written as ${reading.prefix}${reading.body}${reading.expected}.`;
}
