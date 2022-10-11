import React, { Component } from "react";
import Joi from "joi-browser";
import warn from "../../../asset/warning.svg";
import { DotLoader } from "react-spinners";

class Form extends Component {
  state = {
    data: {},
    errors: {},

    loading: false,
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    errors[error.details[0].path[0]] = error.details[0].message;

    const ref = this.ref[error.details[0].path[0] + "Ref"].current;

    ref && ref.focus();

    return errors;
  };

  handleSubmit = () => {
    this.setState({ errors: {} });

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.goNextStep();
  };

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;
    data[input.name] = input.value;
    this.setState({ errors: {} });
  };

  renderButton(label) {
    const { loading } = this.state;
    return (
      <button onClick={() => this.handleSubmit()}>
        {loading ? <DotLoader size={20} color="white" /> : label}
      </button>
    );
  }

  printError(name) {
    return (
      this.state.errors[name] && (
        <div className="error-message">
          <img src={warn} />
          <p>{this.state.errors[name].replaceAll('"', "")}</p>
        </div>
      )
    );
  }

  renderInput(ref, label, indicator, type = "text") {
    return (
      <div className="input-container">
        <input
          className="input-container__input"
          ref={ref}
          name={label}
          id={label}
          type={type}
          value={this.state.data[label]}
          onChange={(e) => this.handleChange(e)}
        />

        <span
          className={`${
            this.state.data[label] && this.state.data[label].length > 0
              ? "active"
              : ""
          }`}
        >
          {indicator}
        </span>

        {this.printError(label)}
      </div>
    );
  }

  renderTextArea(ref, label, indicator, type = "text") {
    return (
      <div className="input-container --textarea">
        <textarea
          className="input-container__input "
          ref={ref}
          name={label}
          id={label}
          type={type}
          value={this.state.data[label]}
          onChange={(e) => this.handleChange(e)}
        />

        <span
          className={`${
            this.state.data[label] && this.state.data[label].length > 0
              ? "active"
              : ""
          }`}
        >
          {indicator}
        </span>

        {this.printError(label)}
      </div>
    );
  }
}

export default Form;