import React from "react";

const SubTodoTitleH = ({ handleTitleClick, title, toggleSubTask }) => {
  const titleClick = () => {
    if (title === "+ add new sub task") {
      handleTitleClick();
    } else {
      toggleSubTask();
    }
  };

  return (
    <h5 className="card-title" onClick={titleClick}>
      {title}
    </h5>
  );
};

export default SubTodoTitleH;
