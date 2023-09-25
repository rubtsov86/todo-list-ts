import React from "react";

interface IProps {
  onClick: (type: string) => void;
}

export const AddButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={() => onClick("add")}>
      Add Task
    </button>
  );
};
