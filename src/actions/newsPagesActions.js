import {
  SET_NEWS_COUNTRY,
  SET_NEWS_CATEGORY,
  REQUEST_NEWS_FEED,
  REQUEST_ARTICLES,
  RECEIVED_ARTICLES,
  FAILURE_ARTICLES,
  CANCEL_NEWS_FEED,
  BOOKMARK_ARTICLE,
  UNBOOKMARK_ARTICLE
} from "../types";

import { getIdOfActiveSearch } from "../reducers/externalPagesReducers";
import { addTodo, deleteTodo } from "./todoActions";

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

let bookmarkId = 0;

export const bookmark = article => {
  return {
    type: BOOKMARK_ARTICLE,
    article,
    id: bookmarkId++
  };
};

export const bookmarkArticle = article => dispatch => {
  dispatch(bookmark(article));
  dispatch(addTodo(article.title));
};

export const unBookmark = (id, article) => {
  return {
    type: UNBOOKMARK_ARTICLE,
    id
  };
};

export const unBookmarkArticle = (id, article) => (dispatch, getState) => {
  dispatch(unBookmark(id, article));
  const todos = getState().todoState.todos;
  let todoId = -1;
  if (todos) {
    const arr = todos.todos;
    todoId = arr.filter(todo => {
      if (todo.todo === article.title) {
        return todo.id;
      }
    });
  }
  if (todoId > -1) {
    dispatch(deleteTodo(todoId));
  }
};

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

function fetchArticlesWithRelaxedCC(query, id, dispatch, getState) {
  const retrivedCountry = getState().externalState.queries[id].country;
  const retrivedCategory = getState().externalState.queries[id].category;
  dispatch(setRequest(retrivedCountry, retrivedCategory, query, id));
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

        return dispatch(
          failedData(retrivedCountry, retrivedCategory, query, id, "failur")
        );
      },
      error =>
        dispatch(
          failedData(retrivedCountry, retrivedCategory, query, id, "failur")
        )
    );
}

function fetchArticlesWithRelaxedQuery(
  country,
  category,
  id,
  dispatch,
  getState
) {
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
  dispatch(setRequest(country, category, retrivedQuery, id));
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
            receivedData(country, category, retrivedQuery, id, data.articles)
          );
        }

        return dispatch(
          failedData(country, category, retrivedQuery, id, "failur")
        );
      },
      error =>
        dispatch(failedData(country, category, retrivedQuery, id, "failur"))
    );
}

function ifQueryCached(getState) {
  let id = getIdOfActiveSearch(getState().externalState);
  let success = false;
  if (
    id > -1 &&
    getState().externalState.queries &&
    getState().externalState.queries[id].articles
  ) {
    success = getState().externalState.queries[id].articles.succeed;
  }

  let articles = [];
  if (success && getState().externalState.queries[id].articles.articles) {
    articles = getState().externalState.queries[id].articles.articles;
  }
  return articles;
}

let newsQueryId = 0;

function fetchNewArticles(country, category, query, dispatch) {
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

export const fetchArticles = ({ country, category, query, reason }) => (
  dispatch,
  getState
) => {
  // check to see if the previous request has reasons to fail and based on
  // provided option relax new search
  if (reason) {
    let id = getIdOfActiveSearch(getState().externalState);
    if (id > -1) {
      if (query) {
        fetchArticlesWithRelaxedCC(query, id, dispatch, getState);
      }
      if (!query) {
        fetchArticlesWithRelaxedQuery(
          country,
          category,
          id,
          dispatch,
          getState
        );
      }
    } else {
      dispatch(cancelNewsFeed);
    }
  } else {
    let articles = ifQueryCached(getState);
    if (articles.length > 0) {
      // there is cached data; abort fetch
      dispatch(cancelNewsFeed);
    } else {
      // if it  is a barnd-new request (no cach, no previous error) add a new id and record the request
      fetchNewArticles(country, category, query, dispatch);
    }
  }
};
