import { combineReducers } from "redux";
import {
  ADD_TODO,
  SET_FILTER,
  TODO_CLICK,
  TODO_DELETE,
  ARCHIVE_TODO_DELETE,
  ARCHIVE_TODO,
  ARCHIVE_COMMENTS_OF_TODO,
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
  filters_constants,
  MODIFY_COMMENT,
  CANCEL_MODIFY_COMMENT,
  TOGGLE_ALL_TODOS,
  DELETE_ALL_COMPLETED_TODOS
} from "../types";

import { initialTodoState, initialCommentState } from "../mockedData";

// let initialTodoState = {
//   todosIds: [],
//   todos: []
// };

export function todos(state = initialTodoState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todosIds: [...state.todosIds, action.id],
        todos: [
          ...state.todos,
          {
            todo: action.text,
            id: action.id,
            completed: action.completed,
            fromWhere: action.fromWhere
          }
        ]
      };
    case TODO_DELETE:
      return {
        ...state,
        todosIds: state.todosIds.filter(index => index !== action.id),
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case TODO_CLICK:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            return { ...todo, completed: !todo.completed };
          } else {
            return todo;
          }
        })
      };
    case TODO_MODIFY_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(entity => {
          if (entity.id === action.id) {
            return { ...entity, todo: action.text };
          } else {
            return entity;
          }
        })
      };
    case TOGGLE_ALL_TODOS: {
      let superStatus = state.todos.every(todo => todo.completed);
      return {
        ...state,
        todos: state.todos.map(todo => {
          return { ...todo, completed: !superStatus };
        })
      };
    }
    case DELETE_ALL_COMPLETED_TODOS: {
      let newTodos = state.todos.filter(todo => !todo.completed);
      let newIds = [];
      newTodos.forEach(todo => newIds.push(todo.id));
      return {
        ...state,
        todosIds: newIds,
        todos: newTodos
      };
    }
    default:
      return state;
  }
}

export function filter(state = filters_constants.ALL, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export const getTodos = (initState, filter) => {
  let state = initState.todos;
  switch (filter) {
    case filters_constants.ALL:
      return state.todos;
    case filters_constants.COMPLETED: {
      let todos = state.todos.filter(todo => todo.completed);
      return todos;
    }
    case filters_constants.ACTIVE: {
      let todos = state.todos.filter(todo => !todo.completed);
      return todos;
    }
    case filters_constants.ARCHIVES: {
      return initState.archiveTodos.todos;
    }
    default:
      return state.todos;
  }
};

export const getTotalTodos = state =>
  state.todos.todosIds.length + state.archiveTodos.todosIds.length;

export const getTotalTodosByFilter = initState => {
  let { filter, todos } = initState;
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
      return initState.archiveTodos.todosIds.length;
    default:
      return todos.todosIds.length;
  }
};

export function modify(state = { status: "", id: -1 }, action) {
  switch (action.type) {
    case TODO_MODIFY_REQUEST:
      return { status: "requested", id: action.id };
    case TODO_MODIFY_CANCEL:
      return { status: "canceled", id: action.id };
    default:
      return state;
  }
}

export function commentManagement(
  state = { status: "", id: -1, commentId: -1 },
  action
) {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { commentId: -1, status: "requested", id: action.id };
    case COMMENT_REQUEST_CANCELLED:
      return { commentId: -1, status: "", id: -1 };
    case SET_COMMENT_MODIFY:
      return { ...state, status: "needModify", commentId: action.commentId };
    case CANCEL_MODIFY_COMMENT:
      return { ...state, status: "requested", commentId: -1 };
    default:
      return state;
  }
}

// let initialCommentState = {
//   commentIds: [],
//   comments: []
// };

export function comments(state = initialCommentState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        commentIds: [...state.commentIds, action.id],
        comments: [
          ...state.comments,
          {
            comment: action.comment,
            id: action.id,
            todoIndex: action.todoIndex
          }
        ]
      };
    case DELETE_COMMENTS: {
      let effectiveComments = state.comments.filter(
        comment => comment.todoIndex === action.todoIndex
      );
      return {
        ...state,
        commentIds: state.commentIds.filter(id => {
          let keep = true;
          effectiveComments.forEach(comment => {
            if (comment.id === id) keep = false;
          });
          return keep;
        }),
        comments: state.comments.filter(
          comment => effectiveComments.indexOf(comment) === -1
        )
      };
    }
    case DELETE_A_COMMENT: {
      return {
        ...state,
        commentIds: state.commentIds.filter(id => id !== action.commentId),
        comments: state.comments.filter(
          comment => comment.id !== action.commentId
        )
      };
    }
    case MODIFY_COMMENT: {
      const oldIds = state.commentIds.filter(id => id !== action.commentId);
      const oldComments = state.comments.filter(
        comment => comment.id !== action.commentId
      );
      return {
        ...state,
        commentIds: [...oldIds, action.commentId],
        comments: [
          ...oldComments,
          {
            comment: action.comment,
            id: action.commentId,
            todoIndex: action.todoIndex
          }
        ]
      };
    }
    default:
      return state;
  }
}

export const getTotalCommentsForTodo = state => {
  let commentsForActiveTodo = [];
  if (
    state.commentManagement.status !== "" &&
    state.comments.comments.length > 0
  ) {
    commentsForActiveTodo = state.comments.comments.filter(
      comment => comment.todoIndex === state.commentManagement.id
    );
  }
  return commentsForActiveTodo;
};

export const error = (state = "", action) => {
  switch (action.type) {
    case SET_TODO_ERROR:
      return action.error;
    case CANCEL_TODO_ERROR:
      return "";
    default:
      return state;
  }
};

export function archiveTodos(state = { todosIds: [], todos: [] }, action) {
  switch (action.type) {
    case ARCHIVE_TODO: {
      const { todo } = action;
      return {
        ...state,
        todosIds: [...state.todosIds, action.archiveId],
        todos: [
          ...state.todos,
          {
            ...todo,
            archiveId: action.archiveId
          }
        ]
      };
    }
    case ARCHIVE_TODO_DELETE:
      return {
        ...state,
        todosIds: state.todosIds.filter(index => index !== action.archiveId),
        todos: state.todos.filter(todo => todo.archiveId !== action.archiveId)
      };
    default:
      return state;
  }
}

export function archiveComments(state = [], action) {
  switch (action.type) {
    case ARCHIVE_COMMENTS_OF_TODO:
      return [
        ...state,
        {
          todoId: action.todoId,
          archivedComments: action.archivedComments,
          archiveId: action.archiveId
        }
      ];
    default:
      return state;
  }
}

const todoReducers = combineReducers({
  todos,
  filter,
  modify,
  commentManagement,
  comments,
  error,
  archiveTodos,
  archiveComments
});

export default todoReducers;
