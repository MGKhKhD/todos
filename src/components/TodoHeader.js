import React from "react";

import AddTodo from "../containers/addTodo";
import TodosList from "../containers/TodosList";
import Footer from "../containers/Footer";

const TodoHeader = ({ todoCount }) => (
  <div>
    <div className="card-header">
      <AddTodo />
    </div>
    {todoCount > 0 && (
      <div className="card-block">
        <Footer />
        <TodosList />
      </div>
    )}
  </div>
);

export default TodoHeader;
