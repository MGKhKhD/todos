import React from "react";

import BookmarkArticle from "../containers/externalPages/BookmarkArticle";
import RelatedArticlesToThisArticle from "../containers/externalPages/RelatedArticlesToThisArticle";
import RelatedVideosToThisArticle from "../containers/externalPages/RelatedVideosToThisArticle";
import CheckArticleAuthor from "../containers/externalPages/CheckArticleAuthor";
import CheckoutArticlePublisher from "../containers/externalPages/CheckoutArticlePublisher";

const ExtraOptionsForArticle = ({ article }) => (
  <p className="card-text">
    <CheckArticleAuthor article={article} />
    <CheckoutArticlePublisher article={article} />
    <BookmarkArticle article={article} />
    <RelatedArticlesToThisArticle article={article} />
    <RelatedVideosToThisArticle article={article} />
  </p>
);

export default ExtraOptionsForArticle;
