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
export const filters_constants = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

let todoId = 0;
let commentIndex = 0;

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
    id: todoId++,
    completed: false
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
