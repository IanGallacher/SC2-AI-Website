import React from 'react'
import { render } from 'react-dom'

export const TextInput = (props) => {
  return (
    <div className="input-container">
      { props.error && <div className="tooltip-error">{props.error}</div> }
      <input name={props.name}
             type={props.type}
             className={"text-input " + (props.error && "error")}
             placeholder={props.placeholder}
             onChange={props.onChange}/>
    </div>
  );
}
