import {
  SET_NEWS_COUNTRY,
  SET_NEWS_CATEGORY,
  REQUEST_NEWS_FEED,
  REQUEST_ARTICLES,
  RECEIVED_ARTICLES,
  FAILURE_ARTICLES,
  CANCEL_NEWS_FEED
} from "../types";

import { getIdOfActiveSearch } from "../reducers/externalPagesReducers";

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

export function cancelNewsFeed() {
  return {
    type: CANCEL_NEWS_FEED
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

export const fetchArticles = ({ country, category, query, reason }) => (
  dispatch,
  getState
) => {
  if (reason) {
    let id = getIdOfActiveSearch(getState().externalState);
    if (id > -1) {
      if (query) {
        const retrivedCountry = getState().externalState.queries[id].country;
        const retrivedCategory = getState().externalState.queries[id].category;
        fetch(
          `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${
            keys.GoogleNewsKey
          }`
        )
          .then(res => res.json())
          .then(
            data => {
              if (data.totalResults > 0) {
                return dispatch(
                  receivedData(
                    retrivedCountry,
                    retrivedCategory,
                    query,
                    id,
                    data.articles
                  )
                );
              }
            },
            error =>
              dispatch(
                failedData(
                  retrivedCountry,
                  retrivedCategory,
                  query,
                  id,
                  "failur"
                )
              )
          );
      }
      if (!query) {
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
        let retrivedQuery = getState().externalState.queries[id].query;
        fetch(
          `https://newsapi.org/v2/top-headlines?country=${cn}&category=${category}&apiKey=${
            keys.GoogleNewsKey
          }`
        )
          .then(res => res.json())
          .then(
            data => {
              if (data.totalResults > 0) {
                return dispatch(
                  receivedData(
                    country,
                    category,
                    retrivedQuery,
                    id,
                    data.articles
                  )
                );
              }
            },
            error =>
              dispatch(
                failedData(country, category, retrivedQuery, id, "failur")
              )
          );
      }
    } else {
      dispatch(cancelNewsFeed);
    }
  } else {
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
        data => {
          if (data.totalResults > 0) {
            return dispatch(
              receivedData(country, category, query, id, data.articles)
            );
          } else {
            return dispatch(failedData(country, category, query, id, "relax"));
          }
        },
        error => dispatch(failedData(country, category, query, id, "failur"))
      );
  }
};
