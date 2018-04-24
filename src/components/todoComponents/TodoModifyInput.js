import React, { Component } from "react";
import { InlineInput } from "../BasicComponents";

const TodoModifyInput = ({ todo, todoModifyCancel, todoModifySuccess }) => {
  const handleCallBack = text => {
    todoModifySuccess(todo.id, text);
    todoModifyCancel(todo.id);
  };

  return <InlineInput inputText={todo.todo} cbFn={handleCallBack} />;
};

export default TodoModifyInput;
