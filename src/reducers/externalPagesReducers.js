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
  UNBOOKMARK_ARTICLE,
  SEARCH_FOR_RELATED_ARTICLES_TO_ARTICLE,
  FAILURE_ARTICLES_RELATED_TO_ARTICLE,
  RECEIVED_ARTICLES_RELATED_TO_ARTICLE,
  ARTICLE_CLICKED_FOR_RELATED_ARTICLES,
  INSERT_RELATED_ARTICLE_IN_ARTICLE_LIST,
  REMOVE_RELATED_ARTICLE_IN_ARTICLE_LIST
} from "../types";

import { combineReducers } from "redux";
import socialPagesReducers from "./socialPagesReducers";

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

function clickedArticleForExtraOptions(
  state = {
    authorsInfo: [],
    relatedArticles: [],
    relatedVideos: []
  },
  action
) {
  switch (action.type) {
    case ARTICLE_CLICKED_FOR_RELATED_ARTICLES:
      return {
        ...state,
        relatedArticles: [...state.relatedArticles, action.article.title]
      };
    default:
      return state;
  }
}

function articlesRelatedToArticle(
  state = {
    requested: false,
    failed: false,
    articles: []
  },
  action
) {
  switch (action.type) {
    case SEARCH_FOR_RELATED_ARTICLES_TO_ARTICLE:
      return {
        requested: true,
        failed: false
      };
    case RECEIVED_ARTICLES_RELATED_TO_ARTICLE:
      return {
        requested: false,
        failed: false,
        articles: action.articles
      };
    case FAILURE_ARTICLES_RELATED_TO_ARTICLE:
      return {
        requested: false,
        failed: true
      };
    default:
      return state;
  }
}

function articlesForArticle(state = {}, action) {
  switch (action.type) {
    case SEARCH_FOR_RELATED_ARTICLES_TO_ARTICLE:
    case FAILURE_ARTICLES_RELATED_TO_ARTICLE:
    case RECEIVED_ARTICLES_RELATED_TO_ARTICLE:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          articleTitle: action.newsTitle,
          query: action.query,
          articles: articlesRelatedToArticle(state[action.id], action)
        }
      };
    default:
      return state;
  }
}

export function addedArticles(
  state = { mainTitles: [], addedArticles: [] },
  action
) {
  switch (action.type) {
    case INSERT_RELATED_ARTICLE_IN_ARTICLE_LIST:
      return {
        mainTitles: [...state.mainTitles, action.mainArticle.title],
        addedArticles: [...state.addedArticles, action.relatedArticle]
      };
    case REMOVE_RELATED_ARTICLE_IN_ARTICLE_LIST: {
      let index = state.mainTitles.indexOf(action.mainArticle.title);
      if (index > -1) {
        return {
          mainTitles: state.mainTitles.filter(
            title => title !== action.mainArticle.title
          ),
          addedArticles: [
            ...state.addedArticles.slice(0, index),
            ...state.addedArticles.slice(index + 1)
          ]
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}

export const getArticles = (state, id) => {
  let mainArticles = state.queries[id].articles.articles;
  let addedArticles = state.addedArticles;

  let articles = [];
  if (addedArticles.mainTitles.length === 0) {
    mainArticles.forEach(article =>
      articles.push({ ...article, type: "main" })
    );
  } else {
    mainArticles.forEach(article => {
      articles.push({ ...article, type: "main" });
      addedArticles.mainTitles.forEach((title, index) => {
        if (title === article.title) {
          articles.push({
            ...addedArticles.addedArticles[index],
            type: "added"
          });
        }
      });
    });
  }

  return articles;
};

const externalPagesReducers = combineReducers({
  links,
  newsSetting,
  queries: articles,
  bookmarks,
  articlesForArticle,
  clickedArticleForExtraOptions,
  addedArticles,
  socialPagesReducers
});

export default externalPagesReducers;
