import React, { Component } from "react";
import { connect } from "react-redux";

import {
  searchForRelatedArticlesToThisArticle,
  setArticleForRelatedArticles
} from "../../actions/newsPagesActions";

class RelatedArticlesToThisArticle extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }
  render() {
    return (
      <button
        className="btn btn-primary btn-sm ml-1"
        disabled={this.state.disabled}
        onClick={() => {
          this.props.setArticleForRelatedArticles(this.props.article);
          this.props.searchForRelatedArticlesToThisArticle(this.props.article);
          this.setState({ disabled: true });
        }}
      >
        Related Articles
      </button>
    );
  }
}

export default connect(null, {
  searchForRelatedArticlesToThisArticle,
  setArticleForRelatedArticles
})(RelatedArticlesToThisArticle);
