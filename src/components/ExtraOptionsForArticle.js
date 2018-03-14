import React from "react";

import BookmarkArticle from "../containers/externalPages/BookmarkArticle";
import RelatedArticlesToThisArticle from "../containers/externalPages/RelatedArticlesToThisArticle";
import RelatedVideosToThisArticle from "../containers/externalPages/RelatedVideosToThisArticle";
import CheckArticleAuthor from "../containers/externalPages/CheckArticleAuthor";
import CheckoutArticlePublisher from "../containers/externalPages/CheckoutArticlePublisher";
import RelatedArticlesInSocialMedia from "../containers/socialMedia/RelatedArticlesInSocialMedia";

const ExtraOptionsForArticle = ({ article, extraInfo }) => (
  <p className="card-text">
    <CheckArticleAuthor article={article} />
    <CheckoutArticlePublisher article={article} />
    <BookmarkArticle article={article} />
    {article.title === extraInfo.title &&
      extraInfo.text !== "" && (
        <span className="flout-right mr-1">
          <RelatedArticlesToThisArticle
            article={article}
            searchText={extraInfo.text}
          />
          <RelatedVideosToThisArticle
            article={article}
            searchText={extraInfo.text}
          />
          <RelatedArticlesInSocialMedia
            article={article}
            searchText={extraInfo.text}
          />
        </span>
      )}
  </p>
);

export default ExtraOptionsForArticle;
