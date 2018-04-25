import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSubTask, deleteOneSubTask } from "../../actions/todoActions";

import BasicComponents from "../../components/BasicComponents";
import SubTodoTitle from "../../components/todoComponents/SubTodoTitle";
import SubTaskTodoHeader from "../../components/todoComponents/SubTaskTodoHeader";

class SubTodoElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiated: true,
      status: this.props.subTask.status || "active",
      cardColor: this.props.subTask.status === "active" ? "danger" : "success",
      header: this.props.subTask.dueDate || "due date",
      title: this.props.subTask.subTask,
      description: this.props.subTask.description || "description of task..."
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
    this.props.deleteOneSubTask(this.props.subTask.id);
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
        <SubTaskTodoHeader
          condition={initiated && title !== "+ add new sub task"}
          dueDate={header}
          deleteClick={this.deleteClick}
          headerClick={this.headerClick}
        />
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

export default connect(null, { updateSubTask, deleteOneSubTask })(
  SubTodoElement
);
