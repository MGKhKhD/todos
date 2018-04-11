import {
  ADD_TODO,
  SET_FILTER,
  TODO_CLICK,
  TODO_DELETE,
  ARCHIVE_TODO_DELETE,
  ARCHIVE_TODO,
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
  CANCEL_MODIFY_COMMENT,
  ARCHIVE_COMMENTS_OF_TODO,
  filters_constants,
  TOGGLE_ALL_TODOS,
  DELETE_ALL_COMPLETED_TODOS,
  DELETE_ARCHIVE_COMMENTS_OF_TODO
} from "../types";

import { unBookmarkArticle } from "./newsPagesActions";
import { getAllTodosByFilter } from "../selectors/todoSelectors";

let commentIndex = 4; //based on mockdata
let todoId = 2; //based on mock data

export function makeAddTodo(text, fromWhere, ...args) {
  let completed;
  if (args.length > 0) completed = args[0];
  return {
    type: ADD_TODO,
    text,
    id: todoId++,
    completed: completed || false,
    fromWhere
  };
}

export function setErrorTodo(error) {
  return {
    type: SET_TODO_ERROR,
    error
  };
}

export const addTodo = (text, fromWhere) => (dispatch, getState) => {
  let initState = getState().todoState;

  if (initState.commentManagement.status !== "") {
    dispatch(cancellCommentRequest());
  }

  if (initState.modify.status === "requested") {
    const id = initState.modify.id;
    dispatch(todoModifyCancel(id));
  }

  let allActiveTodos = getAllTodosByFilter(
    initState,
    filters_constants.ACTIVE
  ).filter(t => t.todo.toLowerCase() === text.toLowerCase());
  let allCompletedTodos = getAllTodosByFilter(
    initState,
    filters_constants.COMPLETED
  ).filter(t => t.todo.toLowerCase() === text.toLowerCase());
  let allArchivedTodos = getAllTodosByFilter(
    initState,
    filters_constants.ARCHIVES
  ).filter(t => t.todo.toLowerCase() === text.toLowerCase());

  let result = "";

  if (allActiveTodos && allActiveTodos.length > 0) {
    result = "active";
  } else if (allCompletedTodos && allCompletedTodos.length > 0) {
    result = "completed";
  } else if (allArchivedTodos && allArchivedTodos.length > 0) {
    result = "archived";
  }

  let error;
  if (result === "active") {
    error = `${text} is already in active list!`;
    dispatch(setErrorTodo(error));
  } else if (result === "completed") {
    error = `${text} is already in completed list`;
    dispatch(setErrorTodo(error));
  } else if (result === "archived") {
    error = `${text} is archived. Reactivate todo instead.`;
    dispatch(setErrorTodo(error));
  } else {
    dispatch(makeAddTodo(text, fromWhere));
  }
};

export function cancelErrorTodo() {
  return {
    type: CANCEL_TODO_ERROR
  };
}

export function makeSetFilter(filter) {
  return {
    type: SET_FILTER,
    filter
  };
}

export function toggleAllTodos() {
  return {
    type: TOGGLE_ALL_TODOS
  };
}

export function deleteAllCompleted() {
  return {
    type: DELETE_ALL_COMPLETED_TODOS
  };
}

export const setFilter = filter => dispatch => {
  dispatch(makeSetFilter(filter));
  if (filter === filters_constants.TOGGLE_ALL) {
    dispatch(toggleAllTodos());
  } else if (filter === filters_constants.DELETE_COMPLETED) {
    dispatch(deleteAllCompleted());
  }
};

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

export function makeDeleteArchiveTodo(archiveId) {
  return {
    type: ARCHIVE_TODO_DELETE,
    archiveId
  };
}

export const deleteTodo = (id, fromWhere, archiveId) => (
  dispatch,
  getState
) => {
  if (!archiveId) {
    // delete from on-progress lists of todos
    // if todo is a bookmark article, in the case of unbookmark it will be deleted from
    // newsPagesActions
    if (getState().todoState.commentManagement.status !== "") {
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
  } else {
    // delete from archived todos
    if (getState().todoState.commentManagement.status === "requested") {
      dispatch(cancellCommentRequest());
    }
    const todos = getState().todoState.archiveTodos;
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
            dispatch(makeDeleteArchiveTodo(archiveId));
            //dispatch(deleteCommentsOfTodo(id));
          }
        });
      } else {
        dispatch(makeDeleteArchiveTodo(archiveId));
        //dispatch(deleteCommentsOfTodo(id));
      }
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

export function makeArchiveTodo(todo, archiveId) {
  return {
    type: ARCHIVE_TODO,
    todo,
    archiveId
  };
}

export function makeArchiveCommentsOfTodo(id, archivedComments, archiveId) {
  return {
    type: ARCHIVE_COMMENTS_OF_TODO,
    todoId: id,
    archivedComments,
    archiveId
  };
}

let archiveId = 0;

export const archiveTodo = id => (dispatch, getState) => {
  archiveId++;
  const state = getState().todoState;

  let commentsForTodo = [];
  if (state.comments.comments.length > 0) {
    commentsForTodo = state.comments.comments.filter(
      comment => comment.todoIndex === id
    );
  }

  if (commentsForTodo.length > 0)
    dispatch(makeArchiveCommentsOfTodo(id, commentsForTodo, archiveId));

  const todo = state.todos.todos.filter(todo => todo.id === id);
  dispatch(makeArchiveTodo(todo[0], archiveId));
  dispatch(deleteTodo(id, "todosPage"));
};

export const reactivateTodo = ({ todo, fromWhere, completed, archiveId }) => (
  dispatch,
  getState
) => {
  const state = getState().todoState;
  const archiveTodo = state.archiveTodos.todos.filter(
    item => item.archiveId === archiveId
  );
  const todoId = archiveTodo[0].id;
  console.log("old", todoId);

  let commentsForTodo = [];
  if (state.archiveComments.commentIds.length > 0) {
    commentsForTodo = state.archiveComments.comments.filter(
      comment => comment.todoIndex === todoId
    );
  }

  dispatch(makeDeleteArchiveTodo(archiveId));
  dispatch(makeAddTodo(todo, fromWhere, completed));

  const newState = getState().todoState;
  const newTodo = newState.todos.todos.filter(item => item.todo === todo);
  const newTodoId = newTodo[0].id;

  if (commentsForTodo.length > 0) {
    commentsForTodo.forEach(comment => {
      dispatch(addComment(comment.comment, newTodoId));
    });
    dispatch(deleteArchiveCommentsOfTodo(archiveId));
  }
};

export function deleteArchiveCommentsOfTodo(archiveId) {
  return {
    type: DELETE_ARCHIVE_COMMENTS_OF_TODO,
    archiveId
  };
}
