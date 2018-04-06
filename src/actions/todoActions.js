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
  CANCEL_TODO_ERROR,
  SET_COMMENT_MODIFY,
  DELETE_A_COMMENT,
  MODIFY_COMMENT,
  CANCEL_MODIFY_COMMENT
} from "../types";

import { unBookmarkArticle } from "./newsPagesActions";

let commentIndex = 4; //based on mockdata
let todoId = 2; //based on mock data

export function makeAddTodo(text, fromWhere) {
  return {
    type: ADD_TODO,
    text,
    id: todoId++,
    completed: false,
    fromWhere
  };
}

export const addTodo = (text, fromWhere) => (dispatch, getState) => {
  if (getState().todoState.commentManagement.status === "requested") {
    dispatch(cancellCommentRequest());
  }

  if (getState().todoState.modify.status === "requested") {
    const id = getState().todoState.modify.id;
    dispatch(todoModifyCancel(id));
  }
  dispatch(makeAddTodo(text, fromWhere));
};

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

export function makeDeleteTodo(id) {
  return {
    type: TODO_DELETE,
    id
  };
}

export const deleteTodo = (id, fromWhere) => (dispatch, getState) => {
  if (getState().todoState.commentManagement.status === "requested") {
    dispatch(cancellCommentRequest());
  }

  if (getState().todoState.modify.status === "requested") {
    const id = getState().todoState.modify.id;
    dispatch(todoModifyCancel(id));
  }

  const todos = getState().todoState.todos;
  if (todos !== {}) {
    if (fromWhere === "todosPage") {
      const arr = todos.todos;
      arr.forEach(todo => {
        if (todo.id === id) {
          const bookmarks = getState().externalState.bookmarks;

          if (bookmarks !== {}) {
            for (let key in bookmarks) {
              if (
                bookmarks[key].bookmarked &&
                bookmarks[key].article.title === todo.todo
              ) {
                dispatch(
                  unBookmarkArticle(
                    bookmarks[key].id,
                    bookmarks[key].article,
                    fromWhere
                  )
                );
              }
            }
          }
          dispatch(makeDeleteTodo(id));
          dispatch(deleteCommentsOfTodo(id));
        }
      });
    } else {
      dispatch(makeDeleteTodo(id));
      dispatch(deleteCommentsOfTodo(id));
    }
  }
};

function makeTodoModifyRequest(id) {
  return {
    type: TODO_MODIFY_REQUEST,
    id
  };
}

export const todoModifyRequest = id => (dispatch, getState) => {
  if (getState().todoState.commentManagement.status === "requested") {
    dispatch(cancellCommentRequest());
  }
  dispatch(makeTodoModifyRequest(id));
};

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

function makeCommentRequest(id) {
  return {
    type: COMMENT_REQUEST,
    id
  };
}

export const commentRequest = id => (dispatch, getState) => {
  if (getState().todoState.modify.status === "requested") {
    const index = getState().todoState.modify.id;
    dispatch(todoModifyCancel(index));
  }
  dispatch(makeCommentRequest(id));
};

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

export function modifyComment(comment, id, commentId) {
  return {
    type: MODIFY_COMMENT,
    comment,
    commentId,
    todoIndex: id
  };
}

export function cancelModifyComment() {
  return {
    type: CANCEL_MODIFY_COMMENT
  };
}

export function deleteCommentsOfTodo(id) {
  return {
    type: DELETE_COMMENTS,
    todoIndex: id
  };
}

export function setCommentModify(id) {
  return {
    type: SET_COMMENT_MODIFY,
    commentId: id
  };
}

export function deleteComment(id) {
  return {
    type: DELETE_A_COMMENT,
    commentId: id
  };
}
