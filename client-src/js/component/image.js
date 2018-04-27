import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import FileUpload from './../component/file-upload.js'
import { ModalContext } from './../context/modal-context.js'

function editImage(edit_url) {
  return <React.Fragment>
    <div>Upload an avatar:</div>
    <FileUpload label="Upload Avatar:" uploadPath={edit_url}/>
  </React.Fragment>
}

export const Image = (props) => {
  return (props.img) ? (
      <img className={props.className} src={props.img}/>
    ) : (
      <img className={props.className} src={props.fallback}/>
    )
}

export const EditableImage = (props) => {
  let edit_class = (props.editing) ? "img-edit" : "";
  return ( <ModalContext.Consumer>{modal => <div
    // If we are in edit mode and the image was clicked, open a modal to edit.
    onClick={()=>props.editing && modal.showModal(editImage(props.edit_url))}
    className={`fa img-container ${edit_class}`}> {
        (props.img) ? (
          <img className={props.className} src={props.img}/>
        ) : (
          <img className={props.className} src={props.fallback}/>
        ) }
      </div>
    }</ModalContext.Consumer> )
}
