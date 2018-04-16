import React, { Component } from "react";

class TodoModifyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: this.props.todo.todo };
  }

  render() {
    const { todo, todoModifyCancel, todoModifySuccess } = this.props;
    return (
      <input
        type="text"
        name="todo"
        placeholder={todo.todo}
        value={this.state.todo}
        onChange={e =>
          this.setState({ ...this.state, [e.target.name]: e.target.value })
        }
        onKeyPress={e => {
          if (e.key === "Enter") {
            todoModifySuccess(todo.id, this.state.todo);
            todoModifyCancel(todo.id);
            this.setState({ todo: "" });
          }
        }}
      />
    );
  }
}

export default TodoModifyInput;
