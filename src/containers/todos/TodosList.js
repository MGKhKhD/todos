import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodos } from "../../selectors/todoSelectors";
import { cancellCommentRequest } from "../../actions/todoActions";

import { filters_constants } from "../../types";

import LiTag from "../../components/todoComponents/LiTag";
import LiButtons from "../../components/todoComponents/LiButtons";
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
    const { todos, modify, comment, filter } = this.props;
    return (
      <BasicComponents.ListGroup items={todos}>
        {(idx, { items }) => {
          const todos = items;
          const todo = todos[idx];
          return (
            <React.Fragment>
              <LiButtons
                todo={todo}
                comment={comment}
                conditionModify={
                  todo.fromWhere === "todosPage" && !todo.archiveId
                }
                handleBlockingClick={this.handleBlocking}
                handleBlockedByClick={this.handleBlockedBy}
                conditionBlocks={
                  !todo.archiveId && filter === filters_constants.ALL
                }
              />
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

export default connect(mapStateToProps, {
  cancellCommentRequest
})(TodosList);
