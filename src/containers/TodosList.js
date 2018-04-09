import React from "react";
import { connect } from "react-redux";
import { getTodos } from "../selectors/todoSelectors";
import {
  deleteTodo,
  archiveTodo,
  reactivateTodo
} from "../actions/todoActions";
import ModifyLink from "./ModifyLink";
import LiTag from "./LiTag";
import CommentTag from "./CommentTag";
import CommentSegment from "./CommentSegment";

const TodosList = ({
  todos,
  modify,
  deleteTodo,
  comment,
  archiveTodo,
  reactivateTodo
}) => {
  let todosElements = todos.map(todo => (
    <div className="row" key={todo.id}>
      <div className="col">
        <li className="list-group-item justify-content-between">
          <CommentTag id={todo.id} comment={comment} />
          <LiTag todo={todo} modify={modify} />
          {todo.fromWhere === "todosPage" &&
            !todo.archiveId && <ModifyLink id={todo.id} />}
          <button
            type="button"
            className="btn btn-link float-right"
            onClick={() => {
              deleteTodo(todo.id, "todosPage", todo.archiveId);
            }}
          >
            delete
          </button>
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
          {comment.status !== "" &&
            comment.id === todo.id && (
              <CommentSegment id={comment.id} restricted={!todo.archiveId} />
            )}
        </li>
      </div>
    </div>
  ));
  return <ul className="list-group">{todosElements}</ul>;
};

function mapStateToProps(initState) {
  const state = initState.todoState;
  return {
    todos: getTodos(initState),
    modify: state.modify,
    comment: state.commentManagement
  };
}

export default connect(
  mapStateToProps,
  { deleteTodo, archiveTodo, reactivateTodo },
  null,
  {
    areStatesEqual: (next, prev) => prev === next
  }
)(TodosList);
