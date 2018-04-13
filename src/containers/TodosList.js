import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos } from "../selectors/todoSelectors";
import {
  deleteTodo,
  archiveTodo,
  reactivateTodo,
  cancellCommentRequest
} from "../actions/todoActions";

import { filters_constants } from "../types";

import ModifyLink from "./ModifyLink";
import LiTag from "./LiTag";
import CommentTag from "./CommentTag";
import CommentSegment from "./CommentSegment";
import BlocksTodoList from "../components/BlocksTodoList";

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockStat: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comment.status !== "") {
      let { blockStat } = this.state;
      const isAvailable = blockStat.filter(
        ({ todoId }) => todoId === nextProps.comment.id
      );
      if (isAvailable.length > 0) {
        blockStat = blockStat.filter(
          ({ todoId }) => todoId !== nextProps.comment.id
        );
        this.setState({ blockStat });
      }
    }
  }

  cancelComment = id => {
    if (this.props.comment.status !== "" && this.props.comment.id === id) {
      this.props.cancellCommentRequest();
    }
    return;
  };

  handleBlocking = id => {
    let { blockStat } = this.state;
    const isAvailable = blockStat.filter(({ todoId }) => todoId === id);
    if (isAvailable.length === 0) {
      this.cancelComment(id);
      blockStat = [
        ...blockStat,
        { blocks: true, blockedBy: false, todoId: id }
      ];
      this.setState({ blockStat });
      return;
    }

    if (
      isAvailable.length > 0 &&
      blockStat.filter(({ todoId, blockedBy }) => todoId === id && blockedBy)
        .length > 0
    ) {
      this.cancelComment(id);
      blockStat = blockStat.filter(({ todoId }) => todoId !== id);
      blockStat = [
        ...blockStat,
        { blocks: true, blockedBy: false, todoId: id }
      ];
      this.setState({ blockStat });
      return;
    }
    return;
  };

  handleBlockedBy = id => {
    let { blockStat } = this.state;
    const isAvailable = blockStat.filter(({ todoId }) => todoId === id);
    if (isAvailable.length === 0) {
      this.cancelComment(id);
      blockStat = [
        ...blockStat,
        { blocks: false, blockedBy: true, todoId: id }
      ];
      this.setState({ blockStat });
      return;
    }

    if (
      isAvailable.length > 0 &&
      blockStat.filter(({ todoId, blocks }) => todoId === id && blocks).length >
        0
    ) {
      this.cancelComment(id);
      blockStat = blockStat.filter(({ todoId }) => todoId !== id);
      blockStat = [
        ...blockStat,
        { blocks: false, blockedBy: true, todoId: id }
      ];
      this.setState({ blockStat });
      return;
    }
    return;
  };

  render() {
    const {
      todos,
      modify,
      deleteTodo,
      comment,
      archiveTodo,
      reactivateTodo,
      filter
    } = this.props;

    let todosElements = todos.map(todo => (
      <div className="row" key={todo.id}>
        <div className="col">
          <li className="list-group-item justify-content-between">
            <CommentTag id={todo.id} comment={comment} />
            <LiTag todo={todo} modify={modify} todos={todos} />
            {todo.fromWhere === "todosPage" &&
              !todo.archiveId && <ModifyLink id={todo.id} />}
            {!todo.archiveId &&
              filter === filters_constants.ALL && (
                <button
                  type="button"
                  className="btn btn-link float-right"
                  onClick={() => this.handleBlocking(todo.id)}
                >
                  Blocks
                </button>
              )}
            {!todo.archiveId &&
              filter === filters_constants.ALL && (
                <button
                  type="button"
                  className="btn btn-link float-right"
                  onClick={() => this.handleBlockedBy(todo.id)}
                >
                  Blocked-by
                </button>
              )}
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
            {comment.id !== todo.id &&
              filter === filters_constants.ALL && (
                <BlocksTodoList
                  blockStat={this.state.blockStat}
                  id={todo.id}
                  todos={todos}
                />
              )}
          </li>
        </div>
      </div>
    ));

    return <ul className="list-group">{todosElements}</ul>;
  }
}

function mapStateToProps(initState) {
  const state = initState.todoState;
  return {
    todos: getTodos(initState),
    modify: state.modify,
    comment: state.commentManagement,
    filter: state.filter
  };
}

export default connect(mapStateToProps, {
  deleteTodo,
  archiveTodo,
  reactivateTodo,
  cancellCommentRequest
})(TodosList);
