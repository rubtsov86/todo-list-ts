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
}

class App extends React.Component<{}, IState> {
  state: IState = {
    tasks: [],
    showModal: "",
  };

  onShowModal = (type: string) => {
    this.setState({ showModal: type });
  };

  onSubmit = (newTask: ITask) => {
    this.setState((prevState) => {
      return { tasks: [...prevState.tasks, newTask], showModal: "" };
    });
  };

  onChangeStatus = (id: string) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === id
        ? { ...task, status: this.toggleStatus(task.status) }
        : task
    ) as ITask[];

    console.log(updatedTasks);

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

  render() {
    return (
      <div className="App">
        <h1>todo list</h1>

        <AddButton onClick={this.onShowModal} />
        <Filter />
        {this.state.showModal && (
          <Modal>
            <Form onSubmit={this.onSubmit} />
          </Modal>
        )}

        <TodoList
          tasks={this.state.tasks}
          onChange={this.onChangeStatus}
          onDelete={this.onDelete}
          onShowModal={this.onShowModal}
        />
      </div>
    );
  }
}

export default App;
