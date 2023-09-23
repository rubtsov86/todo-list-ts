import React from "react";
import { AddButton } from "./components/AddButton/AddButton";
import { Filter } from "./components/Filter/Filter";
import { Modal } from "./components/Modal/Modal";
import { Form } from "./components/Form/Form";
import { ITask } from "./interfaces/ITask";
import { TodoList } from "./components/TodoList.tsx/TodoList";

interface IState {
  tasks: ITask[];
  showModal: boolean;
}

class App extends React.Component<{}, IState> {
  state: IState = {
    tasks: [],
    showModal: false,
  };

  onShowModal = () => {
    this.setState({ showModal: true });
  };

  onSubmit = (newTask: ITask) => {
    // const newTask = { title, status };

    this.setState((prevState) => {
      return { tasks: [...prevState.tasks, newTask] };
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
        <TodoList tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
