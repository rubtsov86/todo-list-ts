import React from "react";
import { ITask } from "../../interfaces/ITask";
import { format, isValid } from "date-fns";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import css from "./TodoListItem.module.css";

interface IProps {
  task: ITask;
  onChange: (id: string) => void;
  onDelete: (taskId: string) => void;
  onShowModal: (type: string, id: string) => void;
}

export const TodoListItem: React.FC<IProps> = ({
  task,
  onChange,
  onDelete,
  onShowModal,
}) => {
  const { title, status, id, date } = task;
  console.log(typeof date);
  return (
    <li className={css.listItem}>
      <div className={css.checkboxContainer}>
        <input
          type="checkbox"
          checked={status === "complete" ? true : false}
          onChange={() => onChange(id)}
          className={css.checkbox}
        />
        <div className={css.titleContainer}>
          <p className={css.itemTitle}>{title}</p>
          <p className={css.itemDate}>
            {isValid(date) && format(date, "hh a, MM/dd/yyyy")}
          </p>
        </div>
      </div>

      <div>
        <button
          className={css.Button}
          type="button"
          onClick={() => onShowModal("edit", id)}
        >
          <AiFillEdit className={css.Icon} />
        </button>

        <button
          className={`${css.Button} ${css.ButtonMargin}`}
          type="button"
          onClick={() => onDelete(id)}
        >
          <AiOutlineDelete className={css.Icon} />
        </button>
      </div>
    </li>
  );
};
