import type { ReactNode } from "react";

export type Locale = "en" | "es";

/** Each page sets <html lang>; that is the only locale switch. */
export const locale: Locale =
  document.documentElement.lang === "es" ? "es" : "en";

const en = {
  numberLocale: "en-GB",
  other: { href: "/", lang: "es", label: "Español" },
  header: {
    backToTop: "Better DNI, back to top",
    tagline: "Spanish ID validation · npm",
    nav: "Sheet",
    claims: "Claims",
    sheet: "Sheet",
    sheetValue: "1 of 1",
    package: "Package",
    license: "License",
  },
  margin: {
    label: "Filing details",
    inventor: "Inventor",
    size: "Size",
    runtime: "Runtime",
    runtimeValue: "Node ≥ 20 · browser",
    formats: "Formats",
  },
  display: "Every DNI, checked to the letter.",
  lede: (
    <>
      Better DNI validates Spanish NIF and NIE numbers, including the K, L and M
      NIFs issued to minors and people without a DNI or NIE. It works out the
      control letter and generates valid IDs for your tests.{" "}
      <code>isValid</code> runs about 10× faster than{" "}
      <span className="nowrap">dni-js</span>, in 897 bytes.
    </>
  ) as ReactNode,
  readClaims: "Read the claims",
  copy: "Copy",
  copied: "Copied",
  copyLabel: (text: string) => `Copy ${text}`,
  copiedStatus: (text: string) => `${text} copied to clipboard`,
  fig1: {
    exploded: "Exploded view",
    explodedExample: "Exploded view · example",
    fieldLabel: "Part number: type or paste a DNI, NIE or NIF",
    exampleVerdict: (example: string) =>
      `Example ${example}: a valid NIE. Your turn.`,
    exampleLabel:
      "Figure 1, example: X1302311M exploded into prefix X, body 1302311 and control letter M, with leaders to normalize, isValid, isNIE and isNIF.",
    label: (value: string) =>
      `Figure 1: ${value || "empty"} exploded into its parts.`,
    digits: "digits",
  },
  numerals: {
    title: "Reference numerals",
    exampleCaption: (value: string) => `Example readings for ${value}`,
    caption: "Reference numerals for figure 1",
    no: "No.",
    part: "Part",
    reading: "Reading",
    prefix: "Prefix",
    body: "Body",
    noPrefix: "none · NIF",
    dropped: "dropped",
    generate: "Generate a valid ID",
  },
  verdict: {
    awaiting: "Awaiting a number.",
    unshaped: (value: string) => `${value} is not shaped like a DNI.`,
    missing: (n: number) => `${n} more digit${n === 1 ? "" : "s"} to go.`,
    noLetter: (expected: string) => `Control letter should be ${expected}.`,
    valid: (value: string, kind: string) => `${value} is a valid ${kind}.`,
    wrongLetter: (letter: string, expected: string) =>
      `Control letter is ${letter}, should be ${expected}.`,
    rewrite: (value: string, fixed: string) =>
      `${value} is valid once written as ${fixed}.`,
  },
  fig2: {
    title: "Control letter table",
    lede: "Swap an NIE’s X, Y or Z for 0, 1 or 2, drop the K, L or M of a NIF, divide the number by 23, and the remainder picks one of twenty-three letters.",
    tableLabel: "Remainder to letter table",
    example: "Example",
  },
  fig3: {
    title: "isValid, timed",
    lede: (
      <>
        10,000,000 calls per method, median of 3 runs. MacBook Pro M3 Pro, Node
        v22.22.0. Reproduce with <code>pnpm --filter better-dni benchmark</code>
        .
      </>
    ) as ReactNode,
    caption: "isValid benchmark, lower is faster",
    library: "Library",
    method: "Method",
    time: "Time",
    against: "Against better-dni",
    slower: (factor: string) => `×${factor} slower`,
    footnote: (
      <>
        Not every method wins: on <code>ctrlChar</code>, dni-js’s{" "}
        <code>getControlDigit</code> is ×1.13 faster (313 ms against 355 ms).
      </>
    ) as ReactNode,
  },
  claims: {
    title: "What is claimed is",
    isValid:
      "returns true when value is a valid DNI, either NIE or NIF, including the K, L and M NIFs.",
    isNIF: "as in claim 1, restricted to one kind of document.",
    ctrlChar:
      "returns the control letter in upper case, with or without the letter present.",
    normalize:
      "strips spaces, dashes and underscores and upper-cases the rest.",
    randomNIF:
      "generates a valid NIF, optionally ending in a chosen letter; a seed returns the same NIF every time.",
    randomNIE:
      "as in claim 5, for an NIE with a chosen first and control letter.",
    installation: "Installation",
    version: "Version 5",
    v5: [
      "Node.js 20 or newer",
      "ES modules and CommonJS",
      "Bundled TypeScript types",
      "Import from the package root only",
      "API unchanged from v4",
    ],
  },
  footer: {
    drawnBy: "Drawn by",
    license: "MIT licence",
    algorithm: "Algorithm reference:",
    related: "Related:",
  },
  stamp: {
    ring: "BETTER DNI · EXAMINED · BETTER DNI · EXAMINED ·",
    valid: "VALID",
    pending: "PENDING",
    /** Squeezes the pending word into the inner ring when it runs long. */
    pendingWidth: undefined as number | undefined,
  },
};

type Messages = typeof en;

