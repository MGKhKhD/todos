import React from "react";
import { connect } from "react-redux";

import { filters_constants } from "../../types";

import { getTotalTodosByFilter } from "../../selectors/todoSelectors";

import CountingTagHeader from "../../components/todoComponents/CountingTagHeader";

const CountingTagHeaderContainer = ({ filter, todos, totalTodos, colors }) => {
  const setColor = () => {
    let color = colors[filter];
    if (filter === filters_constants.TOGGLE_ALL) {
      let superStatus = todos.every(todo => todo.completed);
      color = superStatus
        ? colors[filters_constants.COMPLETED]
        : colors[filters_constants.ACTIVE];
    }
    return color;
  };

  return (
    <CountingTagHeader
      color={setColor()}
      totalTodos={totalTodos}
      activeFilter={filter}
    />
  );
};

function mapStateToProps(state) {
  return {
    totalTodos: getTotalTodosByFilter(state.todoState),
    todos: state.todoState.todos.todos,
    filter: state.todoState.filter
  };
}

export default connect(mapStateToProps)(CountingTagHeaderContainer);
