import React, { Component } from "react";
import { connect } from "react-redux";

import { setCommentModify, deleteComment } from "../actions/todoActions";

import FotterItem from "../components/FotterItem";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedComment: -1,
      underModification: -1,
      numberComments: this.props.comments.length
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.commentManagement.status === "requested" &&
      this.props.commentManagement.status === "needModify"
    ) {
      this.setState({ underModification: -1 });
    }
  }

  footerClick(item, id) {
    if (item === "Delete") {
      this.props.deleteComment(id);
    } else if (item === "Modify") {
      this.props.setCommentModify(id);
      this.setState({ underModification: id });
    }
  }

  liClick(id) {
    if (this.state.clickedComment !== id) {
      this.setState({ clickedComment: id });
    } else {
      this.setState({ clickedComment: -1 });
    }
  }

  render() {
    const items = ["Delete", "Modify"];
    const { comments } = this.props;
    const rows = [];
    comments.forEach(comment => {
      const filterItems = [];
      items.forEach(item =>
        filterItems.push(
          <FotterItem
            key={item}
            text={item}
            color="red"
            onClick={() => this.footerClick(item, comment.id)}
          />
        )
      );
      rows.push(
        <li
          key={comment.id}
          className="list-group-item"
          onClick={() => this.liClick(comment.id)}
        >
          <span
            style={{
              color:
                this.state.underModification === comment.id ? "blue" : "black"
            }}
          >
            {comment.comment}
          </span>
          {this.state.clickedComment === comment.id &&
            this.props.restricted && (
              <React.Fragment>
                <br />
                {filterItems}
              </React.Fragment>
            )}
        </li>
      );
    });
    return (
      <React.Fragment>
        <ul className="list-group mt-1 mb-1">
          {rows.slice(0, this.state.numberComments)}
        </ul>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    commentManagement: state.todoState.commentManagement
  };
}

export default connect(mapStateToProps, { setCommentModify, deleteComment })(
  CommentList
);
