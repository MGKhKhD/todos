import { createSelector } from "reselect";

import { filters_constants } from "../types";

export const getTotalTodosByFilter = createSelector(
  [state => state.todos, state => state.archiveTodos, state => state.filter],
  (todos, archive, filter) => {
    switch (filter) {
      case filters_constants.ALL:
        return todos.todosIds.length;
      case filters_constants.COMPLETED: {
        const effectiveTodos = todos.todos.filter(todo => todo.completed);
        return effectiveTodos.length;
      }
      case filters_constants.ACTIVE: {
        const effectiveTodos = todos.todos.filter(todo => !todo.completed);
        return effectiveTodos.length;
      }
      case filters_constants.ARCHIVES:
        return archive.todosIds.length;
      default:
        return todos.todosIds.length;
    }
  }
);

export const getTotalTodos = createSelector(
  [
    state => state.todos.todosIds.length,
    state => state.archiveTodos.todosIds.length
  ],
  (todosLength, archivedLength) => todosLength + archivedLength
);

export const getTotalCommentsForTodo = createSelector(
  [state => state.commentManagement, state => state.comments],
  (commentManagement, comments) => {
    let commentsForActiveTodo = [];
    if (commentManagement.status !== "" && comments.comments.length > 0) {
      commentsForActiveTodo = comments.comments.filter(
        comment => comment.todoIndex === commentManagement.id
      );
    }
    return commentsForActiveTodo;
  }
);

export const getTodos = createSelector(
  [
    state => state.todoState.todos,
    state => state.todoState.archiveTodos,
    state => state.todoState.filter
  ],
  (todos, archives, filter) => {
    switch (filter) {
      case filters_constants.ALL:
        return todos.todos;
      case filters_constants.COMPLETED: {
        return todos.todos.filter(todo => todo.completed);
      }
      case filters_constants.ACTIVE: {
        return todos.todos.filter(todo => !todo.completed);
      }
      case filters_constants.ARCHIVES: {
        return archives.todos;
      }
      default:
        return todos.todos;
    }
  }
);
