import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSubTask, deleteOneSubTask } from "../../actions/todoActions";

import SubTodoTitle from "../../components/todoComponents/SubTodoTitle";
import SubTaskTodoHeader from "../../components/todoComponents/SubTaskTodoHeader";
import SubTodoDescription from "../../components/todoComponents/SubTodoDescription";

class SubTodoElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initiated: true,
      status: this.props.subTask.status || "active",
      descriptionUpdate: false,
      dateUpdate: false
    };
  }

  titleClick = () => {
    if (!this.state.initiated) {
      this.setState({ ...this.state, initiated: true });
      return;
    }
  };

  toggleSubTask = () => {
    this.setState(
      prevState => ({
        ...prevState,
        status: prevState.status === "completed" ? "active" : "completed"
      }),
      () => {
        if (this.props.subTask !== {}) {
          this.props.updateSubTask({
            ...this.props.subTask,
            status: this.state.status
          });
          return;
        }
        return;
      }
    );
  };

  closeTitleClick = () => {
    this.setState({
      ...this.state,
      status: "active"
    });
  };

  headerClick = () => {
    this.setState(prevState => ({
      ...prevState,
      dateUpdate: !prevState.dateUpdate
    }));
  };

  deleteClick = () => {
    this.props.deleteOneSubTask(this.props.subTask.id);
  };

  descriptionClick = () => {
    this.setState({ ...this.state, descriptionUpdate: true });
  };

  closeDescriptionClick = () => {
    this.setState({ ...this.state, descriptionUpdate: false });
  };

  setColor = () => {
    if (!this.state.initiated) {
      return "primary";
    }
    return this.props.subTask.status === "active" ? "danger" : "success";
  };

  render() {
    const { todoBoard, subTask } = this.props;
    const { initiated, descriptionUpdate, dateUpdate } = this.state;
    const header = subTask.dueDate || "due date";
    const title = subTask.subTask || "+ add new sub task";
    const description = subTask.description || "description of task...";

    const cardColor = this.setColor();
    return (
      <div
        className={`card border-${cardColor} mb-3`}
        style={{ maxWidth: "15rem" }}
      >
        <SubTaskTodoHeader
          condition={initiated && title !== "+ add new sub task"}
          dateUpdate={dateUpdate}
          dueDate={header}
          deleteClick={this.deleteClick}
          headerClick={this.headerClick}
          subTask={subTask}
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
          <SubTodoDescription
            test={
              initiated && title !== "+ add new sub task" && descriptionUpdate
            }
            handleDescriptionClick={this.descriptionClick}
            closeDescriptionClick={this.closeDescriptionClick}
            subTask={subTask}
            title={title}
            description={description}
          />
        </div>
      </div>
    );
  }
}

export default connect(null, { updateSubTask, deleteOneSubTask })(
  SubTodoElement
);
