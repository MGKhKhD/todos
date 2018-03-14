import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getIdOfActiveSearch,
  getArticles
} from "../../reducers/externalPagesReducers";

import ExtraOptionsForArticle from "../../components/ExtraOptionsForArticle";
import DisplayingRelatedArticles from "./DisplayingRelatedArticles";

class DiplayingNewsArticles extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "", title: "" };
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
    const { articles, clickedArticleForRelatedArticles } = this.props;

    console.log(articles);

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

    return <div className="ml-1 mr-1 mt-1 mb-1">{rows}</div>;
  }
}

function mapStateToProps(state) {
  const id = getIdOfActiveSearch(state.externalState);
  const success =
    id > -1 ? state.externalState.queries[id].articles.succeed : false;
  return {
    articles: success ? getArticles(state.externalState, id) : [],
    clickedArticleForRelatedArticles:
      state.externalState.clickedArticleForExtraOptions.relatedArticles
  };
}

export default connect(mapStateToProps)(DiplayingNewsArticles);
