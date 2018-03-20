import {
  REQUEST_FETCH_BOOKS,
  RECEIVE_FETCH_BOOKS,
  FAILURE_FETCH_BOOKS
} from "../types";

export function requestFetchBook(query, id) {
  return {
    type: REQUEST_FETCH_BOOKS,
    query,
    id
  };
}

export function receiveBooks(query, books, id) {
  return {
    type: RECEIVE_FETCH_BOOKS,
    query,
    books,
    id
  };
}

export function failureBooks(query, id) {
  return {
    type: FAILURE_FETCH_BOOKS,
    query,
    id
  };
}

let bookId = 0;

export const fetchBooks = query => dispatch => {
  let id = bookId++;
  dispatch(requestFetchBook(query, id));
  fetch(`http://localhost:4200/api/goodread?q=${query}`)
    .then(response => response.json())
    .then(
      books => dispatch(receiveBooks(query, books, id)),
      error => dispatch(failureBooks(query, id))
    );
};
