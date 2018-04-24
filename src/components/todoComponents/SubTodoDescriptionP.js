import React from "react";

const SubTodoDescriptionP = ({ handleDescriptionClick, title }) => {
  const descriptionClick = () => {
    if (title !== "+ add new sub task") {
      handleDescriptionClick();
      return;
    }
    return;
  };

  return (
    <p className="card-text" onClick={this.descriptionClick}>
      {description}
    </p>
  );
};

export default SubTodoDescriptionP;
