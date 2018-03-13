import React from "react";
import { connect } from "react-redux";
import { getIdOfActiveSearch } from "../../reducers/externalPagesReducers";

import ExtraOptionsForArticle from "../../components/ExtraOptionsForArticle";
import DisplayingRelatedArticles from "./DisplayingRelatedArticles";

const DiplayingNewsArticles = ({
  articles,
  bookmarkArticle,
  articlesForArticle,
  clickedArticleForRelatedArticles
}) => {
  if (articles.length === 0) {
    return null;
  }

  const rows = [];
  articles.forEach(article => {
    const isActiveForRelatedArticle =
      clickedArticleForRelatedArticles.indexOf(article.title) > -1;

    return rows.push(
      <div className="card mt-1" key={article.url}>
        <img
          className="card-img-top"
          src={article.urlToImage}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
          <ExtraOptionsForArticle article={article} />
          {isActiveForRelatedArticle && (
            <DisplayingRelatedArticles article={article} />
          )}
        </div>
      </div>
    );
  });

  return <div className="ml-1 mr-1 mt-1 mb-1">{rows}</div>;
};

function mapStateToProps(state) {
  const id = getIdOfActiveSearch(state.externalState);
  const success =
    id > -1 ? state.externalState.queries[id].articles.succeed : false;
  return {
    articles: success ? state.externalState.queries[id].articles.articles : [],
    clickedArticleForRelatedArticles:
      state.externalState.clickedArticleForExtraOptions.relatedArticles
  };
}

export default connect(mapStateToProps)(DiplayingNewsArticles);
