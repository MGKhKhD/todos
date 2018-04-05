import React, { Component } from "react";
import { connect } from "react-redux";

import { getTodos } from "../reducers/todoReducers";
import {
  cancellCommentRequest,
  cancelErrorTodo,
  addTodo,
  setErrorTodo
} from "../actions/todoActions";

import { filters_constants } from "../types";

import ExternalPagesHeader from "./externalPages/ExternalPagesHeader";
import Message from "../components/Message";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: "" };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.inputText = null;
    this.setInputRef = element => {
      this.inputText = element;
    };
    this.setFocus = () => {
      if (this.inputText) this.inputText.focus();
    };
  }

  componentDidMount() {
    this.setFocus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commentStatus !== "" && nextProps.commentStatus === "") {
      this.setFocus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let todo = this.state.todo.trim();
    this.props.addTodo(todo, "todosPage");
    e.target.value = "";
    this.setState({ todo: "" });
  }

  render() {
    return (
      <div>
        {this.props.errorMessage !== "" && (
          <Message alert="danger" message={this.props.errorMessage} tag="h3" />
        )}
        <form className="form-inline " onSubmit={this.handleSubmit}>
          <input
            ref={this.setInputRef}
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
              if (this.props.errorMessage !== "") {
                this.props.cancelErrorTodo();
              }
            }}
          />
          <button type="submit" className="btn btn-primary mr-1">
            Add
          </button>
          <ExternalPagesHeader />
        </form>
      </div>
    );
  }
}

function mapStateToProps(initState) {
  let state = initState.todoState;
  return {
    errorMessage: state.error,
    commentStatus: state.commentManagement.status,
    allActiveTodos: getTodos(state.todos.todos, filters_constants.ACTIVE),
    allCompletedTodos: getTodos(state.todos.todos, filters_constants.COMPLETED)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cancellCommentRequest: () => dispatch(cancellCommentRequest()),
    cancelErrorTodo: () => dispatch(cancelErrorTodo()),
    addTodo: (todo, fromWhere) => dispatch(addTodo(todo, fromWhere)),
    setErrorTodo: (error = "") => dispatch(setErrorTodo(error))
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { allActiveTodos, allCompletedTodos, commentStatus } = stateProps;
  const dispatch = dispatchProps;
  return {
    commentStatus: commentStatus,
    errorMessage: stateProps.errorMessage ? stateProps.errorMessage : "",
    cancellCommentRequest: () => dispatch.cancellCommentRequest(),
    cancelErrorTodo: () => dispatch.cancelErrorTodo(),
    addTodo: (todo, fromWhere) => {
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
        return dispatch.addTodo(todo, fromWhere);
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  areStatesEqual: (next, prev) => prev === next
})(AddTodo);
