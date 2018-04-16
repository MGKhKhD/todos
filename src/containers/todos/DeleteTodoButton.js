import React from "react";
import { connect } from "react-redux";

import { deleteTodo } from "../../actions/todoActions";

const DeleteTodoButton = ({ deleteTodo, todo }) => (
  <button
    type="button"
    className="btn btn-link float-right"
    onClick={() => {
      deleteTodo(todo.id, "todosPage", todo.archiveId);
    }}
  >
    delete
  </button>
);

export default connect(null, { deleteTodo })(DeleteTodoButton);
