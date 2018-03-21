import React, { Component } from "react";
import { connect } from "react-redux";

import { getPosts } from "../../reducers/socialPagesReducers";
import { socialOutlets } from "../../types";

const SelfText = ({ post, clickedIndex }) => {
  if (!!post.selftext) {
    return (
      <p className="card-text">
        {clickedIndex > -1 ? post.selftext : post.selftext.substring(0, 100)}
      </p>
    );
  } else {
    return null;
  }
};

const Button = ({ post, onClick, clickedIndex }) => {
  if (!!post.selftext) {
    return (
      <button className="btn btn-sm btn-link" onClick={onClick}>
        {clickedIndex > -1 ? "Show less" : "Find more"}
      </button>
    );
  } else {
    return null;
  }
};

const Body = ({ post, onClick, clickedIndex }) => (
  <div className="card-body">
    <h5 className="card-title">{post.title.substring(0, 100)}</h5>
    <SelfText post={post} clickedIndex={clickedIndex} />
    <p className="card-text">
      <small className="text-muted">
        Subreddit: {post.subreddit}
        {",        "}Ups: {post.ups}
        {",        "}comments: {post.num_comments}
      </small>
      {"        "}
      <Button onClick={onClick} post={post} clickedIndex={clickedIndex} />
    </p>
  </div>
);

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
      const clickedIndex = this.state.clickedPosts.indexOf(post.name);
      rows.push(
        <div className="card mt-1" key={post.name}>
          <Body
            onClick={() => this.handleClick(post)}
            post={post}
            clickedIndex={clickedIndex}
          />
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
