import React from "react";
import PropTypes from "prop-types";

import FileUpload from "./file-upload.jsx";
import { ModalContext } from "./../context/modal-context.js";

function editImage(edit_url) {
  return <React.Fragment>
    <div>Upload an avatar:</div>
    <FileUpload label="Upload Avatar:" uploadPath={edit_url}/>
  </React.Fragment>;
}

export const Image = (props) => {
  return (props.img) ? (
    <img className={props.className} src={props.img}/>
  ) : (
    <img className={props.className} src={props.fallback}/>
  );
};
Image.propTypes = {
  img: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string
};

export const EditableImage = props => {
  let edit_class = (props.editing) ? "img-edit" : "";
  return <ModalContext.Consumer>{modal => <div
    // If we are in edit mode and the image was clicked, open a modal to edit.
    onClick={()=>props.editing && modal.showModal(editImage(props.edit_url))}
    // fa is font awesome, used for the pencil icon.
    className={`fa img-container ${edit_class}`}> {
      (props.img) ? (
        <img className={props.className} src={props.img}/>
      ) : (
        <img className={props.className} src={props.fallback}/>
      ) }
  </div>}
  </ModalContext.Consumer>;
};
EditableImage.propTypes = {
  img: PropTypes.string,
  edit_url: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
  editing: PropTypes.bool
};
