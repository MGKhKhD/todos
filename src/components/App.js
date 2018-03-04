import React, { Component } from "react";
import { connect } from "react-redux";
import { getTotalTodos } from "../reducers/rootReducer";

import AddTodo from "../containers/addTodo";
import TodosList from "../containers/TodosList";
import Footer from "../containers/Footer";

class App extends Component {
  render() {
    return (
      <div className="container mt-4 ">
        <div className="row justify-content-md-center">
          <div
            className="card card-inverse"
            style={{
              backgroundColor: "#e1e9e96b",
              bordeColor: "#333",
              width: "30rem"
            }}
          >
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
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  todosCount: getTotalTodos(state)
}))(App);
