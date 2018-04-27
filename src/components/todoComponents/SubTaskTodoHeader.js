import React from "react";
import { withCondition } from "../HOC";
import SubTaskDate from "./SubTaskDate";
import SubTaskDelete from "./SubTaskDelete";
import SubTaskDateUpdate from "../../containers/todos/SubTaskDateUpdate";

const Composed = props => (
  <div className="card-header">
    {props.dateUpdate ? (
      <SubTaskDateUpdate {...props} />
    ) : (
      <SubTaskDate {...props} />
    )}
    <SubTaskDelete {...props} />
  </div>
);
const SubTaskTodoHeader = withCondition(Composed);

export default SubTaskTodoHeader;
