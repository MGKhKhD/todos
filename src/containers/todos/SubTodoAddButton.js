import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubTask } from "../../selectors/todoSelectors";
import { updateSubTask } from "../../actions/todoActions";

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
      this.setState({ ...this.state, initiated: true, cardColor: "primary" });
      return;
    }
  };

  toggleSubTask = () => {
    this.setState(
      prevState => ({
        ...prevState,
        status: prevState.status === "completed" ? "active" : "completed",
        cardColor: prevState.status === "active" ? "success" : "danger"
      }),
      () => {
        if (this.props.subTask !== {}) {
          this.props.updateSubTask({
            status: this.state.status,
            id: this.props.subTask.id
          });
          return;
        }
        return;
      }
    );
  };

  closeTitleClick = title => {
    this.setState({
      ...this.state,
      title: title,
      cardColor: "danger",
      status: "active"
    });
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
    const { todoBoard, subTask } = this.props;
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
        {initiated &&
          title !== "+ add new sub task" && (
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
          <SubTodoTitle
            title={title}
            handleTitleClick={this.titleClick}
            toggleSubTask={this.toggleSubTask}
            closeTitleClick={this.closeTitleClick}
            test={initiated && title === "+ add new sub task"}
            todoBoard={todoBoard}
          />
          {initiated &&
            title !== "+ add new sub task" && (
              <p className="card-text" onClick={this.descriptionClick}>
                {description}
              </p>
            )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const subTask = getSubTask(state.todoState, ownProps.todoBoard);
  return {
    subTask
  };
}

export default connect(mapStateToProps, { updateSubTask })(SubTodoAddButton);
