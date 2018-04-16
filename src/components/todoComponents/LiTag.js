import React from "react";

import TodoLiTag from "../../containers/todos/TodoLiTag";
import CommentSegment from "../../containers/CommentSegment";
import BlocksTodoList from "../BlocksTodoList";

const LiTag = ({
  todo,
  modify,
  todos,
  id,
  restricted,
  conditionComment,
  conditionBlocks,
  blockStat
}) => {
  return (
    <React.Fragment>
      <TodoLiTag todo={todo} modify={modify} todos={todos} />
      <BlocksTodoList
        condition={conditionBlocks}
        blockStat={blockStat}
        todo={todo}
        todos={todos}
      />
      <CommentSegment
        id={id}
        restricted={!todo.archiveId}
        condition={conditionComment}
      />
    </React.Fragment>
  );
};

export default LiTag;
