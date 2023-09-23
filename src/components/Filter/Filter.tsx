import React from "react";

interface IState {
  status: string;
}

export class Filter extends React.Component<{}, IState> {
  state = {
    status: "All",
  };

  onChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const selectRef = e.target as HTMLSelectElement;
    this.setState({ status: selectRef.value });
  };

  render() {
    return (
      <select name="status" value={this.state.status} onChange={this.onChange}>
        <option value="All">All</option>
        <option value="Incomplete">Incomplete</option>
        <option value="Complete">Complete</option>
      </select>
    );
  }
}
