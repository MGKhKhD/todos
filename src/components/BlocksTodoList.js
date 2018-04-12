import React from "react";
import BlockedBy from "../containers/BlockedBy";
import Blocks from "../containers/Blocks";

const BlocksTodoList = ({ blockStat, id, todos }) => {
  if (
    blockStat.filter(({ todoId, blocks }) => todoId === id && blocks).length > 0
  ) {
    return <Blocks id={id} todos={todos} />;
  } else if (
    blockStat.filter(({ todoId, blockedBy }) => todoId === id && blockedBy)
      .length > 0
  ) {
    return <BlockedBy id={id} todos={todos} />;
  } else {
    return null;
  }
};

export default BlocksTodoList;
