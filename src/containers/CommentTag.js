import React, { Component } from "react";
import { connect } from "react-redux";
import { commentRequest, cancellCommentRequest } from "../actions/todoActions";

class CommentTag extends Component {
  handleClick() {
    if (this.props.comment.status === "requested") {
      if (this.props.commentManagement.id === this.props.id) {
        this.props.cancellCommentRequest();
      } else {
        this.props.commentRequest(this.props.id);
      }
    } else {
      this.props.commentRequest(this.props.id);
    }
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-link float-left"
        onClick={() => this.handleClick()}
      >
        #
      </button>
    );
  }
}

function mapStateToProps(state) {
  return {
    commentManagement: state.todoState.commentManagement
  };
}

export default connect(mapStateToProps, {
  commentRequest,
  cancellCommentRequest
})(CommentTag);
