import React from "react";
import { connect } from "react-redux";

import PaginateSocialMediaPosts from "./PaginateSocialMediaPosts";
import SocialMediaPosts from "../../components/SocialMediaPosts";

import { getPosts } from "../../reducers/socialPagesReducers";
import { updatePageTag } from "../../actions/socialPagesActions";
import { socialOutlets } from "../../types";

const DisplayingSocialMediaPosts = ({ posts, resetPaginate, content }) => {
  if (posts.length === 0) {
    return <div>No data to show </div>;
  } else {
    return (
      <PaginateSocialMediaPosts
        resetPaginate={resetPaginate}
        length={content.postsPerPage}
        posts={posts}
        render={start => (
          <SocialMediaPosts
            posts={posts.slice(start, start + content.postsPerPage)}
          />
        )}
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
