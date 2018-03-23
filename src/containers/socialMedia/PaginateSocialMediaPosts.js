import React, { Component } from "react";
import { connect } from "react-redux";

import { updatePageTag } from "../../actions/socialPagesActions";

class PaginateSocialMediaPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { start: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.resetPaginate) {
      this.setState({ start: 0 });
      this.props.updatePageTag(
        this.state.start,
        nextProps.length,
        nextProps.posts.length
      );
    }
  }

  handleClick(direction) {
    const { length, posts } = this.props;
    const { start } = this.state;
    let newStart;

    if (direction === "forward") {
      if (start + length < posts.length + 1) {
        newStart = start + length;
      } else {
        newStart = 0;
      }
    } else {
      if (start - length > -1) {
        newStart = start - length;
      } else {
        newStart = 0;
      }
    }

    this.props.updatePageTag(newStart, length, posts.length);
    this.setState({ start: newStart });
  }

  render() {
    const { length, posts } = this.props;
    return (
      <div>
        {this.state.start < posts.length - length && (
          <button
            className="btn btn-dark btn-sm mr-1 ml-1 mt-1 mb-1"
            onClick={() => this.handleClick("forward")}
          >
            Next page
          </button>
        )}
        {this.state.start !== 0 && (
          <button
            className="btn btn-danger btn-sm mr-1 ml-1 mt-1 mb-1"
            onClick={() => this.handleClick("backward")}
          >
            Go back
          </button>
        )}
        {this.props.render(this.state.start)}
      </div>
    );
  }
}

export default connect(null, { updatePageTag })(PaginateSocialMediaPosts);
