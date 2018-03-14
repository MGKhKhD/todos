import React, { Component } from "react";
import { connect } from "react-redux";

import { searchForRelatedSocialPostsToThisArticle } from "../../actions/socialPagesActions";

class RelatedArticlesInSocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  render() {
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
  }
}

export default connect(null, {
  searchForRelatedSocialPostsToThisArticle
})(RelatedArticlesInSocialMedia);
