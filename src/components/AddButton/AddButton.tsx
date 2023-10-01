import React from "react";
import css from "../Form/Form.module.css";

interface IProps {
  onClick: (type: string) => void;
}

export const AddButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick("add")}
      className={`${css.buttonForm} ${css.primaryButton}`}
    >
      Add Task
    </button>
  );
};
