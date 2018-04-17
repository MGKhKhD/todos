import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos } from "../../selectors/todoSelectors";

import { filters_constants } from "../../types";

import LiTag from "../../components/todoComponents/LiTag";
import TodoControlTag from "../../components/todoComponents/TodoControlTag";
import CommentTag from "./CommentTag";
import BasicComponents from "../../components/BasicComponents";

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

  handleBlocking = blockStat => {
    this.setState({ blockStat });
  };

  render() {
    const { todos, modify, comment, filter } = this.props;
    return (
      <BasicComponents.ListGroup items={todos}>
        {(idx, { items }) => {
          const todos = items;
          const todo = todos[idx];
          return (
            <React.Fragment>
              <TodoControlTag
                todo={todo}
                comment={comment}
                conditionModify={
                  todo.fromWhere === "todosPage" && !todo.archiveId
                }
                updateBlockingStateParent={this.handleBlocking}
                conditionBlocks={
                  !todo.archiveId && filter === filters_constants.ALL
                }
              />
              <CommentTag id={todo.id} comment={comment} />
              <LiTag
                todo={todo}
                modify={modify}
                todos={todos}
                id={comment.id}
                restricted={!todo.archiveId}
                conditionComment={
                  comment.status !== "" && comment.id === todo.id
                }
                conditionBlocks={
                  comment.id !== todo.id && filter === filters_constants.ALL
                }
                blockStat={this.state.blockStat}
              />
            </React.Fragment>
          );
        }}
      </BasicComponents.ListGroup>
    );
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

export default connect(mapStateToProps)(TodosList);
