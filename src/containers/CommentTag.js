import React, { Component } from "react";
import { connect } from "react-redux";
import { commentRequest, cancellCommentRequest } from "../actions/todoActions";

class CommentTag extends Component {
  render() {
    return (
      <button
        type="button"
        className="btn btn-link float-left"
        onClick={() => {
          if (this.props.comment.status === "requested") {
            this.props.cancellCommentRequest();
          } else {
            this.props.commentRequest(this.props.id);
          }
        }}
      >
        #
      </button>
    );
  }
}

export default connect(null, { commentRequest, cancellCommentRequest })(
  CommentTag
);
