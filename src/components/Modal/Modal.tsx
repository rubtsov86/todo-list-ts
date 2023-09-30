import React from "react";
import { createPortal } from "react-dom";

import { AiOutlineClose } from "react-icons/ai";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root") as HTMLDivElement;

type Props = {
  children: string | JSX.Element | JSX.Element[];
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  return createPortal(
    <div className={css.Overlay}>
      <div className={css.Modal}>
        {children}
        <button type="button" className={css.Button} onClick={onClose}>
          <AiOutlineClose className={css.ButtonIcon} />
        </button>
      </div>
    </div>,
    modalRoot
  );
};
