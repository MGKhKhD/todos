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

  handleClick = idx => {
    //first che if the idx is blocked by and active todo
    const { blockingInfo, todos } = this.props;
    let result = false;
    for (let key in blockingInfo) {
      if (
        key &&
        parseInt(key, 10) !== idx &&
        blockingInfo[key].indexOf(idx) > -1
      ) {
        if (
          todos.filter(
            ({ completed, id }) => id === parseInt(key, 10) && !completed
          ).length > 0
        ) {
          result = true;
        }
      }
    }

    if (!result) {
      // todo is not blocked
      this.props.todoClick(idx);
      return;
    }
    return;
  };

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
          onClick={() => this.handleClick(todo.id)}
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

function mapStateToProps(state) {
  return {
    blockingInfo: state.todoState.blockingInfo
  };
}

export default connect(mapStateToProps, {
  todoModifyCancel,
  todoModifySuccess,
  todoClick
})(LiTag);
