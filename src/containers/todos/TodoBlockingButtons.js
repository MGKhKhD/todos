import React, { Component } from "react";
import { connect } from "react-redux";
import { cancellCommentRequest } from "../../actions/todoActions";
import { withCondition } from "../../components/HOC";

class TodoBlockingButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockStat: []
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.comment.status !== "") {
  //     let { blockStat } = this.state;
  //     const isAvailable = blockStat.filter(
  //       ({ todoId }) => todoId === nextProps.comment.id
  //     );
  //     if (isAvailable.length > 0) {
  //       blockStat = blockStat.filter(
  //         ({ todoId }) => todoId !== nextProps.comment.id
  //       );
  //       this.setState({ blockStat });
  //       this.props.updateBlockingStateParent(this.state.blockStat);
  //     }
  //   }
  // }

  cancelComment = id => {
    if (this.props.comment.status !== "" && this.props.comment.id === id) {
      this.props.cancellCommentRequest();
    }
    return;
  };

  handleBlocking = (id, name) => {
    let { blockStat } = this.state;
    const isAvailable = blockStat.filter(({ todoId }) => todoId === id);
    if (isAvailable.length === 0) {
      this.cancelComment(id);
      this.state.blockStat.push({
        blocks: name === "blocks",
        blockedBy: name === "blockedBy",
        todoId: id
      });
      this.setState({
        blockStat
      });
      console.log(this.state);
      return;
    }

    if (name === "blocks") {
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
    } else if (name === "blockedBy") {
      if (
        isAvailable.length > 0 &&
        blockStat.filter(({ todoId, blocks }) => todoId === id && blocks)
          .length > 0
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
    }
    return;
  };

  render() {
    const { id, updateBlockingStateParent } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          className="btn btn-link float-right"
          onClick={() => {
            this.handleBlocking(id, "blocks");
            updateBlockingStateParent(this.state.blockStat);
          }}
        >
          Blocks
        </button>
        <button
          type="button"
          className="btn btn-link float-right"
          onClick={() => {
            this.handleBlocking(id, "blockedBy");
            updateBlockingStateParent(this.state.blockStat);
          }}
        >
          Blocked-by
        </button>
      </React.Fragment>
    );
  }
}

export default withCondition(
  connect(
    state => ({
      comment: state.todoState.commentManagement
    }),
    { cancellCommentRequest }
  )(TodoBlockingButtons)
);
