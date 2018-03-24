import React from "react";
import { connect } from "react-redux";
import { getTodos } from "../reducers/todoReducers";
import { deleteTodo } from "../actions/todoActions";
import ModifyLink from "./ModifyLink";
import LiTag from "./LiTag";
import CommentTag from "./CommentTag";
import CommentSegment from "./CommentSegment";

const TodosList = () => {
  const { todos, todoClick, modify, deleteTodo, comment } = this.props;
  let todosElements = todos.map(todo => (
    <div className="row" key={todo.id}>
      <div className="col">
        <li className="list-group-item justify-content-between">
          <CommentTag id={todo.id} comment={comment} />
          <LiTag todo={todo} modify={modify} />
          {todo.fromWhere === "todosPage" && <ModifyLink id={todo.id} />}
          <button
            type="button"
            className="btn btn-link float-right"
            onClick={() => {
              deleteTodo(todo.id, "todosPage");
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

function mapStateToProps(initState) {
  const state = initState.todoState;
  return {
    todos: getTodos(state.todos.todos, state.filter),
    modify: state.modify,
    comment: state.commentManagement
  };
}

export default connect(mapStateToProps, { deleteTodo }, null, {
  areStatesEqual: (next, prev) => prev === next
})(TodosList);
