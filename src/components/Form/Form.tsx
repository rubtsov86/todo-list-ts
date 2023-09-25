import React from "react";
import { Formik, Field } from "formik";
import { nanoid } from "nanoid";
import { ITask } from "../../interfaces/ITask";

interface IProps {
  onSubmit: (newTask: ITask) => void;
}

export class Form extends React.Component<IProps> {
  render() {
    return (
      <div>
        <Formik<ITask>
          initialValues={{
            title: "",
            status: "incomplete",
            id: "",
            date: new Date(),
          }}
          onSubmit={({ title, status }: ITask, actions) => {
            this.props.onSubmit({
              title,
              status,
              id: nanoid(),
              date: new Date(),
            });

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
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
