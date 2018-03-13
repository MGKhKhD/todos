import React, { Component } from "react";
import { connect } from "react-redux";

import {
  bookmarkArticle,
  unBookmarkArticle
} from "../../actions/newsPagesActions";

class BookmarkArticle extends Component {
  isBookmarked() {
    let result = false;
    const { bookmarks, article } = this.props;
    for (let key in bookmarks) {
      if (
        bookmarks[key].bookmarked &&
        bookmarks[key].article.title === article.title
      ) {
        result = true;
      }
    }
    return result;
  }

  render() {
    const { bookmarks, article } = this.props;
    const isBookmarked = this.isBookmarked();
    return (
      <button
        className={`btn btn-${isBookmarked ? "danger" : "dark"} btn-sm ml-1`}
        onClick={() => {
          if (isBookmarked) {
            let id;

            for (let key in bookmarks) {
              if (
                bookmarks[key].bookmarked &&
                bookmarks[key].article.title === this.props.article.title
              ) {
                id = bookmarks[key].id;
              }
            }
            this.props.unBookmarkArticle(id, article, "newsPage");
          } else {
            this.props.bookmarkArticle(this.props.article, "newsPage");
          }
        }}
      >
        {isBookmarked ? "Un-bookmark" : "Bookmark"}
      </button>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookmarks: state.externalState.bookmarks
  };
}

export default connect(mapStateToProps, { bookmarkArticle, unBookmarkArticle })(
  BookmarkArticle
);
