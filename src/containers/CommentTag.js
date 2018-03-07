import React, { Component } from "react";
import { connect } from "react-redux";
import { commentRequest } from "../actions/todoActions";

class CommentTag extends Component {
  render() {
    return (
      <button
        type="button"
        className="btn btn-link float-left"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() => this.props.commentRequest(this.props.id)}
      >
        #
      </button>
    );
  }
}

export default connect(null, { commentRequest })(CommentTag);
