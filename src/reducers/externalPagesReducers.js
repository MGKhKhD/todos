import {
  SET_EXTERNAL_PAGES_LINK,
  CANCEL_EXTERNAL_PAGES_LINK,
  SET_NEWS_COUNTRY,
  SET_NEWS_CATEGORY,
  REQUEST_NEWS_FEED,
  REQUEST_ARTICLES,
  RECEIVED_ARTICLES,
  FAILURE_ARTICLES
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
          articles: articlesPerQuery(state[action.id], action)
        }
      };
    default:
      return state;
  }
}

const externalPagesReducers = combineReducers({
  links,
  newsSetting,
  queries: articles
});

export default externalPagesReducers;
