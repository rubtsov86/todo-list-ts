import React from "react";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import { ITask } from "../../interfaces/ITask";

interface IProps {
  tasks: ITask[];
  onChange: (id: string) => void;
  onDelete: (taskId: string) => void;
  onShowModal: (type: string) => void;
}

export const TodoList: React.FC<IProps> = ({
  tasks,
  onChange,
  onDelete,
  onShowModal,
}) => {
  return (
    <>
      <ul>
        {tasks.map((task) => (
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
