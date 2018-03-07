import { combineReducers } from "redux";
import {
  ADD_TODO,
  SET_FILTER,
  filters_constants,
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
} from "../actions/index";

let initialTodoState = {
  todosIds: [],
  todos: []
};

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
            completed: action.completed
          }
        ]
      };
    case TODO_DELETE:
      return {
        ...state,
        todosIds: [
          ...state.todosIds.slice(0, action.id),
          ...state.todosIds.slice(action.id + 1)
        ],
        todos: [
          ...state.todos.slice(0, action.id),
          ...state.todos.slice(action.id + 1)
        ]
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

export const getTodos = (state, filter) => {
  switch (filter) {
    case filters_constants.ALL:
      return state;
    case filters_constants.COMPLETED: {
      let todos = state.filter(todo => todo.completed);
      return todos;
    }
    case filters_constants.ACTIVE: {
      let todos = state.filter(todo => !todo.completed);
      return todos;
    }
    default:
      return state;
  }
};

export const getTotalTodos = state => state.todos.todosIds.length;

export const getTotalTodosByFilter = state => {
  let { filter, todos } = state;
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

export function commentManagement(state = { status: "", id: -1 }, action) {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { status: "requested", id: action.id };
    case COMMENT_REQUEST_CANCELLED:
      return { status: "", id: -1 };
    default:
      return state;
  }
}

let initialCommentState = {
  commentIds: [],
  comments: []
};

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
    default:
      return state;
  }
}

export const getTotalCommentsForTodo = state => {
  let commentsForActiveTodo = [];
  if (
    state.commentManagement.status === "requested" &&
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

const rootReducer = combineReducers({
  todos,
  filter,
  modify,
  commentManagement,
  comments,
  error
});

export default rootReducer;
