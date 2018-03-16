import React from 'react'
import { render } from 'react-dom'

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
