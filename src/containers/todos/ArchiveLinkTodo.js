import React from "react";
import { connect } from "react-redux";

import { archiveTodo, reactivateTodo } from "../../actions/todoActions";

const ArchiveLinkTodo = ({ todo, archiveTodo, reactivateTodo }) => (
  <button
    type="button"
    className="btn btn-link float-right"
    onClick={() => {
      if (!todo.archiveId) {
        archiveTodo(todo.id);
      } else if (!!todo.archiveId) {
        reactivateTodo(todo);
      }
    }}
  >
    {!todo.archiveId ? "archive" : "reactivate"}
  </button>
);

export default connect(null, {
  archiveTodo,
  reactivateTodo
})(ArchiveLinkTodo);
