import React from "react";
import { ITask } from "../../interfaces/ITask";
import { format } from "date-fns";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

interface IProps {
  task: ITask;
  onChange: (id: string) => void;
  onDelete: (taskId: string) => void;
  onShowModal: (type: string) => void;
}

export const TodoListItem: React.FC<IProps> = ({
  task,
  onChange,
  onDelete,
  onShowModal,
}) => {
  const { title, status, id, date } = task;

  return (
    <li>
      <input
        type="checkbox"
        checked={status === "complete" ? true : false}
        onChange={() => onChange(id)}
      />
      {title}
      {format(date, "hh a MM/dd/yyyy")}

      <button type="button" onClick={() => onShowModal("edit")}>
        <AiFillEdit />
      </button>

      <button type="button" onClick={() => onDelete(id)}>
        <AiOutlineDelete />
      </button>
    </li>
  );
};
