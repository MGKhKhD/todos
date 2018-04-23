import React from "react";
import { connect } from "react-redux";

import {
  openTodoBoard,
  cancellCommentRequest
} from "../../actions/todoActions";

const SubTasksLinkTodo = ({
  todo,
  openTodoBoard,
  comment,
  cancellCommentRequest
}) => {
  const onClick = id => {
    if (comment.status !== "" && comment.id === id) cancellCommentRequest();
    openTodoBoard(id);
  };

  return (
    <button
      type="button"
      className="btn btn-link float-right"
      onClick={() => onClick(todo.id)}
    >
      Subs
    </button>
  );
};

function mapStateToProps(initState) {
  const state = initState.todoState;
  return {
    comment: state.commentManagement
  };
}

export default connect(mapStateToProps, {
  openTodoBoard,
  cancellCommentRequest
})(SubTasksLinkTodo);
