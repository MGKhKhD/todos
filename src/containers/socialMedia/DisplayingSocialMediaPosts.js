import React, { Component } from "react";
import { connect } from "react-redux";

import { getPosts } from "../../reducers/socialPagesReducers";
import { socialOutlets } from "../../types";

class DisplayingSocialMediaPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { clickedPosts: [] };
  }

  handleClick = post => {
    const { clickedPosts } = this.state;
    const index = clickedPosts.indexOf(post.name);
    if (index === -1) {
      this.setState({ clickedPosts: [...this.state.clickedPosts, post.name] });
    } else {
      this.setState({
        clickedPosts: [
          ...this.state.clickedPosts.slice(0, index),
          ...this.state.clickedPosts.slice(index + 1)
        ]
      });
    }
  };

  render() {
    const rows = [];
    const { posts } = this.props;
    posts.forEach(post => {
      rows.push(
        <div className="card mt-1" key={post.name}>
          <div className="card-body">
            <h5 className="card-title">{post.title.substring(0, 100)}</h5>
            {!!post.selftext && (
              <p className="card-text">
                {this.state.clickedPosts.indexOf(post.name) > -1
                  ? post.selftext
                  : post.selftext.substring(0, 100)}
              </p>
            )}
            <p className="card-text">
              <small className="text-muted">
                Subreddit: {post.subreddit}
                {",        "}Ups: {post.ups}
                {",        "}comments: {post.num_comments}
              </small>
              {"        "}
              {!!post.selftext && (
                <button
                  className="btn btn-sm btn-link"
                  onClick={() => this.handleClick(post)}
                >
                  {this.state.clickedPosts.indexOf(post.name) > -1
                    ? "Show less"
                    : "Find more"}
                </button>
              )}
            </p>
          </div>
        </div>
      );
    });

    if (rows.length === 0) {
      return <div>No data to show </div>;
    } else {
      return <div>{rows}</div>;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: getPosts(
      state.externalState.socialPagesReducers,
      ownProps.content.title,
      ownProps.content.sort,
      socialOutlets[0]
    )
  };
}

export default connect(mapStateToProps)(DisplayingSocialMediaPosts);
