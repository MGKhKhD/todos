import React from "react";
import { connect } from "react-redux";

import TodoBoardHeader from "../../components/TodoBoardHeader";

import { getSingleTodo } from "../../selectors/todoSelectors";

const TodoBoardMainPage = ({ id, todo }) => (
  <div>
    <TodoBoardHeader todo={todo[0]} />
  </div>
);

export default connect(({ todoState }, { id }) => ({
  todo: getSingleTodo(todoState.todos, id)
}))(TodoBoardMainPage);
