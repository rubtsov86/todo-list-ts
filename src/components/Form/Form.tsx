import React from "react";
import { Formik, Field } from "formik";
import { nanoid } from "nanoid";
import { ITask } from "../../interfaces/ITask";

interface IProps {
  onSubmit: (newTask: ITask, type: string) => void;
  type: string;
  onFindTaskToUpdate: () => ITask;
}

export class Form extends React.Component<IProps> {
  onSetType = (type: string) => {
    return {
      title: type === "add" ? "Add TODO" : "Update TODO",
      taskTitle: type === "add" ? "" : "Update TODO",
      buttonName: type === "add" ? "Add task" : "Update task",
    };
  };

  render() {
    const task = this.props.onFindTaskToUpdate();
    const { date } = task;

    return (
      <div>
        <h2>{this.onSetType(this.props.type).title}</h2>
        <Formik<ITask>
          initialValues={{
            title: `${task.title}`,
            status: `${task.status}`,
            id: `${task.id}`,
            date: date,
          }}
          onSubmit={({ title, status }: ITask, actions) => {
            this.props.onSubmit(
              {
                title,
                status,
                id: nanoid(),
                date: new Date(),
              },
              this.props.type
            );

            actions.resetForm();
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
              />

              <Field
                as="select"
                name="status"
                onChange={handleChange}
                value={values.status}
              >
                <option value="incomplete">incomplete</option>
                <option value="complete">complete</option>
              </Field>

              <button type="submit" disabled={isSubmitting}>
                {this.onSetType(this.props.type).buttonName}
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
