import {
  SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE,
  RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE,
  FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE,
  UPDATE_PAGE_TAG
} from "../types";

import { combineReducers } from "redux";

function postsPerQuery(
  state = {
    requested: false,
    failed: false,
    articles: []
  },
  action
) {
  switch (action.type) {
    case SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE:
      return {
        requested: true,
        failed: false
      };
    case RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE:
      return {
        requested: false,
        failed: false,
        articles: action.articles
      };
    case FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE:
      return {
        requested: false,
        failed: true
      };
    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE:
    case RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE:
    case FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          sort: action.sort,
          outlet: action.outlet,
          newsTitle: action.newsTitle,
          articles: postsPerQuery(state[action.id], action)
        }
      };
    default:
      return state;
  }
}

export function updatePageTag(state = { current: 0, total: 0 }, action) {
  switch (action.type) {
    case UPDATE_PAGE_TAG:
      return {
        current: action.start === 0 ? 1 : action.start / action.length + 1,
        total:
          action.postsNum % action.length === 0
            ? action.postsNum / action.length
            : Math.floor(action.postsNum / action.length) + 1
      };
    default:
      return state;
  }
}

export const checkIfARequestMade = state => {
  let result = false;
  if (state.posts !== {} && state.posts[0]) {
    result = true;
  }

  return result;
};

export const getNewsTitleOfPosts = state => {
  let newsTitles = [];
  if (state.posts !== {}) {
    for (let key in state.posts) {
      if (newsTitles.length > 0) {
        if (newsTitles.indexOf(state.posts[key].newsTitle) === -1) {
          newsTitles.push(state.posts[key].newsTitle);
        }
      } else {
        newsTitles.push(state.posts[key].newsTitle);
      }
    }
  }
  return newsTitles;
};

export const getPosts = (state, title, sort, outlet) => {
  let posts = [];
  if (state.posts !== {}) {
    for (let key in state.posts) {
      if (
        state.posts[key].newsTitle === title &&
        state.posts[key].sort === sort &&
        state.posts[key].outlet === outlet
      ) {
        if (
          !state.posts[key].articles.requested &&
          !state.posts[key].articles.failed &&
          state.posts[key].articles.articles
        ) {
          posts = state.posts[key].articles.articles;
        }
      }
    }
  }

  return posts;
};

const socialPagesReducers = combineReducers({
  posts,
  page: updatePageTag
});

export default socialPagesReducers;
