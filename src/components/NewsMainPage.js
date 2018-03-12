import React from "react";

import FooterNewsPage from "../containers/externalPages/FooterNewsPage";
import NewsSearchAlarms from "../containers/externalPages/NewsSearchAlarms";
import LoadingNewsPage from "../containers/externalPages/LoadingNewsPage";
import DiplayingNewsArticles from "../containers/externalPages/DiplayingNewsArticles";

const NewsMainPage = () => {
  return (
    <div>
      <FooterNewsPage />
      <LoadingNewsPage />
      <NewsSearchAlarms />
      <DiplayingNewsArticles />
    </div>
  );
};

export default NewsMainPage;
