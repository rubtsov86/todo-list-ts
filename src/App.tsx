import React from "react";
import { AddButton } from "./components/AddButton/AddButton";
import { Filter } from "./components/Filter/Filter";
import { Modal } from "./components/Modal/Modal";
import { Form } from "./components/Form/Form";
import { ITask } from "./interfaces/ITask";
import { TodoList } from "./components/TodoList.tsx/TodoList";
import css from "./App.module.css";

interface IState {
  tasks: ITask[];
  showModal: string;
  filter: string;
  updateTaskId: string;
}

const initialState: IState = {
  tasks: [],
  showModal: "",
  filter: "all",
  updateTaskId: "",
};

class App extends React.Component<{}, IState> {
  state = initialState;

  componentDidMount(): void {
    const tasks = localStorage.getItem("tasks");

    if (tasks) {
      const parsedTasks = JSON.parse(tasks);

      this.setState((prevState) => {
        return { ...prevState, tasks: parsedTasks };
      });
    }
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    if (prevState.tasks.length !== this.state.tasks.length) {
      window.localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  onShowModal = (type: string, id = "") => {
    this.setState({ showModal: type, updateTaskId: id });
  };

  onSubmit = (newTask: ITask, type: string) => {
    if (type === "add") {
      this.setState((prevState) => {
        return { tasks: [...prevState.tasks, newTask], showModal: "" };
      });
    }

    if (type === "edit") {
      this.setState((prevState) => {
        return {
          tasks: prevState.tasks.map((task) =>
            task.id === this.state.updateTaskId ? newTask : task
          ),
          showModal: "",
        };
      });
    }
  };

  onChangeStatus = (id: string) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === id
        ? { ...task, status: this.toggleStatus(task.status) }
        : task
    ) as ITask[];

    this.setState((prevState) => {
      return {
        tasks: updatedTasks,
      };
    });
  };

  toggleStatus = (status: string) => {
    return status === "incomplete" ? "complete" : "incomplete";
  };

  onDelete = (taskId: string) => {
    this.setState((prevState) => {
      return {
        tasks: prevState.tasks.filter(({ id }) => id !== taskId),
      };
    });
  };

  onChangeFilter = (filter: string) => {
    this.setState({ filter });
  };

  onFilteredTasks = () => {
    if (this.state.filter === "all") {
      return this.state.tasks;
    }

    if (this.state.filter === "complete") {
      return this.state.tasks.filter((task) => task.status === "complete");
    } else {
      return this.state.tasks.filter((task) => task.status === "incomplete");
    }
  };

  onFindTaskToUpdate = (taskId: string): ITask => {
    const task = this.state.tasks.find(({ id }) => taskId === id);
    return task ? task : { title: "", id: "", status: "incomplete", date: "" };
  };

  onCloseModal = () => {
    this.setState({ showModal: "" });
  };

  render() {
    return (
      <div className={css.appContainer}>
        <h1 className={css.title}>todo list</h1>
        <div className={css.container}>
          <AddButton onClick={this.onShowModal} />
          <Filter
            onChangeFilter={this.onChangeFilter}
            filter={this.state.filter}
          />
        </div>

        {this.state.showModal && (
          <Modal onClose={this.onCloseModal}>
            <Form
              onSubmit={this.onSubmit}
              onClose={this.onCloseModal}
              type={this.state.showModal}
              onFindTaskToUpdate={() =>
                this.onFindTaskToUpdate(this.state.updateTaskId)
              }
            />
          </Modal>
        )}

        <TodoList
          tasks={this.onFilteredTasks()}
          onChange={this.onChangeStatus}
          onDelete={this.onDelete}
          onShowModal={this.onShowModal}
        />
      </div>
    );
  }
}

export default App;
