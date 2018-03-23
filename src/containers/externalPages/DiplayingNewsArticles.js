import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getIdOfActiveSearch,
  getArticles
} from "../../reducers/externalPagesReducers";
import {
  getNewsTitleOfPosts,
  checkIfARequestMade
} from "../../reducers/socialPagesReducers";

import ExtraOptionsForArticle from "../../components/ExtraOptionsForArticle";
import DisplayingRelatedArticles from "./DisplayingRelatedArticles";

class DiplayingNewsArticles extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "", showingMessage: true };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.articles.length === 0) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.messageTime = setInterval(
      () => this.setState({ showingMessage: false }),
      50000
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isTextGrabbed) {
      clearInterval(this.messageTime);
      this.setState({ showingMessage: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.messageTime);
  }

  selectText = title => {
    let text = "";
    if (window.getSelection) {
      text = window.getSelection();
    } else if (document.getSelection) {
      text = document.getSelection();
    } else if (document.selection) {
      text = document.selection.createRange().text;
    }

    this.setState({ text, title });
  };

  render() {
    const {
      articles,
      clickedArticleForRelatedArticles,
      newsTitles
    } = this.props;

    const rows = [];
    articles.forEach(article => {
      if (article.type === "main") {
        const isActiveForRelatedArticle =
          clickedArticleForRelatedArticles.indexOf(article.title) > -1;
        rows.push(
          <div className="card mt-1" key={article.url}>
            <img
              className="card-img-top"
              src={article.urlToImage}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5
                className="card-title"
                onMouseUp={() => this.selectText(article.title)}
              >
                {article.title}
              </h5>
              <p className="card-text">{article.description}</p>
              <ExtraOptionsForArticle
                article={article}
                extraInfo={this.state}
              />
              {isActiveForRelatedArticle && (
                <DisplayingRelatedArticles article={article} />
              )}
              {newsTitles.indexOf(article.title) > -1 && (
                <div className="card-footer bg-transparent border-success">
                  <strong style={{ color: "green" }}>
                    {" "}
                    Realted posts are added to Social Media Page.{" "}
                  </strong>
                </div>
              )}
            </div>
          </div>
        );
      } else if (article.type === "added") {
        rows.push(
          <div className="card mt-1" key={article.url}>
            <img
              className="card-img-top"
              src={article.urlToImage}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
            </div>
          </div>
        );
      }
    });

    if (articles.length === 0) {
      return null;
    }

    return (
      <div className="ml-1 mr-1 mt-1 mb-1">
        {this.state.showingMessage && (
          <div className="alert alert-danger text-center" role="alert">
            <h2>
              <strong>Grab text from titles for extra queries</strong>
            </h2>
          </div>
        )}
        {rows}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const id = getIdOfActiveSearch(state.externalState);
  const success =
    id > -1 ? state.externalState.queries[id].articles.succeed : false;
  return {
    articles: success ? getArticles(state.externalState, id) : [],
    clickedArticleForRelatedArticles:
      state.externalState.clickedArticleForExtraOptions.relatedArticles,
    newsTitles: getNewsTitleOfPosts(state.externalState.socialPagesReducers),
    isTextGrabbed: checkIfARequestMade(state.externalState.socialPagesReducers)
  };
}

export default connect(mapStateToProps)(DiplayingNewsArticles);
