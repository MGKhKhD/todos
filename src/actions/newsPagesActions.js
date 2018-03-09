import {
  SET_NEWS_COUNTRY,
  SET_NEWS_CATEGORY,
  REQUEST_NEWS_FEED,
  REQUEST_ARTICLES,
  RECEIVED_ARTICLES,
  FAILURE_ARTICLES
} from "../types";

import keys from "../configs";

export function setNewsCountry(country) {
  return {
    type: SET_NEWS_COUNTRY,
    country
  };
}

export function setNewsCategory(category) {
  return {
    type: SET_NEWS_CATEGORY,
    category
  };
}

export function requestNewsFeed({ country, category, query }) {
  return {
    type: REQUEST_NEWS_FEED,
    country,
    category,
    query
  };
}

export function setRequest(country, category, query, id) {
  return {
    type: REQUEST_ARTICLES,
    id,
    country,
    category,
    query
  };
}

export function receivedData(country, category, query, id, articles) {
  return {
    type: RECEIVED_ARTICLES,
    id,
    country,
    category,
    query,
    articles
  };
}

export function failedData(country, category, query, id, reason) {
  return {
    type: FAILURE_ARTICLES,
    id,
    country,
    category,
    query,
    reason
  };
}

let newsQueryId = 0;

export const fetchArticles = ({ country, category, query }) => dispatch => {
  let id = newsQueryId++;
  dispatch(setRequest(country, category, query, id));
  let cn;
  switch (country) {
    case "Canada":
      cn = "ca";
      break;
    case "USA":
      cn = "us";
      break;
    case "England":
      cn = "gb";
      break;
  }
  fetch(
    `https://newsapi.org/v2/top-headlines?country=${cn}&category=${category}&q=${query}&apiKey=${
      keys.GoogleNewsKey
    }`
  )
    .then(res => res.json())
    .then(
      articles => {
        if (articles && articles.length > 0) {
          return dispatch(receivedData(country, category, query, id, articles));
        } else {
          return dispatch(failedData(country, category, query, id, "relax"));
        }
      },
      error => dispatch(failedData(country, category, query, id, "failur"))
    );
};
