import React from "react";

import AddTodo from "../containers/todos/addTodo";
import TodosList from "../containers/todos/TodosList";
import Footer from "../containers/Footer";
import BasicComponents from "./BasicComponents";
import TodoBoardMainPage from "../containers/todoBoardPage/TodoBoardMainPage";

import { filters_constants } from "../types";

const TodoHeader = ({ todoCount, todoBoard, filter }) => {
  const setMessage = filterType => {
    let message;
    if (
      filterType === filters_constants.ACTIVE ||
      filterType === filters_constants.COMPLETED ||
      filterType === filters_constants.ARCHIVES
    ) {
      message = `No ${filterType.toLowerCase()} todos to list`;
    }
    return message || "No todo to list";
  };

  if (todoBoard.todoId === -1) {
    return (
      <div>
        <div className="card-header">
          <AddTodo />
        </div>
        <div className="card-block">
          <Footer />
          {todoCount > 0 && <TodosList />}
          {todoCount === 0 && (
            <BasicComponents.Message
              message={setMessage(filter)}
              alert="danger"
            />
          )}
        </div>
      </div>
    );
  } else {
    return <TodoBoardMainPage id={todoBoard.todoId} />;
  }
};

export default TodoHeader;
