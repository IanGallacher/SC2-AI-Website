import React from "react";

export const ModalContext = React.createContext(
  {
    closeModal: () => {},
    showModal: () => {}
  }
);
