import {
  REQUEST_FETCH_BOOKS,
  RECEIVE_FETCH_BOOKS,
  FAILURE_FETCH_BOOKS
} from "../types";

import { combineReducers } from "redux";

function booksPerQuery(
  state = {
    requested: false,
    failed: false,
    books: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_FETCH_BOOKS:
      return {
        requested: true,
        failed: false
      };
    case RECEIVE_FETCH_BOOKS:
      return {
        requested: false,
        failed: false,
        books: action.books
      };
    case FAILURE_FETCH_BOOKS:
      return {
        requested: false,
        failed: true
      };
    default:
      return state;
  }
}

function books(state = {}, action) {
  switch (action.type) {
    case REQUEST_FETCH_BOOKS:
    case RECEIVE_FETCH_BOOKS:
    case FAILURE_FETCH_BOOKS:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          query: action.query,
          books: booksPerQuery(state[action.id], action)
        }
      };
    default:
      return state;
  }
}

const bookReducer = combineReducers({
  books
});

export default bookReducer;
