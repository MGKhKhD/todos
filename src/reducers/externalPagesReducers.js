import {
  SET_EXTERNAL_PAGES_LINK,
  CANCEL_EXTERNAL_PAGES_LINK,
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
import { combineReducers } from "redux";

function links(state = "", action) {
  switch (action.type) {
    case SET_EXTERNAL_PAGES_LINK:
      return action.link;
    case CANCEL_EXTERNAL_PAGES_LINK:
      return "";
    default:
      return state;
  }
}

function newsSetting(
  state = {
    country: "",
    category: "",
    query: "",
    readyForRequest: false
  },
  action
) {
  switch (action.type) {
    case SET_NEWS_COUNTRY:
      return { ...state, country: action.country, readyForRequest: false };
    case SET_NEWS_CATEGORY:
      return { ...state, category: action.category, readyForRequest: false };
    case REQUEST_NEWS_FEED:
      return {
        category: action.category,
        country: action.country,
        query: action.query,
        readyForRequest: true
      };
    case CANCEL_NEWS_FEED:
      return {
        country: "",
        category: "",
        query: "",
        readyForRequest: false
      };
    default:
      return state;
  }
}

function articlesPerQuery(
  state = {
    requested: false,
    succeed: false,
    failed: { status: false, reason: "" },
    articles: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return {
        requested: true,
        succeed: false,
        failed: { status: false, reason: "" }
      };
    case RECEIVED_ARTICLES:
      return {
        requested: false,
        succeed: true,
        failed: { status: false, reason: "" },
        articles: action.articles
      };
    case FAILURE_ARTICLES:
      return {
        requested: false,
        succeed: false,
        failed: { status: true, reason: action.reason }
      };
    default:
      return state;
  }
}

function articles(state = {}, action) {
  switch (action.type) {
    case REQUEST_ARTICLES:
    case RECEIVED_ARTICLES:
    case FAILURE_ARTICLES:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          country: action.country,
          category: action.category,
          query: action.query,
          articles: articlesPerQuery(state[action.id], action)
        }
      };
    default:
      return state;
  }
}

export const getIdOfActiveSearch = state => {
  let id = -1;

  const { country, category, query, readyForRequest } = state.newsSetting;
  if (!readyForRequest) {
    return id;
  }

  for (let key in state.queries) {
    if (
      state.queries[key].country === country &&
      state.queries[key].category === category &&
      state.queries[key].query === query
    ) {
      id = state.queries[key].id;
    }
  }
  return id;
};

export const getFailedReason = state => {
  const { readyForRequest } = state.newsSetting;
  let result = "";
  if (!readyForRequest) {
    return result;
  }

  if (state.queries === {}) {
    return result;
  } else {
    const id = getIdOfActiveSearch(state);
    if (id > -1 && state.queries[id].articles.failed.status) {
      result = state.queries[id].articles.failed.reason;
    }
  }

  return result;
};

function bookmarks(state = {}, action) {
  switch (action.type) {
    case BOOKMARK_ARTICLE:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          article: action.article,
          bookmarked: true
        }
      };
    case UNBOOKMARK_ARTICLE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          bookmarked: false
        }
      };
    default:
      return state;
  }
}

const externalPagesReducers = combineReducers({
  links,
  newsSetting,
  queries: articles,
  bookmarks
});

export default externalPagesReducers;
