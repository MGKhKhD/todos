import React from "react";

import BasicComponents from "../BasicComponents";

const SubTaskDelete = ({ deleteClick }) => {
  const click = () => {
    deleteClick();
  };

  return (
    <BasicComponents.Span onClick={click} className="float-right">
      X
    </BasicComponents.Span>
  );
};

export default SubTaskDelete;
