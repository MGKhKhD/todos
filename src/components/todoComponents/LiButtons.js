import React from "react";

import ArchiveLinkTodo from "../../containers/todos/ArchiveLinkTodo";
import DeleteTodoButton from "../../containers/todos/DeleteTodoButton";
import TodoBlockingButtons from "./TodoBlockingButtons";
import ModifyLink from "../../containers/todos/ModifyLink";
import CommentTag from "../../containers/CommentTag";

const LiButtons = ({
  todo,
  comment,
  conditionModify,
  conditionBlocks,
  handleBlockedByClick,
  handleBlockingClick
}) => (
  <React.Fragment>
    <CommentTag id={todo.id} comment={comment} />
    <ModifyLink id={todo.id} condition={conditionModify} />
    <TodoBlockingButtons
      id={todo.id}
      onBlockingClick={id => handleBlockingClick(id)}
      onBlockedByClick={id => handleBlockedByClick(id)}
      condition={conditionBlocks}
    />
    <DeleteTodoButton todo={todo} />
    <ArchiveLinkTodo todo={todo} />
  </React.Fragment>
);

export default LiButtons;
