import React from "react";
import { Formik, Field } from "formik";
import { nanoid } from "nanoid";
import { ITask } from "../../interfaces/ITask";
import css from "./Form.module.css";

interface IProps {
  onSubmit: (newTask: ITask, type: string) => void;
  type: string;
  onFindTaskToUpdate: () => ITask;
  onClose: () => void;
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
      <div className={css.containerForm}>
        <h2 className={css.titleForm}>
          {this.onSetType(this.props.type).title}
        </h2>
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
              <label htmlFor="title" className={css.labelForm}>
                Title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={values.title}
                className={css.inputForm}
              />
              <label htmlFor="status" className={css.labelForm}>
                Status
              </label>
              <Field
                as="select"
                name="status"
                id="status"
                onChange={handleChange}
                value={values.status}
                className={css.inputForm}
              >
                <option value="incomplete">incomplete</option>
                <option value="complete">complete</option>
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${css.buttonForm} ${css.primaryButton}`}
              >
                {this.onSetType(this.props.type).buttonName}
              </button>
              <button
                type="button"
                className={`${css.buttonForm} ${css.secondaryButton}`}
                onClick={this.props.onClose}
              >
                Cancel
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
