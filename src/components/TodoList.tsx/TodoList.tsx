import React from "react";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import { ITask } from "../../interfaces/ITask";

interface IProps {
  tasks: ITask[];
}

export const TodoList: React.FC<IProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TodoListItem key={task.title} task={task} />
      ))}
    </ul>
  );
};
