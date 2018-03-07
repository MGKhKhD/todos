import React, { Component } from "react";
import CommentList from "./CommentList";
import { connect } from "react-redux";
import { addComment } from "../actions/todoActions";
import { getTotalCommentsForTodo } from "../reducers/todoReducers";

class CommentSegment extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: "" };
  }

  render() {
    return (
      <div>
        <form
          className="form-inline"
          onSubmit={e => {
            e.preventDefault();
            this.props.addComment(this.state.comment.trim(), this.props.id);
            this.setState({ comment: "" });
            e.target.value = "";
          }}
        >
          <textarea
            placeholder="add comments..."
            name="comment"
            onChange={e =>
              this.setState({ ...this.state, [e.target.name]: e.target.value })
            }
            className="form-control"
          />
          <input
            type="submit"
            className="btn btn-primary ml-1 mr-1"
            value="Add"
          />
        </form>
        {!!this.props.comments && (
          <CommentList comments={this.props.comments} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: getTotalCommentsForTodo(state.todoState)
  };
}

export default connect(mapStateToProps, { addComment }, null, {
  areStatesEqual: (next, prev) => prev === next
})(CommentSegment);
