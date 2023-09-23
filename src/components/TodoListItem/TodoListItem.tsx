import React from "react";
import { ITask } from "../../interfaces/ITask";

interface IProps {
  task: ITask;
}

export const TodoListItem: React.FC<IProps> = ({ task }) => {
  const { title, status } = task;

  return (
    <li>
      <input type="checkbox" checked={status === "complete" ? true : false} />
    </li>
  );
};
