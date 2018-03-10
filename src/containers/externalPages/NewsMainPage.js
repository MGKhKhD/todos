import React from "react";

import FooterNewsPage from "./FooterNewsPage";
import NewsSearchAlarms from "./NewsSearchAlarms";
import LoadingNewsPage from "./LoadingNewsPage";
import DiplayingNewsArticles from "./DiplayingNewsArticles";

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
