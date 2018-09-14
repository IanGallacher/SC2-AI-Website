import React from "react";
import PropTypes from "prop-types";

export const Dropdown = props => {
  return (
    <select
      name={props.name}
      className={`input-dropdown ${props.className}`}
      group={props.group}
      id={props.id}
      onChange={props.onChange}
    >
      { props.options.map(
        opt => <DropdownOption key={opt.id} value={opt.id} label={opt.name}/>
      )}
    </select>
  );
};
Dropdown.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  group: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
};

export const DropdownOption = props => {
  return <option value={props.value}>{props.label}</option>;
};
DropdownOption.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export const TextInput = props => {
  return <div className="input-container">
    { props.error && <div className="tooltip-error">{props.error}</div> }
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      group={props.group}
      className={"input-text " + (props.error && "error")}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  </div>;
};
TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  group: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};


export const PrimaryButton = props => {
  return (
    <button name={props.name}
      id={props.id}
      className="btn btn-lg btn-primary"
      type="submit">
      {props.label}
    </button>
  );
};
PrimaryButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string
};

export const RadioButton = props => {
  return <label htmlFor={props.id} className="radioButtonContainer">
    {props.label}
    <input
      id={props.id}
      name={props.name}
      defaultChecked={PropTypes.defaultChecked}
      className="radioButton"
      type="radio"
      value={props.value}
      onChange={props.onChange}
    />
  </label>;
};
RadioButton.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  defaultChecked: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export const Slider = props => {
  let checked_class = props.toggled ? "checked" : "";
  return <label className="switch">
    <div className={`slider-label ${checked_class}`}>{props.label}</div>
    <input
      type="checkbox"
      defaultChecked={props.toggled}
      onChange={props.onChange}
    />
    <span className="slider"></span>
  </label>;
};
Slider.propTypes = {
  toggled: PropTypes.bool,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func
};
