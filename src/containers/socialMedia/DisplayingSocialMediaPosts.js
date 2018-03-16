import React, { Component } from "react";
import { connect } from "react-redux";

import { getPosts } from "../../reducers/socialPagesReducers";
import { socialOutlets } from "../../types";

class DisplayingSocialMediaPosts extends Component {
  render() {
    const rows = [];
    const { posts } = this.props;
    posts.forEach(post => {
      rows.push(
        <div className="card mt-1" key={post.title}>
          <div className="card-body">
            <h5 className="card-title">{post.title.substring(0, 100)}</h5>
            {!!post.selftext && (
              <p className="card-text">{post.selftext.substring(0, 100)}</p>
            )}
            <p className="card-text">
              <small className="text-muted">
                Subreddit: {post.subreddit}
                {"   "}Ups: {post.ups}
              </small>
            </p>
          </div>
        </div>
      );
    });

    return <div>{rows}</div>;
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
