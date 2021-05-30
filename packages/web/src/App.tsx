import { isNIE, isNIF, isValid, randomNIF, randomNIE } from "better-dni";
import * as React from "react";
import { useState } from "react";
import { Check } from "./Check";

const examplesNIF = Array(5).fill(0).map(randomNIF);
const examplesNIE = Array(5).fill(0).map(randomNIE);

export function App() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const value: string = event.target.value;
    setValue(value);
  };

  const handleClick = (type: "nie" | "nif") => (e: React.MouseEvent) => {
    e.preventDefault();
    setValue(type === "nie" ? randomNIE() : randomNIF());
  };

  const isValidVal = isValid(value);
  const isNIEVal = isNIE(value);
  const isNIFVal = isNIF(value);

  return (
    <form className="pv4 w-100">
      <div>
        <input
          className="input-reset bg-transparent f2 f1-ns ba bw2 b--black pa2 mb2 near-black db w-100 fw6 tc"
          type="text"
          placeholder="XXXXXXXX"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-wrap justify-between mt4 mb2 pb4">
        <Check label="isValid" check={isValidVal} />
        <Check label="isNie" check={isNIEVal} />
        <Check label="isNIF" check={isNIFVal} />
      </div>
      <div className="flex flex-wrap">
        <div className="w-100 w-50-l pr1-l">
          <a
            href="#"
            className="code w-100 tc f4 link dim ba bw0 bg-black white ph3 pv3 mb2 dib"
            onClick={handleClick("nie")}
          >
            randomNIE()
          </a>
        </div>
        <div className="w-100 w-50-l pl1-l">
          <a
            href="#"
            className="code w-100 tc f4 link dim ba bw0 bg-black white ph3 pv3 mb2 dib"
            onClick={handleClick("nif")}
          >
            randomNIF()
          </a>
        </div>
      </div>
    </form>
  );
}
