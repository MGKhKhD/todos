import React, { Component } from "react";
import { connect } from "react-redux";

import {
  insertRelatedArticleInArticleList,
  removeRelatedArticleInArticleList
} from "../../actions/newsPagesActions";

import InlineDisplayOfRelatedArticles from "../../components/InlineDisplayOfRelatedArticles";

class DisplayingRelatedArticles extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.relatedArticles !== this.props.relatedArticles) {
      return true;
    } else {
      return false;
    }
  }

  handleClick = relatedArticle => {
    const { addedArticles, article } = this.props;
    if (
      addedArticles.mainTitles.length === 0 ||
      (addedArticles.mainTitles.length > 0 &&
        addedArticles.mainTitles.indexOf(article.title) === -1)
    ) {
      this.props.insertRelatedArticleInArticleList(article, relatedArticle);
    } else {
      this.props.removeRelatedArticleInArticleList(article);
      this.props.insertRelatedArticleInArticleList(article, relatedArticle);
    }
  };

  render() {
    const { relatedArticles } = this.props;

    if (relatedArticles === {}) {
      return null;
    }

    if (relatedArticles.articles === {}) {
      return null;
    }

    if (relatedArticles.articles.requested) {
      return <p className="card-text">Loding....</p>;
    } else if (relatedArticles.articles.failed) {
      return <p className="card-text">No related rrticles found.</p>;
    } else {
      return (
        <InlineDisplayOfRelatedArticles
          click={this.handleClick}
          articles={relatedArticles.articles.articles}
        />
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  let title = ownProps.article.title;
  let { articlesForArticle } = state.externalState;

  let relatedArticles = {};
  if (articlesForArticle !== {}) {
    for (let key in articlesForArticle) {
      if (articlesForArticle[key].articleTitle === title) {
        relatedArticles = articlesForArticle[key];
      }
    }
  }

  return {
    relatedArticles,
    addedArticles: state.externalState.addedArticles
  };
}

export default connect(mapStateToProps, {
  insertRelatedArticleInArticleList,
  removeRelatedArticleInArticleList
})(DisplayingRelatedArticles);
