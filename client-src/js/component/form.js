import React from 'react'
import { render } from 'react-dom'

export const Dropdown = (props) => {
  return (
    <select name={props.name} className="text-input" group={props.group} id={props.id}
    onChange={props.onChange}>
      { props.options.map(
        (opt) => <DropdownOption key={opt.id} value={opt.id} label={opt.name}/>
      )}
    </select>
  );
}

export const DropdownOption = (props) => {
  return <option value={props.value}>{props.label}</option>
}

export const TextInput = (props) => {
  return (
    <div className="input-container">
      { props.error && <div className="tooltip-error">{props.error}</div> }
      <input name={props.name}
             type={props.type}
             group={props.group}
             id={props.id}
             className={"text-input " + (props.error && "error")}
             placeholder={props.placeholder}
             onChange={props.onChange}/>
    </div>
  );
}

export const RadioButton = (props) => {
  return (
    <label htmlFor={props.id} className="radioButtonContainer">
      {props.label}
      <input id={props.id}
             className="radioButton"
             type="radio"
             name={props.radioGroupName}
             value={props.value}
             onChange={props.onChange}/>
    </label>
  );
}

export const RadioButtonDefault = (props) => {
  return (
    <label htmlFor={props.id} className="radioButtonContainer">
      {props.label}
      <input id={props.id}
             defaultChecked={true}
             className="radioButton"
             type="radio"
             name={props.radioGroupName}
             value={props.value}
             onChange={props.onChange}/>
      <span></span>
    </label>
  );
}

export const Slider = (props) => {
  let checked_class = props.toggled ? "checked" : "";
  return <label className="switch">
    <div className={`slider-label ${checked_class}`}>{props.label}</div>
    <input
      type="checkbox"
      defaultChecked={props.toggled}
      onChange={props.onChange}
    />
    <span className="slider"></span>
  </label>
}
