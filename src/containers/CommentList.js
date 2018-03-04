import React, { Component } from "react";

class CommentList extends Component {
  render() {
    const { comments } = this.props;
    const rows = [];
    comments.forEach(comment =>
      rows.push(
        <li key={comment.id} className="list-group-item">
          {comment.comment}
        </li>
      )
    );
    return <ul className="list-group mt-1 mb-1">{rows}</ul>;
  }
}

export default CommentList;
