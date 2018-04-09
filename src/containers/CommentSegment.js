import React, { Component } from "react";
import CommentList from "./CommentList";
import { connect } from "react-redux";
import {
  addComment,
  modifyComment,
  cancelModifyComment
} from "../actions/todoActions";

import { getTotalCommentsForTodo } from "../selectors/todoSelectors";

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
      const oldComment = nextProps.comments.filter(
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
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <textarea
              ref={this.setTextAreaRef}
              placeholder="add comment..."
              name="comment"
              onChange={e =>
                this.setState({
                  ...this.state,
                  [e.target.name]: e.target.value
                })
              }
              className="form-control col-10"
              value={this.state.comment}
            />
            <input
              type="submit"
              className="btn btn-dark ml-1 mr-1 flout-right"
              value={
                this.props.commentManagement.status === "needModify"
                  ? "Modify"
                  : "Add"
              }
            />
          </form>
        )}
        {!!this.props.comments && (
          <CommentList comments={this.props.comments} />
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

export default connect(
  mapStateToProps,
  { addComment, modifyComment, cancelModifyComment },
  null,
  {
    areStatesEqual: (next, prev) => prev === next
  }
)(CommentSegment);
