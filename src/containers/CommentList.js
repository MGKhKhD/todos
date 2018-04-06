import React, { Component } from "react";
import { connect } from "react-redux";

import { setCommentModify, deleteComment } from "../actions/todoActions";

import FotterItem from "../components/FotterItem";

class CommentList extends Component {
  render() {
    const items = ["Delete", "Modify", "updateAt"];
    const { comments } = this.props;
    const rows = [];
    comments.forEach(comment => {
      const commentFilter = [];
      items.forEach(item =>
        commentFilter.push(
          <FotterItem
            key={item}
            text={item}
            color="red"
            onClick={() => {
              if (item === "Delete") {
                this.props.deleteComment(comment.id);
              } else if (item === "Modify") {
                this.props.setCommentModify(comment.id);
              }
            }}
          />
        )
      );
      rows.push(
        <li key={comment.id} className="list-group-item">
          {comment.comment}
          <hr />
          {commentFilter}
        </li>
      );
    });
    return <ul className="list-group mt-1 mb-1">{rows}</ul>;
  }
}

export default connect(null, { setCommentModify, deleteComment })(CommentList);
