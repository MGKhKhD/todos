import React, { Component } from "react";
import { connect } from "react-redux";
import { getTotalTodos } from "../reducers/todoReducers";
import { cancelExternalPageOption } from "../actions/externalPagesActions";

import AddTodo from "./addTodo";
import TodosList from "./TodosList";
import Footer from "./Footer";
import ExternalPages from "./externalPages/index";

class App extends Component {
  render() {
    const TodoHeader = (
      <div>
        <div className="card-header">
          <AddTodo />
        </div>
        {this.props.todosCount > 0 && (
          <div className="card-block">
            <Footer />
            <TodosList />
          </div>
        )}
      </div>
    );

    const DataHeader = (
      <div className="row">
        <button
          className="btn btn-primary mr-1 ml-1"
          onClick={() => this.props.cancelExternalPageOption()}
        >
          Back to Todos
        </button>
        <ExternalPages />
      </div>
    );
    if (this.props.link !== "") {
      return <div>{DataHeader}</div>;
    } else {
      return <div>{TodoHeader}</div>;
    }
  }
}

export default connect(
  state => ({
    todosCount: getTotalTodos(state.todoState),
    link: state.externalState.links
  }),
  { cancelExternalPageOption }
)(App);
