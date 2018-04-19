import React, { Component } from "react";

import CommentListLiTag from "./CommentListLiTag";
import CommentListChildren from "./CommentListChildren";
import BasicComponents from "../../components/BasicComponents";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedComment: -1
    };
  }

  handleRegisterClickedComment = id => {
    this.setState({ clickedComment: id });
  };

  render() {
    const {
      comments,
      restricted,
      changingComment,
      commentManagement
    } = this.props;
    return (
      <BasicComponents.List numItems={comments.length}>
        {idx => {
          const comment = comments[idx];
          return (
            <CommentListLiTag key={idx} comment={comment}>
              {({ commentId, mouse }) => {
                return (
                  <CommentListChildren
                    comment={comment}
                    commentManagement={commentManagement}
                    restricted={restricted}
                    changingComment={changingComment}
                    registerClickedComment={id =>
                      this.handleRegisterClickedComment(id)
                    }
                  />
                );
              }}
            </CommentListLiTag>
          );
        }}
      </BasicComponents.List>
    );
  }
}

export default CommentList;