const es: Messages = {
  numberLocale: "es-ES",
  other: { href: "/en/", lang: "en", label: "English" },
  header: {
    backToTop: "Better DNI, volver arriba",
    tagline: "Validación de DNI · npm",
    nav: "Hoja",
    claims: "Reivindicaciones",
    sheet: "Hoja",
    sheetValue: "1 de 1",
    package: "Paquete",
    license: "Licencia",
  },
  margin: {
    label: "Datos de la solicitud",
    inventor: "Inventor",
    size: "Tamaño",
    runtime: "Entorno",
    runtimeValue: "Node ≥ 20 · navegador",
    formats: "Formatos",
  },
  display: "Cada DNI, comprobado hasta la letra.",
  lede: (
    <>
      Better DNI valida números de NIF y NIE españoles, incluidos los NIF K, L y
      M que se asignan a menores y a personas sin DNI ni NIE. Calcula la letra
      de control y genera documentos válidos para tus tests.{" "}
      <code>isValid</code> es unas 10× más rápida que{" "}
      <span className="nowrap">dni-js</span>, en 897 bytes.
    </>
  ),
  readClaims: "Leer la patente",
  copy: "Copiar",
  copied: "Copiado",
  copyLabel: (text) => `Copiar ${text}`,
  copiedStatus: (text) => `${text} copiado al portapapeles`,
  fig1: {
    exploded: "Vista explosionada",
    explodedExample: "Vista explosionada · ejemplo",
    fieldLabel: "Número de pieza: escribe o pega un DNI, NIE o NIF",
    exampleVerdict: (example) => `Ejemplo ${example}: un NIE válido. Te toca.`,
    exampleLabel:
      "Figura 1, ejemplo: X1302311M desglosado en el prefijo X, el cuerpo 1302311 y la letra de control M, con líneas guía hacia normalize, isValid, isNIE e isNIF.",
    label: (value) => `Figura 1: ${value || "vacío"} desglosado en sus partes.`,
    digits: "dígitos",
  },
  numerals: {
    title: "Números de referencia",
    exampleCaption: (value) => `Lecturas de ejemplo para ${value}`,
    caption: "Números de referencia de la figura 1",
    no: "N.º",
    part: "Parte",
    reading: "Lectura",
    prefix: "Prefijo",
    body: "Cuerpo",
    noPrefix: "— · NIF",
    dropped: "se descarta",
    generate: "Genera un documento válido",
  },
  verdict: {
    awaiting: "Esperando un número.",
    unshaped: (value) => `${value} no tiene forma de DNI.`,
    missing: (n) => (n === 1 ? "Falta 1 dígito." : `Faltan ${n} dígitos.`),
    noLetter: (expected) => `La letra de control debería ser ${expected}.`,
    valid: (value, kind) => `${value} es un ${kind} válido.`,
    wrongLetter: (letter, expected) =>
      `La letra de control es ${letter}, debería ser ${expected}.`,
    rewrite: (value, fixed) => `${value} es válido si se escribe ${fixed}.`,
  },
  fig2: {
    title: "Tabla de letras de control",
    lede: "Cambia la X, Y o Z de un NIE por 0, 1 o 2, quita la K, L o M de un NIF, divide el número entre 23 y el resto elige una de las veintitrés letras.",
    tableLabel: "Tabla de resto a letra",
    example: "Ejemplo",
  },
  fig3: {
    title: "isValid, cronometrado",
    lede: (
      <>
        10.000.000 de llamadas por método, mediana de 3 ejecuciones. MacBook Pro
        M3 Pro, Node v22.22.0. Reprodúcelo con{" "}
        <code>pnpm --filter better-dni benchmark</code>.
      </>
    ),
    caption: "Benchmark de isValid, menos es más rápido",
    library: "Librería",
    method: "Método",
    time: "Tiempo",
    against: "Frente a better-dni",
    slower: (factor) => `×${factor} más lenta`,
    footnote: (
      <>
        No todos los métodos ganan: en <code>ctrlChar</code>, el{" "}
        <code>getControlDigit</code> de dni-js es ×1,13 más rápido (313 ms
        frente a 355 ms).
      </>
    ),
  },
  claims: {
    title: "Se reivindica",
    isValid:
      "devuelve true si value es un DNI válido, NIE o NIF, incluidos los NIF K, L y M.",
    isNIF: "como en la reivindicación 1, limitado a un solo tipo de documento.",
    ctrlChar:
      "devuelve la letra de control en mayúscula, esté o no presente la letra.",
    normalize:
      "elimina espacios, guiones y guiones bajos, y pasa el resto a mayúsculas.",
    randomNIF:
      "genera un NIF válido, opcionalmente terminado en la letra elegida; con una semilla devuelve siempre el mismo NIF.",
    randomNIE:
      "como en la reivindicación 5, para un NIE con la primera letra y la letra de control elegidas.",
    installation: "Instalación",
    version: "Versión 5",
    v5: [
      "Node.js 20 o superior",
      "Módulos ES y CommonJS",
      "Tipos de TypeScript incluidos",
      "Importa solo desde la raíz del paquete",
      "API sin cambios desde la v4",
    ],
  },
  footer: {
    drawnBy: "Dibujado por",
    license: "licencia MIT",
    algorithm: "Referencia del algoritmo:",
    related: "Relacionado:",
  },
  stamp: {
    ring: "BETTER DNI · EXAMINADO · BETTER DNI · EXAMINADO ·",
    valid: "VÁLIDO",
    pending: "PENDIENTE",
    pendingWidth: 84,
  },
};

export const t: Messages = locale === "es" ? es : en;

export const formatNumber = (n: number, digits = 2) =>
  n.toLocaleString(t.numberLocale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
