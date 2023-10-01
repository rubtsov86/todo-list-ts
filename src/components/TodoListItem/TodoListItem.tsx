import React from "react";
import { ITask } from "../../interfaces/ITask";
import { format, isValid, parseISO } from "date-fns";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import css from "./TodoListItem.module.css";
import svg from "./checked.svg";

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
  const parsedDate = Date.parse(date);

  console.log(new Date(parsedDate));

  const newDate = new Date(parsedDate);
  return (
    <li className={css.listItem}>
      <div className={css.checkboxContainer}>
        <input
          type="checkbox"
          checked={status === "complete" ? true : false}
          onChange={() => onChange(id)}
          className={`${css.checkbox__input} ${css.visuallyHidden}`}
        />
        <button
          style={{
            backgroundColor: status === "complete" ? "#646ff0" : "#dedfe1",
          }}
          className={css.checkbox}
          onClick={() => onChange(id)}
        >
          {status === "complete" && <img src={svg} />}
        </button>
        <div className={css.titleContainer}>
          <p
            style={{
              textDecoration: status === "complete" ? "line-through" : "none",
            }}
            className={css.itemTitle}
          >
            {title}
          </p>
          <p className={css.itemDate}>{format(newDate, "hh a, MM/dd/yyyy")}</p>
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
