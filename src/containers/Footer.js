import React, { Component } from "react";
import { Motion, spring, presets } from "react-motion";

import { filters_constants } from "../types";
import { connect } from "react-redux";
import { setFilter } from "../actions/todoActions";
import { getTotalTodosByFilter } from "../reducers/todoReducers";

import FotterItem from "../components/FotterItem";

const colors = {
  ALL: "black",
  ACTIVE: "red",
  COMPLETED: "green",
  TOGGLE_ALL: "grey",
  DELETE_COMPLETED: "blue",
  ARCHIVES: "brown"
};

class CountingTagHeader extends Component {
  render() {
    return (
      <Motion
        defaultStyle={{ x: 0 }}
        style={{
          x: spring(this.props.totalTodos, {
            ...presets.gentle,
            precision: 10
          })
        }}
      >
        {value => (
          <span
            className="float-right mr-4"
            style={{ color: this.props.color }}
          >
            {value.x} todos{" "}
            {this.props.activeFilter === filters_constants.ARCHIVES
              ? "archived"
              : "left"}
          </span>
        )}
      </Motion>
    );
  }
}

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: filters_constants[0] };
  }

  render() {
    const items = [];

    for (let item in filters_constants) {
      items.push(
        <FotterItem
          key={colors[item]}
          onClick={() => {
            this.setState({ clicked: filters_constants[item] });
            this.props.setFilter(filters_constants[item]);
          }}
          color={colors[item]}
          text={filters_constants[item]}
          clicked={this.state.clicked}
        />
      );
    }

    let color = colors[this.state.clicked];
    if (this.state.clicked === filters_constants.TOGGLE_ALL) {
      let superStatus = this.props.todos.every(todo => todo.completed);
      color = superStatus
        ? colors[filters_constants.COMPLETED]
        : colors[filters_constants.ACTIVE];
    }

    return (
      <p>
        {items}
        <CountingTagHeader
          color={color}
          totalTodos={this.props.totalTodos}
          activeFilter={this.state.clicked}
        />
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalTodos: getTotalTodosByFilter(state.todoState),
    todos: state.todoState.todos.todos
  };
}

export default connect(mapStateToProps, { setFilter })(Footer);
