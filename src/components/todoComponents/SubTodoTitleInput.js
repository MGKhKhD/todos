import React from "react";
import { connect } from "react-redux";
import { addSubTask } from "../../actions/todoActions";
import { InlineInput } from "../BasicComponents";

const SubTodoTitleInput = ({
  title,
  todoBoard,
  addSubTask,
  closeTitleClick,
  cbFn
}) => {
  const handleCallBack = text => {
    addSubTask({
      text,
      parentId: todoBoard.todoId
    });
    closeTitleClick(text);
  };

  return <InlineInput inputText={title} cbFn={handleCallBack} />;
};

export default connect(null, { addSubTask })(SubTodoTitleInput);
