import { randomNIE, randomNIF } from "better-dni";
import { useEffect, useId, useState, type ChangeEvent } from "react";
import { CopyButton } from "./CopyButton";
import { Figure } from "./Figure";
import { LETTERS, isNIEPrefix, read, verdict, type Reading } from "./parse";
import { Stamp } from "./Stamp";

const EXAMPLE = "X1302311M";
const INSTALL = "npm i better-dni";

const BENCHMARK = [
  { lib: "better-dni", method: "isValid", ms: 84, time: "84 ms", diff: "" },
  {
    lib: "dni-js",
    method: "isValid",
    ms: 859,
    time: "859 ms",
    diff: "×10.23 slower",
  },
  {
    lib: "dni-js-validator",
    method: "isValid",
    ms: 980,
    time: "980 ms",
    diff: "×11.67 slower",
  },
  {
    lib: "@willowi/validate-nif",
    method: "validateNif",
    ms: 4240,
    time: "4.24 s",
    diff: "×50.48 slower",
  },
];
const SLOWEST = Math.max(...BENCHMARK.map((row) => row.ms));

const SECTIONS = ["fig-1", "fig-2", "fig-3", "claims"];

function useCurrentSection() {
  const [current, setCurrent] = useState(SECTIONS[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return current;
}

function SectionHead({
  id,
  fig,
  title,
}: {
  id: string;
  fig?: string;
  title: string;
}) {
  return (
    <div className="section-head">
      <h2 id={id} className="section-heading">
        {fig && <span className="fig-title">{fig}</span>}
        <span className="section-title">{title}</span>
      </h2>
      <div className="crosshair-rule" aria-hidden="true" />
    </div>
  );
}

function Bool({ value }: { value: boolean }) {
  return (
    <span className={value ? "bool is-true" : "bool"}>{String(value)}</span>
  );
}

function ReferenceTable({
  reading,
  example,
}: {
  reading: Reading;
  example: boolean;
}) {
  const dash = <span className="muted">—</span>;
  const letterFlag = Boolean(
    reading.letter && reading.expected && reading.letter !== reading.expected,
  );
  return (
    <table className={example ? "reference is-example" : "reference"}>
      <caption className={example ? "reference-note" : "sr-only"}>
        {example
          ? `Example readings for ${reading.normalized}`
          : "Reference numerals for figure 1"}
      </caption>
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Part</th>
          <th scope="col">Reading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10</td>
          <th scope="row">Prefix</th>
          <td>
            {!reading.shaped
              ? dash
              : !reading.prefix
                ? "none · NIF"
                : isNIEPrefix(reading.prefix)
                  ? `${reading.prefix} → ${reading.digits[0]} · NIE`
                  : `${reading.prefix} → dropped · NIF`}
          </td>
        </tr>
        <tr>
          <td>12</td>
          <th scope="row">Body</th>
          <td>{reading.body || dash}</td>
        </tr>
        <tr className={letterFlag ? "is-flagged" : undefined}>
          <td>14</td>
          <th scope="row">ctrlChar()</th>
          <td>{reading.expected ?? dash}</td>
        </tr>
        <tr>
          <td>16</td>
          <th scope="row">normalize()</th>
          <td>{`"${reading.normalized}"`}</td>
        </tr>
        <tr>
          <td>18</td>
          <th scope="row">isValid()</th>
          <td>
            <Bool value={reading.isValid} />
          </td>
        </tr>
        <tr>
          <td>20</td>
          <th scope="row">isNIE()</th>
          <td>
            <Bool value={reading.isNIE} />
          </td>
        </tr>
        <tr>
          <td>22</td>
          <th scope="row">isNIF()</th>
          <td>
            <Bool value={reading.isNIF} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function ControlTable({
  reading,
  example,
}: {
  reading: Reading;
  example: Reading;
}) {
  const shown = reading.complete ? reading : example;
  const isExample = !reading.complete;
  return (
    <section className="sheet-section" id="fig-2" aria-labelledby="fig-2-title">
      <SectionHead id="fig-2-title" fig="Fig. 2" title="Control letter table" />
      <p className="section-lede">
        Swap an NIE’s X, Y or Z for 0, 1 or 2, drop the K, L or M of a NIF,
        divide the number by 23, and the remainder picks one of twenty-three
        letters.
      </p>
      <ol className="letters" aria-label="Remainder to letter table">
        {LETTERS.split("").map((letter, i) => (
          <li
            key={letter}
            className={shown.remainder === i ? "is-on" : undefined}
          >
            <span className="letters-index">{i}</span>
            <span className="letters-letter">{letter}</span>
          </li>
        ))}
      </ol>
      <p className="worked">
        {isExample && <span className="worked-tag">Example</span>}
        <span className="mono">
          {shown.digits} mod 23 = {shown.remainder} →{" "}
          <span className="carmine">{shown.expected}</span>
        </span>
      </p>
    </section>
  );
}

function Benchmark() {
  return (
    <section className="sheet-section" id="fig-3" aria-labelledby="fig-3-title">
      <SectionHead id="fig-3-title" fig="Fig. 3" title="isValid, timed" />
      <p className="section-lede">
        10,000,000 calls per method, median of 3 runs. MacBook Pro M3 Pro, Node
        v22.22.0. Reproduce with <code>pnpm --filter better-dni benchmark</code>
        .
      </p>
      <table className="bench">
        <caption className="sr-only">
          isValid benchmark, lower is faster
        </caption>
        <thead>
          <tr>
            <th scope="col">Library</th>
            <th scope="col">Method</th>
            <th scope="col" className="bench-bar-col">
              Time
            </th>
            <th scope="col">Against better-dni</th>
          </tr>
        </thead>
        <tbody>
          {BENCHMARK.map((row) => (
            <tr
              key={row.lib}
              className={row.lib === "better-dni" ? "is-subject" : undefined}
            >
              <th scope="row">{row.lib}</th>
              <td className="mono">#{row.method}</td>
              <td className="bench-bar-col">
                <span className="bench-cell">
                  <span
                    className="bench-bar"
                    style={{ width: `${(row.ms / SLOWEST) * 100}%` }}
                  />
                  <span className="bench-time">{row.time}</span>
                </span>
              </td>
              <td>{row.diff || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="footnote">
        Not every method wins: on <code>ctrlChar</code>, dni-js’s{" "}
        <code>getControlDigit</code> is ×1.13 faster (313 ms against 355 ms).
      </p>
    </section>
  );
}

const CLAIMS = [
  {
    fn: "isValid(value)",
    claim:
      "returns true when value is a valid DNI, either NIE or NIF, including the K, L and M NIFs.",
    example: 'isValid("Z7662566Y"); //=> true\nisValid("K1111111G"); //=> true',
  },
  {
    fn: "isNIF(value) / isNIE(value)",
    claim: "as in claim 1, restricted to one kind of document.",
    example: 'isNIF("06672804K"); //=> true\nisNIE("X1302311M"); //=> true',
  },
  {
    fn: "ctrlChar(value)",
    claim:
      "returns the control letter in upper case, with or without the letter present.",
    example: 'ctrlChar("X1302311"); //=> "M"',
  },
  {
    fn: "normalize(value)",
    claim: "strips spaces, dashes and underscores and upper-cases the rest.",
    example: 'normalize(" x-9464186_p "); //=> "X9464186P"',
  },
  {
    fn: "randomNIF() / randomNIFWith(letter, seed?)",
    claim:
      "generates a valid NIF, optionally ending in a chosen letter; a seed returns the same NIF every time.",
    example: 'randomNIFWith("G", 1); //=> "95652174G"',
  },
  {
    fn: "randomNIE() / randomNIEWith(first, letter, seed?)",
    claim: "as in claim 5, for an NIE with a chosen first and control letter.",
    example: 'randomNIEWith("X", "E", 1); //=> "X2080280E"',
  },
];

function Claims() {
  return (
    <section
      className="sheet-section"
      id="claims"
      aria-labelledby="claims-title"
    >
      <SectionHead id="claims-title" title="What is claimed is" />
      <div className="claims-grid">
        <ol className="claims">
          {CLAIMS.map((c) => (
            <li key={c.fn}>
              <p>
                <code className="claim-fn">{c.fn}</code> {c.claim}
              </p>
              <pre>
                <code>{c.example}</code>
              </pre>
            </li>
          ))}
        </ol>
        <aside className="install-block" aria-labelledby="install-title">
          <h3 id="install-title" className="label">
            Installation
          </h3>
          {[
            "npm i better-dni",
            "pnpm add better-dni",
            "yarn add better-dni",
          ].map((cmd) => (
            <div className="install-row" key={cmd}>
              <code>{cmd}</code>
              <CopyButton
                text={cmd}
                className="control control-small"
                label={`Copy ${cmd}`}
              >
                Copy
              </CopyButton>
            </div>
          ))}
          <h3 className="label">Version 5</h3>
          <ul className="v5">
            <li>Node.js 20 or newer</li>
            <li>ES modules and CommonJS</li>
            <li>Bundled TypeScript types</li>
            <li>Import from the package root only</li>
            <li>API unchanged from v4</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function App() {
  const [value, setValue] = useState("");
  const inputId = useId();
  const verdictId = useId();
  const empty = value.trim() === "";
  const reading = read(empty ? EXAMPLE : value);
  const example = read(EXAMPLE);
  const live = read(value);
  const current = useCurrentSection();
  const navLink = (id: string, label: string) => (
    <a href={`#${id}`} aria-current={current === id ? "location" : undefined}>
      {label}
    </a>
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <div className="sheet">
      <span className="reg reg-tl" aria-hidden="true" />
      <span className="reg reg-tr" aria-hidden="true" />
      <span className="reg reg-bl" aria-hidden="true" />
      <span className="reg reg-br" aria-hidden="true" />

      <header className="title-block">
        <a
          className="monogram"
          href="#top"
          aria-label="Better DNI, back to top"
        >
          <span>B</span>
          <span>D</span>
        </a>
        <div className="title-name">
          <span className="title-main">Better DNI</span>
          <span className="label">Spanish ID validation · npm</span>
        </div>
        <nav className="title-nav" aria-label="Sheet">
          {navLink("fig-1", "Fig. 1")}
          {navLink("fig-2", "Fig. 2")}
          {navLink("fig-3", "Fig. 3")}
          {navLink("claims", "Claims")}
          <a
            href="https://github.com/singuerinc/better-dni"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
        <dl className="title-meta">
          <div>
            <dt>Sheet</dt>
            <dd>1 of 1</dd>
          </div>
          <div>
            <dt>Package</dt>
            <dd>better-dni 5.0.0</dd>
          </div>
          <div>
            <dt>License</dt>
            <dd>MIT</dd>
          </div>
        </dl>
      </header>

      <main id="top">
        <div className="first">
          <aside className="margin" aria-label="Filing details">
            <dl>
              <div>
                <dt>Inventor</dt>
                <dd>
                  <a
                    href="https://github.com/singuerinc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @singuerinc
                  </a>
                </dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>897 B min + brotli</dd>
              </div>
              <div>
                <dt>Runtime</dt>
                <dd>Node ≥ 20 · browser</dd>
              </div>
              <div>
                <dt>Formats</dt>
                <dd>ESM · CJS · TS types</dd>
              </div>
            </dl>
            <Stamp
              key={live.isValid ? live.normalized : "pending"}
              className="stamp-margin"
              valid={live.isValid}
              kind={live.isNIE ? "NIE" : live.isNIF ? "NIF" : null}
            />
          </aside>

          <section className="claim" aria-labelledby="claim-title">
            <h1 id="claim-title" className="display">
              Every DNI, checked to the letter.
            </h1>
            <div className="crosshair-rule" aria-hidden="true" />
            <p className="lede">
              Better DNI validates Spanish NIF and NIE numbers, including the K,
              L and M NIFs issued to minors and people without a DNI or NIE. It
              works out the control letter and generates valid IDs for your
              tests. <code>isValid</code> runs about 10× faster than{" "}
              <span className="nowrap">dni-js</span>, in 897 bytes.
            </p>
            <div className="actions">
              <CopyButton
                text={INSTALL}
                className="control control-primary"
                label={`Copy ${INSTALL}`}
              >
                <span className="mono">{INSTALL}</span>
                <span className="control-hint">Copy</span>
              </CopyButton>
              <a className="control" href="#claims">
                Read the claims
              </a>
            </div>
          </section>

          <section className="fig-1" id="fig-1" aria-labelledby="fig-1-title">
            <div className="fig-head">
              <h2 id="fig-1-title" className="fig-title">
                Fig. 1
              </h2>
              <span className="label">
                {empty ? "Exploded view · example" : "Exploded view"}
              </span>
            </div>
            <label className="label field-label" htmlFor={inputId}>
              Part number: type or paste a DNI, NIE or NIF
            </label>
            <input
              id={inputId}
              className="field"
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={EXAMPLE}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-describedby={verdictId}
            />
            <Figure reading={reading} example={empty} />
            <div className="verdict-row">
              <p
                id={verdictId}
                className={`verdict${live.isValid ? " is-valid" : ""}`}
                role="status"
              >
                {empty
                  ? `Example ${EXAMPLE}: a valid NIE. Your turn.`
                  : verdict(live)}
              </p>
              <Stamp
                key={live.isValid ? live.normalized : "pending"}
                className="stamp-fig"
                valid={live.isValid}
                kind={live.isNIE ? "NIE" : live.isNIF ? "NIF" : null}
              />
            </div>
          </section>

          <aside className="numerals" aria-labelledby="numerals-title">
            <h2 id="numerals-title" className="label">
              Reference numerals
            </h2>
            <ReferenceTable reading={empty ? example : live} example={empty} />
            <div className="generators">
              <span className="label">Generate a valid ID</span>
              <button
                type="button"
                className="control"
                onClick={() => setValue(randomNIF())}
              >
                <span className="mono">randomNIF()</span>
              </button>
              <button
                type="button"
                className="control"
                onClick={() => setValue(randomNIE())}
              >
                <span className="mono">randomNIE()</span>
              </button>
            </div>
          </aside>
        </div>

        <ControlTable reading={live} example={example} />
        <Benchmark />
        <Claims />
      </main>

      <footer className="title-block title-block-foot">
        <p>
          Drawn by{" "}
          <a
            href="https://github.com/singuerinc"
            target="_blank"
            rel="noopener noreferrer"
          >
            @singuerinc
          </a>{" "}
          · MIT licence
        </p>
        <p>
          Algorithm reference:{" "}
          <a
            href="https://www.interior.gob.es/opencms/ca/servicios-al-ciudadano/tramites-y-gestiones/dni/calculo-del-digito-de-control-del-nif-nie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ministerio del Interior
          </a>
        </p>
        <p>
          Related:{" "}
          <a
            href="https://github.com/singuerinc/spain-phone"
            target="_blank"
            rel="noopener noreferrer"
          >
            spain-phone
          </a>
        </p>
      </footer>
    </div>
  );
}
