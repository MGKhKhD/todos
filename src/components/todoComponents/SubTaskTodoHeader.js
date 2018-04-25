import React from "react";
import { withCondition } from "../HOC";
import SubTaskDate from "./SubTaskDate";
import SubTaskDelete from "./SubTaskDelete";

const Composed = props => (
  <div className="card-header">
    <SubTaskDate {...props} />
    <SubTaskDelete {...props} />
  </div>
);
const SubTaskTodoHeader = withCondition(Composed);

export default SubTaskTodoHeader;
