import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addComment,
  modifyComment,
  cancelModifyComment,
  openTodoBoard
} from "../actions/todoActions";

import { getTotalCommentsForTodo } from "../selectors/todoSelectors";
import { withCondition } from "../components/HOC";

import CommentList from "./todos/CommentList";
import BasicComponents from "../components/BasicComponents";

class CommentSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
    this.textArea = null;
    this.setTextAreaRef = element => {
      this.textArea = element;
    };
    this.focusTextArea = () => {
      if (this.textArea) this.textArea.focus();
    };
  }

  componentDidMount() {
    this.focusTextArea();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentManagement.status === "needModify") {
      this.focusTextArea();
      const oldComment = this.props.comments.filter(
        comment => comment.id === nextProps.commentManagement.commentId
      );
      this.setState({
        comment: oldComment[0].comment
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.commentManagement.status === "needModify") {
      this.props.modifyComment(
        this.state.comment.trim(),
        this.props.id,
        this.props.commentManagement.commentId
      );
      this.props.cancelModifyComment();
    } else {
      this.props.addComment(this.state.comment.trim(), this.props.id);
    }
    this.setState({ comment: "" });
    e.target.value = "";
  };

  render() {
    return (
      <div>
        {this.props.restricted && (
          <BasicComponents.FormWithTextArea
            onSubmit={this.handleSubmit}
            textRef={this.setTextAreaRef}
            placeholder="add comment..."
            name="comment"
            onChange={e =>
              this.setState({
                ...this.state,
                [e.target.name]: e.target.value
              })
            }
            textValue={this.state.comment}
            inputValue={
              this.props.commentManagement.status === "needModify"
                ? "Modify"
                : "Add"
            }
          >
            <button
              type="button"
              className="btn btn-danger ml-1 mr-1 flout-right"
              onClick={() => this.props.openTodoBoard(this.props.id)}
            >
              Todo board
            </button>
          </BasicComponents.FormWithTextArea>
        )}
        {!!this.props.comments && (
          <CommentList
            comments={this.props.comments}
            restricted={this.props.restricted}
            changingComment={this.state.comment}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: getTotalCommentsForTodo(state.todoState),
    commentManagement: state.todoState.commentManagement
  };
}

export default withCondition(
  connect(mapStateToProps, {
    addComment,
    modifyComment,
    cancelModifyComment,
    openTodoBoard
  })(CommentSegment)
);
