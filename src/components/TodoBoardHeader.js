import React from "react";

const BlackSubTask = () => (
  <button className="btn btn-outline-dark btn-lg center">+ Add Sub Task</button>
);

const TodoBoardHeader = ({ onClick, todo }) => (
  <div>
    <div className="card-header">
      <div className="row">
        <button className="btn btn-primary mr-1 ml-1" onClick={onClick}>
          Back to Todos
        </button>
        <button className="btn btn-dark mr-1 ml-1">Comments</button>
      </div>
    </div>
    <div className="card-block">
      <p className="ml-1">
        <strong>{todo.todo}</strong>
      </p>
    </div>
    <BlackSubTask />
  </div>
);

export default TodoBoardHeader;
