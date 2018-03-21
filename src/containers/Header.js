import React from "react";
import { connect } from "react-redux";
import { getTotalTodos } from "../reducers/todoReducers";
import { cancelExternalPageOption } from "../actions/externalPagesActions";

import TodoHeader from "../components/TodoHeader";
import DataHeader from "../components/DataHeader";

const Header = ({ link, todosCount, cancelExternalPageOption }) =>
  link !== "" ? (
    <DataHeader onClick={() => cancelExternalPageOption()} />
  ) : (
    <TodoHeader todoCount={todosCount} />
  );

export default connect(
  state => ({
    todosCount: getTotalTodos(state.todoState),
    link: state.externalState.links
  }),
  { cancelExternalPageOption }
)(Header);
