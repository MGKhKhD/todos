import React from "react";

const TodoClick = ({ todos, blockingInfo, todo, todoClick }) => {
  const handleClick = idx => {
    //first check if the idx is blocked by and active todo
    let result = false;
    for (let key in blockingInfo) {
      if (
        key &&
        parseInt(key, 10) !== idx &&
        blockingInfo[key].indexOf(idx) > -1
      ) {
        if (
          todos.filter(
            ({ completed, id }) => id === parseInt(key, 10) && !completed
          ).length > 0
        ) {
          result = true;
        }
      }
    }

    if (!result) {
      // todo is not blocked
      todoClick(idx);
      return;
    }
    return;
  };

  return (
    <button
      className="btn btn-link"
      onClick={() => handleClick(todo.id)}
      style={{ fontSize: "20px" }}
    >
      <strong style={{ color: todo.completed ? "green" : "red" }}>
        {todo.todo.length > 20
          ? todo.todo.substring(0, 20).concat("...")
          : todo.todo}
      </strong>
    </button>
  );
};

export default TodoClick;
