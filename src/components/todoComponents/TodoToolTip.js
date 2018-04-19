import React, { Component } from "react";
import { BasicPortal } from "../BasicComponents";
import TodoClick from "./TodoClick";

const toolTipStyle = {
  position: "fixed",
  padding: "8px",
  background: "#333",
  color: "white",
  textAlign: "center",
  fontSize: "16px"
};

class TodoToolTip extends Component {
  render() {
    const { todos, blockingInfo, todo, todoClick } = this.props;
    return (
      <TodoClick
        todos={todos}
        blockingInfo={blockingInfo}
        todo={todo}
        todoClick={todoClick}
      >
        {({ clicked, position }) => {
          const style = { ...toolTipStyle, ...position };
          return (
            <React.Fragment>
              <strong style={{ color: todo.completed ? "green" : "red" }}>
                {todo.todo.length > 20
                  ? todo.todo.substring(0, 20).concat("...")
                  : todo.todo}
              </strong>
              {clicked && (
                <BasicPortal>
                  <div style={style}>
                    {`This task is blocked, not possible to complete without cmpleting blocking todos first.`}
                  </div>
                </BasicPortal>
              )}
            </React.Fragment>
          );
        }}
      </TodoClick>
    );
  }
}

export default TodoToolTip;
