export const ADD_TODO = "ADD_TODO";
export const SET_FILTER = "SET_FILTER";
export const TODO_CLICK = "TODO_CLIKC";
export const TODO_DELETE = "TODO_DELETE";
export const TODO_MODIFY_REQUEST = "TODO_MODIFY_REQUEST";
export const TODO_MODIFY_CANCEL = "TODO_MODIFY_CANCEL";
export const TODO_MODIFY_SUCCESS = "TODO_MODIFY_SUCCESS";
export const COMMENT_REQUEST = "COMMENT_REQUEST";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENTS = "DELETE_COMMENTS";
export const COMMENT_REQUEST_CANCELLED = "COMMENT_REQUEST_CANCELLED";
export const SET_TODO_ERROR = "SET_TODO_ERROR";
export const CANCEL_TODO_ERROR = "CANCEL_TODO_ERROR";
export const filters_constants = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

export const SET_EXTERNAL_PAGES_LINK = "SET_EXTERNAL_PAGES_LINK";
export const CANCEL_EXTERNAL_PAGES_LINK = "CANCEL_EXTERNAL_PAGES_LINK";
export const SET_NEWS_COUNTRY = "SET_NEWS_COUNTRY";
export const SET_NEWS_CATEGORY = "SET_NEWS_CATEGORY";
export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVED_ARTICLES = "RECEIVED_ARTICLES";
export const FAILURE_ARTICLES = "FAILURE_ARTICLES";
export const REQUEST_NEWS_FEED = "REQUEST_NEWS_FEED";
export const CANCEL_NEWS_FEED = "CANCEL_NEWS_FEED";

export const options = [
  "Read Articles",
  "Checkout Books",
  "Serf Youtube",
  "Stock Market"
];

export const countryOptions = ["Canada", "USA", "England"];

export const categoryOptions = [
  "business ",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];
