import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/index";
import { getTodos } from "../reducers/rootReducer";
export const filters_constants = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: "", error: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateTodo = (query, type) => {
    let result = "";
    let element = [];
    let { allActiveTodos, allCompletedTodos } = this.props;
    if (type === filters_constants.ACTIVE) {
      element = allActiveTodos.filter(
        todo => todo.todo.toLowerCase() === query.toLowerCase()
      );
    } else if (type === filters_constants.COMPLETED) {
      element = allCompletedTodos.filter(
        todo => todo.todo.toLowerCase() === query.toLowerCase()
      );
    }

    if (type === filters_constants.ACTIVE && element.length > 0) {
      result = "active";
    } else if (type === filters_constants.COMPLETED && element.length > 0) {
      result = "completed";
    }
    return result;
  };

  handleSubmit(e) {
    e.preventDefault();
    let todo = this.state.todo.trim();
    if (this.validateTodo(todo, filters_constants.ACTIVE) === "active") {
      this.setState({ error: "Todo is already in active list!" });
    } else if (
      this.validateTodo(todo, filters_constants.COMPLETED) === "completed"
    ) {
      this.setState({ error: "Todo is already in completed list" });
    } else if (
      this.validateTodo(todo, filters_constants.ACTIVE) === "" &&
      this.validateTodo(todo, filters_constants.COMPLETED) === ""
    ) {
      this.props.addTodo(this.state.todo.trim());
    }
    e.target.value = "";
    this.setState({ todo: "" });
  }

  render() {
    return (
      <div>
        {this.state.error !== "" && (
          <p style={{ color: "red" }}>{this.state.error}</p>
        )}
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            type="text"
            placeholder="Add todo"
            name="todo"
            value={this.state.todo}
            onChange={e => {
              this.setState({ ...this.state, [e.target.name]: e.target.value });
              if (this.state.error !== "") {
                this.setState({ error: "" });
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
    allActiveTodos: getTodos(state.todos.todos, filters_constants.ACTIVE),
    allCompletedTodos: getTodos(state.todos.todos, filters_constants.COMPLETED)
  };
}

export default connect(mapStateToProps, { addTodo })(AddTodo);
