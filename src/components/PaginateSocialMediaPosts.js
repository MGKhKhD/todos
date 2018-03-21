import React, { Component } from "react";

class PaginateSocialMediaPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { start: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.resetPaginate) {
      this.setState({ start: 0 });
    }
  }

  render() {
    const { length, posts } = this.props;
    return (
      <div>
        {this.state.start < posts.length - length && (
          <button
            className="btn btn-dark btn-sm mr-1 ml-1 mt-1 mb-1"
            onClick={() =>
              this.setState(prevState => ({
                start:
                  prevState.start + length < posts.length + 1
                    ? prevState.start + length
                    : 0
              }))
            }
          >
            Next page
          </button>
        )}
        {this.state.start !== 0 && (
          <button
            className="btn btn-danger btn-sm mr-1 ml-1 mt-1 mb-1"
            onClick={() =>
              this.setState(prevState => ({
                start:
                  prevState.start - length > -1 ? prevState.start - length : 0
              }))
            }
          >
            Go back
          </button>
        )}
        {this.props.render(
          posts.slice(this.state.start, this.state.start + length)
        )}
      </div>
    );
  }
}

export default PaginateSocialMediaPosts;
