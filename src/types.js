export const ADD_TODO = "ADD_TODO";
export const ARCHIVE_TODO = "ARCHIVE_TODO";
export const SET_FILTER = "SET_FILTER";
export const TODO_CLICK = "TODO_CLIKC";
export const TODO_DELETE = "TODO_DELETE";
export const ARCHIVE_TODO_DELETE = "ARCHIVE_TODO_DELETE";
export const TODO_MODIFY_REQUEST = "TODO_MODIFY_REQUEST";
export const TODO_MODIFY_CANCEL = "TODO_MODIFY_CANCEL";
export const TODO_MODIFY_SUCCESS = "TODO_MODIFY_SUCCESS";
export const COMMENT_REQUEST = "COMMENT_REQUEST";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENTS = "DELETE_COMMENTS";
export const COMMENT_REQUEST_CANCELLED = "COMMENT_REQUEST_CANCELLED";
export const ARCHIVE_COMMENTS_OF_TODO = "ARCHIVE_COMMENTS_OF_TODO";
export const SET_TODO_ERROR = "SET_TODO_ERROR";
export const CANCEL_TODO_ERROR = "CANCEL_TODO_ERROR";
export const SET_COMMENT_MODIFY = "SET_COMMENT_MODIFY";
export const DELETE_A_COMMENT = "DELETE_A_COMMENT";
export const MODIFY_COMMENT = "MODIFY_COMMENT";
export const CANCEL_MODIFY_COMMENT = "CANCEL_MODIFY_COMMENT";
export const TOGGLE_ALL_TODOS = "TOGGLE_ALL_TODOS";
export const DELETE_ALL_COMPLETED_TODOS = "DELETE_ALL_COMPLETED_TODOS";
export const DELETE_ARCHIVE_COMMENTS_OF_TODO =
  "DELETE_ARCHIVE_COMMENTS_OF_TODO";
export const filters_constants = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  TOGGLE_ALL: "TOGGLE_ALL",
  DELETE_COMPLETED: "DELETE_COMPLETED",
  ARCHIVES: "ARCHIVES"
};

export const OPENED_TODO_BOARD = "OPENED_TODO_BOARD";

export const SET_EXTERNAL_PAGES_LINK = "SET_EXTERNAL_PAGES_LINK";
export const CANCEL_EXTERNAL_PAGES_LINK = "CANCEL_EXTERNAL_PAGES_LINK";
export const SET_NEWS_COUNTRY = "SET_NEWS_COUNTRY";
export const SET_NEWS_CATEGORY = "SET_NEWS_CATEGORY";
export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVED_ARTICLES = "RECEIVED_ARTICLES";
export const FAILURE_ARTICLES = "FAILURE_ARTICLES";
export const REQUEST_NEWS_FEED = "REQUEST_NEWS_FEED";
export const CANCEL_NEWS_FEED = "CANCEL_NEWS_FEED";
export const BOOKMARK_ARTICLE = "BOOKMARK_ARTICLE";
export const UNBOOKMARK_ARTICLE = "UNBOOKMARK_ARTICLE";

export const SEARCH_FOR_RELATED_ARTICLES_TO_ARTICLE =
  "SEARCH_FOR_RELATED_ARTICLES_TO_ARTICLE";
export const RECEIVED_ARTICLES_RELATED_TO_ARTICLE =
  "RECEIVED_ARTICLES_RELATED_TO_ARTICLE";
export const FAILURE_ARTICLES_RELATED_TO_ARTICLE =
  "FAILURE_ARTICLES_RELATED_TO_ARTICLE";
export const ARTICLE_CLICKED_FOR_RELATED_ARTICLES =
  "ARTICLE_CLICKED_FOR_RELATED_ARTICLES";
export const INSERT_RELATED_ARTICLE_IN_ARTICLE_LIST =
  "INSERT_RELATED_ARTICLE_IN_ARTICLE_LIST";
export const REMOVE_RELATED_ARTICLE_IN_ARTICLE_LIST =
  "REMOVE_RELATED_ARTICLE_IN_ARTICLE_LIST";

export const SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE =
  "SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE";
export const RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE =
  "RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE";
export const FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE =
  "FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE";
export const UPDATE_PAGE_TAG = "UPDATE_PAGE_TAG";

export const REQUEST_FETCH_BOOKS = "REQUEST_FETCH_BOOKS";
export const RECEIVE_FETCH_BOOKS = "RECEIVE_FETCH_BOOKS";
export const FAILURE_FETCH_BOOKS = "FAILURE_FETCH_BOOKS";

export const options = [
  "Read Articles",
  "Checkout Books",
  "Stock Market",
  "Videos",
  "From Social Media",
  "Study Plan",
  "Photo Gallery"
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

export const paginateOptions = [5, 10, 20, 50, 100];
export const redditSortOptions = ["top", "new", "hot", "relevance"];
export const socialOutlets = ["reddit", "facebook", "twitter", "google"];
