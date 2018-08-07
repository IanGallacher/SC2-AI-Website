import React from "react";

import { ModalContext } from "./../context/modal-context.js";

export function confirmDestructiveAction(destructiveAction, label) {
  label = label || "Are you sure?";
  return <ModalContext.Consumer>{modalContext => <React.Fragment>
    <div>{label}</div>
    <button name="Submit"
      id="escape-destruction"
      className="btn btn-lg btn-primary"
      type="submit"
      onClick={modalContext.closeModal}>
      Cancel
    </button>
    <button name="Submit"
      id="confirm-destruction"
      className="btn btn-lg btn-primary"
      onClick={ () => { destructiveAction(); modalContext.closeModal(); } }>
      Ok
    </button>
  </React.Fragment>}</ModalContext.Consumer>;
}
