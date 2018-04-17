import React from "react";
import { connect } from "react-redux";
import {
  commentRequest,
  cancellCommentRequest
} from "../../actions/todoActions";

const CommentTag = ({
  comment,
  commentManagement,
  cancellCommentRequest,
  commentRequest,
  id
}) => {
  const handleClick = () => {
    if (comment.status === "requested") {
      if (commentManagement.id === id) {
        cancellCommentRequest();
      } else {
        commentRequest(id);
      }
    } else {
      commentRequest(id);
    }
  };

  return (
    <span className="float-left" onClick={() => handleClick()}>
      {comment.status === "requested" && commentManagement.id === id
        ? "V"
        : "^"}
    </span>
  );
};

export default connect(
  state => ({
    commentManagement: state.todoState.commentManagement
  }),
  {
    commentRequest,
    cancellCommentRequest
  }
)(CommentTag);
