import React from "react";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import { ITask } from "../../interfaces/ITask";
import css from "./TodoList.module.css";

interface IProps {
  tasks: ITask[];
  onChange: (id: string) => void;
  onDelete: (taskId: string) => void;
  onShowModal: (type: string, id: string) => void;
}

export const TodoList: React.FC<IProps> = ({
  tasks,
  onChange,
  onDelete,
  onShowModal,
}) => {
  return (
    <>
      <ul className={css.List}>
        {tasks.length === 0 && <li className={css.Sceleton}>No Todos</li>}
        {tasks.length !== 0 &&
          tasks.map((task) => (
            <TodoListItem
              key={task.title}
              task={task}
              onChange={onChange}
              onDelete={onDelete}
              onShowModal={onShowModal}
            />
          ))}
      </ul>
    </>
  );
};
