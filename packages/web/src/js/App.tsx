import { isNIE, isNIF, isValid, randomNIF, randomNIE } from "better-dni";
import * as React from "react";
import { Check } from "./Check";

const examplesNIF = Array(5)
  .fill(0)
  .map(randomNIF);
const examplesNIE = Array(5)
  .fill(0)
  .map(randomNIE);

class App extends React.Component {
  state = {
    value: ""
  };
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value: string = event.target.value;
    this.setState({ value });
  }

  handleClick = (type) => (e) => {
    e.preventDefault();
    this.setState({
      value: type === "nie" ? randomNIE() : randomNIF()
    });
  };

  render() {
    const { value } = this.state;
    const isValidVal = isValid(value);
    const isNIEVal = isNIE(value);
    const isNIFVal = isNIF(value);

    return (
      <form className="black-80 w-100 w-50-l center">
        <div>
          <input
            className="input-reset f2 f1-ns ba b--black-10 bg-black pa2 mb2 db w-100 near-white fw6 tc"
            type="text"
            placeholder="XXXXXXXX"
            value={value}
            onChange={this.handleChange}
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
              className="w-100 tc f6 link dim br1 ba bw1 ph3 pv2 mb2 dib near-black"
              onClick={this.handleClick("nie")}
            >
              Random NIE
            </a>
          </div>
          <div className="w-100 w-50-l pl1-l">
            <a
              href="#"
              className="w-100 tc f6 link dim br1 ba bw1 ph3 pv2 mb2 dib near-black"
              onClick={this.handleClick("nif")}
            >
              Random NIF
            </a>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-100 w-50-l f5 black-30 tc">
            {examplesNIE.join(", ")}
          </div>
          <div className="w-100 w-50-l f5 black-30 tc">
            {examplesNIF.join(", ")}
          </div>
        </div>
      </form>
    );
  }
}

export { App };
