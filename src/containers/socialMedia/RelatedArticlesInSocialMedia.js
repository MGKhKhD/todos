import React, { Component } from "react";
import { connect } from "react-redux";

import { searchForRelatedSocialPostsToThisArticle } from "../../actions/socialPagesActions";
import { getNewsTitleOfPosts } from "../../reducers/socialPagesReducers";

class RelatedArticlesInSocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  render() {
    if (this.props.newsTitles.indexOf(this.props.article.title) === -1) {
      return (
        <button
          className="btn btn-danger btn-sm ml-1"
          disabled={this.state.disabled}
          onClick={() => {
            this.props.searchForRelatedSocialPostsToThisArticle(
              this.props.article,
              this.props.searchText
            );
            this.setState({ disabled: true });
          }}
        >
          Social networks
        </button>
      );
    } else if (this.props.newsTitles.indexOf(this.props.article.title) > -1) {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    newsTitles: getNewsTitleOfPosts(state.externalState.socialPagesReducers)
  };
}

export default connect(mapStateToProps, {
  searchForRelatedSocialPostsToThisArticle
})(RelatedArticlesInSocialMedia);
