import React, { Component } from "react";

import BasicComponents from "../../components/BasicComponents";
import SubTodoTitle from "../../components/todoComponents/SubTodoTitle";

class SubTodoAddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiated: false,
      status: "active",
      cardColor: "light",
      header: "due date",
      title: "+ add new sub task",
      description: "description of task..."
    };
  }

  titleClick = () => {
    if (!this.state.initiated) {
      this.setState({ initiated: true, cardColor: "primary" });
    }
  };

  headerClick = () => {
    console.log("header");
  };

  deleteClick = () => {
    this.setState({ initiated: false, cardColor: "light" });
  };

  descriptionClick = () => {
    console.log("description");
  };

  render() {
    const { todoBoard } = this.props;
    const {
      cardColor,
      header,
      title,
      description,
      status,
      initiated
    } = this.state;
    return (
      <div
        className={`card border-${cardColor} mb-3`}
        style={{ maxWidth: "15rem" }}
      >
        {initiated && (
          <div className="card-header">
            <BasicComponents.Span onClick={this.headerClick}>
              {header}
            </BasicComponents.Span>
            <BasicComponents.Span
              onClick={this.deleteClick}
              className="float-right"
            >
              X
            </BasicComponents.Span>
          </div>
        )}
        <div
          className={`card-body text-${
            cardColor === "light" ? "primary" : cardColor
          }`}
        >
          <SubTodoTitle title={title} handleTitleClick={this.titleClick} />
          {initiated && (
            <p className="card-text" onClick={this.descriptionClick}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default SubTodoAddButton;
