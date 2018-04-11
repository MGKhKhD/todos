import React from "react";
import { connect } from "react-redux";
import { getTotalTodos } from "../selectors/todoSelectors";
import { cancelExternalPageOption } from "../actions/externalPagesActions";

import TodoHeader from "../components/TodoHeader";
import DataHeader from "../components/DataHeader";

const Header = ({
  link,
  todosCount,
  cancelExternalPageOption,
  todoBoard,
  filter
}) =>
  link !== "" ? (
    <DataHeader onClick={() => cancelExternalPageOption()} />
  ) : (
    <TodoHeader todoCount={todosCount} todoBoard={todoBoard} filter={filter} />
  );

export default connect(
  state => ({
    todosCount: getTotalTodos(state.todoState),
    link: state.externalState.links,
    todoBoard: state.todoState.todoBoard,
    filter: state.todoState.filter
  }),
  { cancelExternalPageOption }
)(Header);
