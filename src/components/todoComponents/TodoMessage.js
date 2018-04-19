import React from "react";
import { withCondition } from "../HOC";
import BasicComponents from "../BasicComponents";
import { filters_constants } from "../../types";

const TodoMessage = ({ errorMessage, cancelErrorTodo, setFilter }) => {
  const handleClick = e => {
    e.preventDefault();
    if (errorMessage !== "") {
      cancelErrorTodo();
      setFilter(filters_constants.ALL);
    }
    return;
  };

  return (
    <BasicComponents.Message alert="danger" message={errorMessage} tag="h4">
      <a className="float-right" href="" onClick={handleClick}>
        X
      </a>
    </BasicComponents.Message>
  );
};

export default withCondition(TodoMessage);
