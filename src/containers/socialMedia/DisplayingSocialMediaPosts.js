import React, { Component } from "react";
import { connect } from "react-redux";

import PaginateSocialMediaPosts from "../../components/PaginateSocialMediaPosts";
import SocialMediaPosts from "../../components/SocialMediaPosts";

import { getPosts } from "../../reducers/socialPagesReducers";
import { socialOutlets } from "../../types";

const DisplayingSocialMediaPosts = ({ posts, resetPaginate }) => {
  if (posts.length === 0) {
    return <div>No data to show </div>;
  } else {
    return (
      <PaginateSocialMediaPosts
        resetPaginate={resetPaginate}
        length={5}
        posts={posts}
        render={selectedPosts => <SocialMediaPosts posts={selectedPosts} />}
      />
    );
  }
};

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
