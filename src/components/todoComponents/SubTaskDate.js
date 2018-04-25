import React from "react";

import BasicComponents from "../BasicComponents";

const SubTaskDate = ({ dueDate, headerClick }) => {
  const click = () => {
    headerClick();
  };

  return <BasicComponents.Span onClick={click}>{dueDate}</BasicComponents.Span>;
};

export default SubTaskDate;
