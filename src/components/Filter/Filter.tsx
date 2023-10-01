import React from "react";
import css from "./Filter.module.css";

interface IState {
  status: string;
}

interface IProps {
  onChangeFilter: (filter: string) => void;
  filter: string;
}

export class Filter extends React.Component<IProps, IState> {
  // state = {
  //   status: "All",
  // };

  onChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectRef = e.target as HTMLSelectElement;
    this.props.onChangeFilter(selectRef.value);
    // this.setState({ status: selectRef.value });
  };

  render() {
    return (
      <select
        name="status"
        value={this.props.filter}
        onChange={this.onChange}
        className={css.select}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
    );
  }
}
