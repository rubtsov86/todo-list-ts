import React from "react";

interface IProps {
  onClick: () => void;
}

export const AddButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      Add Task
    </button>
  );
};
