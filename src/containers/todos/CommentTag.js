import React from "react";
import { connect } from "react-redux";
import {
  commentRequest,
  cancellCommentRequest
} from "../../actions/todoActions";

import BasicComponents from "../../components/BasicComponents";

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
    <BasicComponents.Span className="float-left" onClick={() => handleClick()}>
      {comment.status === "requested" && commentManagement.id === id
        ? "V"
        : "^"}
    </BasicComponents.Span>
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
