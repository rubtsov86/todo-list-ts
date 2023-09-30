import React from "react";
import { AddButton } from "./components/AddButton/AddButton";
import { Filter } from "./components/Filter/Filter";
import { Modal } from "./components/Modal/Modal";
import { Form } from "./components/Form/Form";
import { ITask } from "./interfaces/ITask";
import { TodoList } from "./components/TodoList.tsx/TodoList";

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

  onShowModal = (type: string, id = "") => {
    this.setState({ showModal: type, updateTaskId: id });
  };

  onSubmit = (newTask: ITask, type: string) => {
    if (type === "add") {
      this.setState((prevState) => {
        return { tasks: [...prevState.tasks, newTask], showModal: "" };
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
    return task
      ? task
      : { title: "", id: "", status: "incomplete", date: new Date() };
  };

  onCloseModal = () => {
    this.setState({ showModal: "" });
  };

  render() {
    return (
      <div className="App">
        <h1>todo list</h1>

        <AddButton onClick={this.onShowModal} />
        <Filter
          onChangeFilter={this.onChangeFilter}
          filter={this.state.filter}
        />
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
