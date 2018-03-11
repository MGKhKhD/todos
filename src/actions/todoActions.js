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

import { unBookmarkArticle } from "./newsPagesActions";

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

export function makeDeleteTodo(id) {
  return {
    type: TODO_DELETE,
    id
  };
}

export const deleteTodo = (id, fromWhere) => (dispatch, getState) => {
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
