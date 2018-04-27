import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSubTask } from "../../actions/todoActions";

import BasicComponents from "../../components/BasicComponents";
import SubTodoTitle from "../../components/todoComponents/SubTodoTitle";

class SubTodoAddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiated: false,
      cardColor: "light",
      title: "+ add new sub task"
    };
  }

  titleClick = () => {
    if (!this.state.initiated) {
      this.setState({ ...this.state, initiated: true, cardColor: "primary" });
      return;
    }
  };

  closeTitleClick = title => {
    this.setState({
      initiated: false,
      title: "+ add new sub task",
      cardColor: "light"
    });
  };

  render() {
    const { todoBoard } = this.props;
    const { cardColor, title, initiated } = this.state;
    return (
      <div
        className={`card border-${cardColor} mt-3 float-right`}
        style={{ maxWidth: "15rem" }}
      >
        {initiated &&
          title !== "+ add new sub task" && (
            <div className="card-header">
              <BasicComponents.Span>due date</BasicComponents.Span>
            </div>
          )}
        <div
          className={`card-body text-${
            cardColor === "light" ? "primary" : cardColor
          }`}
        >
          <SubTodoTitle
            title={title}
            handleTitleClick={this.titleClick}
            toggleSubTask={() => {}}
            closeTitleClick={this.closeTitleClick}
            test={initiated && title === "+ add new sub task"}
            todoBoard={todoBoard}
          />
          {initiated &&
            title !== "+ add new sub task" && (
              <p className="card-text" onClick={this.descriptionClick}>
                description of task...
              </p>
            )}
        </div>
      </div>
    );
  }
}

export default connect(null, { updateSubTask })(SubTodoAddButton);
