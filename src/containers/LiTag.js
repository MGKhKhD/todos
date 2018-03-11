import React, { Component } from "react";
import { connect } from "react-redux";
import {
  todoModifyCancel,
  todoModifySuccess,
  todoClick
} from "../actions/todoActions";

class LiTag extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: this.props.todo.todo };
  }
  render() {
    const { todo, modify } = this.props;

    if (modify.status === "requested" && modify.id === todo.id) {
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
              this.props.todoModifySuccess(todo.id, this.state.todo);
              this.props.todoModifyCancel(todo.id);
              this.setState({ todo: "" });
            }
          }}
        />
      );
    } else {
      return (
        <button
          className="btn btn-link"
          onClick={() => this.props.todoClick(todo.id)}
          style={{ fontSize: "20px" }}
        >
          <strong style={{ color: todo.completed ? "green" : "red" }}>
            {todo.todo.length > 20
              ? todo.todo.substring(0, 20).concat("...")
              : todo.todo}
          </strong>
        </button>
      );
    }
  }
}

export default connect(null, {
  todoModifyCancel,
  todoModifySuccess,
  todoClick
})(LiTag);
