import React from "react";
import { connect } from "react-redux";
import { getTodos } from "../reducers/rootReducer";
import { deleteTodo, deleteCommentsOfTodo } from "../actions/index";
import ModifyLink from "./ModifyLink";
import LiTag from "./LiTag";
import CommentTag from "./CommentTag";
import CommentSegment from "./CommentSegment";

const TodosList = ({
  todos,
  todoClick,
  modify,
  deleteTodo,
  comment,
  deleteCommentsOfTodo
}) => {
  let todosElements = todos.map(todo => (
    <div className="row" key={todo.id}>
      <div className="col">
        <li className="list-group-item justify-content-between">
          <CommentTag id={todo.id} />
          <LiTag todo={todo} modify={modify} />
          <ModifyLink id={todo.id} />
          <button
            type="button"
            className="btn btn-link float-right"
            onClick={() => {
              deleteTodo(todo.id);
              deleteCommentsOfTodo(todo.id);
            }}
          >
            delete
          </button>
          {comment.status === "requested" &&
            comment.id === todo.id && <CommentSegment id={comment.id} />}
        </li>
      </div>
    </div>
  ));
  return <ul className="list-group">{todosElements}</ul>;
};

function mapStateToProps(state) {
  return {
    todos: getTodos(state.todos.todos, state.filter),
    modify: state.modify,
    comment: state.commentManagement
  };
}

export default connect(
  mapStateToProps,
  { deleteTodo, deleteCommentsOfTodo },
  null,
  {
    areStatesEqual: (next, prev) => prev === next
  }
)(TodosList);
