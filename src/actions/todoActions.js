import {
  ADD_TODO,
  SET_FILTER,
  TODO_CLICK,
  TODO_DELETE,
  TODO_MODIFY_REQUEST,
  TODO_MODIFY_CANCEL,
  TODO_MODIFY_SUCCESS,
  COMMENT_REQUEST,
  ADD_COMMENT,
  DELETE_COMMENTS,
  COMMENT_REQUEST_CANCELLED,
  SET_TODO_ERROR,
  CANCEL_TODO_ERROR
} from "../types";

let commentIndex = 0;

let todoId = 0;
export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
    id: todoId++,
    completed: false
  };
}

export function setErrorTodo(error) {
  return {
    type: SET_TODO_ERROR,
    error
  };
}

export function cancelErrorTodo() {
  return {
    type: CANCEL_TODO_ERROR
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  };
}

export function todoClick(id) {
  return {
    type: TODO_CLICK,
    id
  };
}

export function deleteTodo(id) {
  return {
    type: TODO_DELETE,
    id
  };
}

export function todoModifyRequest(id) {
  return {
    type: TODO_MODIFY_REQUEST,
    id
  };
}

export function todoModifyCancel(id) {
  return {
    type: TODO_MODIFY_CANCEL,
    id
  };
}

export function todoModifySuccess(id, text) {
  return {
    type: TODO_MODIFY_SUCCESS,
    id,
    text
  };
}

export function commentRequest(id) {
  return {
    type: COMMENT_REQUEST,
    id
  };
}

export function cancellCommentRequest() {
  return {
    type: COMMENT_REQUEST_CANCELLED
  };
}

export function addComment(comment, id) {
  return {
    type: ADD_COMMENT,
    comment,
    id: commentIndex++,
    todoIndex: id
  };
}

export function deleteCommentsOfTodo(id) {
  return {
    type: DELETE_COMMENTS,
    todoIndex: id
  };
}
