import React, { Component } from "react";
import { connect } from "react-redux";

import { getTodos } from "../reducers/rootReducer";
import {
  cancellCommentRequest,
  cancelErrorTodo,
  addTodo,
  setErrorTodo
} from "../actions/index";

export const filters_constants = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let todo = this.state.todo.trim();
    this.props.addTodo(todo);
    e.target.value = "";
    this.setState({ todo: "" });
  }

  render() {
    return (
      <div>
        {this.props.error !== "" && (
          <p style={{ color: "red" }}>{this.props.error}</p>
        )}
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            type="text"
            placeholder="Add todo"
            name="todo"
            value={this.state.todo}
            onChange={e => {
              if (this.props.commentStatus !== "") {
                this.props.cancellCommentRequest();
              }
              this.setState({ ...this.state, [e.target.name]: e.target.value });
              if (this.props.error !== "") {
                this.props.cancelErrorTodo();
              }
            }}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
    commentStatus: state.commentManagement.status,
    allActiveTodos: getTodos(state.todos.todos, filters_constants.ACTIVE),
    allCompletedTodos: getTodos(state.todos.todos, filters_constants.COMPLETED)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cancellCommentRequest: () => dispatch(cancellCommentRequest()),
    cancelErrorTodo: () => dispatch(cancelErrorTodo()),
    addTodo: todo => dispatch(addTodo(todo)),
    setErrorTodo: error => dispatch(setErrorTodo(error))
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { allActiveTodos, allCompletedTodos } = stateProps;
  const dispatch = dispatchProps;
  return {
    cancellCommentRequest: () => dispatch.cancellCommentRequest(),
    cancelErrorTodo: () => dispatch.cancelErrorTodo(),
    addTodo: todo => {
      let active = allActiveTodos.filter(
        t => t.todo.toLowerCase() === todo.toLowerCase()
      );
      let completed = allCompletedTodos.filter(
        t => t.todo.toLowerCase() === todo.toLowerCase()
      );

      let result = "";

      if (active && active.length > 0) {
        result = "active";
      } else if (completed && completed.length > 0) {
        result = "completed";
      }

      let error;
      if (todo === "") {
        error = "Please add todo and then submit";
        return dispatch.setErrorTodo(error);
      }

      if (result === "active") {
        error = `${todo} is already in active list!`;
        return dispatch.setErrorTodo(error);
      } else if (result === "completed") {
        error = `${todo} is already in completed list`;
        return dispatch.setErrorTodo(error);
      } else if (result === "") {
        return dispatch.addTodo(todo);
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  areStatesEqual: (next, prev) => prev === next
})(AddTodo);
