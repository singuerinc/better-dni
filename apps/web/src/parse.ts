import { ctrlChar, isNIE, isNIF, isValid, normalize } from "better-dni";
import { t } from "./i18n";

export const LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

/** NIE prefixes become a digit; the K, L and M of a NIF are dropped. */
const PREFIX_DIGIT: Record<string, string> = {
  X: "0",
  Y: "1",
  Z: "2",
  K: "",
  L: "",
  M: "",
};
const SHAPE = /^([XYZKLM])?(\d{0,8})([A-Z])?$/;

export const isNIEPrefix = (prefix: string): boolean => "XYZ".includes(prefix);

export type Reading = {
  raw: string;
  normalized: string;
  /** False when the normalized value cannot be split into prefix, body and letter. */
  shaped: boolean;
  prefix: string;
  body: string;
  /** Body with the prefix swapped for its digit (or dropped), the number taken mod 23. */
  digits: string;
  letter: string;
  /** True once the body has every digit (7 for an NIE, 8 for a NIF). */
  complete: boolean;
  /** Digits mod 23, once complete. */
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
  const digits = (PREFIX_DIGIT[prefix] ?? "") + body;

  return {
    raw,
    normalized,
    shaped: Boolean(match),
    prefix,
    body,
    digits,
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
  const { verdict: v } = t;
  if (!reading.raw.trim()) return v.awaiting;
  if (!reading.shaped) return v.unshaped(reading.normalized);
  if (!reading.complete) {
    return v.missing((reading.prefix ? 7 : 8) - reading.body.length);
  }
  if (!reading.letter) return v.noLetter(reading.expected ?? "");
  if (reading.isValid)
    return v.valid(reading.normalized, reading.isNIE ? "NIE" : "NIF");
  if (reading.letter !== reading.expected) {
    return v.wrongLetter(reading.letter, reading.expected ?? "");
  }
  return v.rewrite(
    reading.normalized,
    `${reading.prefix}${reading.body}${reading.expected}`,
  );
}
