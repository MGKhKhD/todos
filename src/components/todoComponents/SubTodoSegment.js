import React from "react";
import { withCondition } from "../HOC";

const SubTodoSegment = ({ todoBoard }) => (
  <div>
    <button className="btn btn-outline-dark btn-lg center">
      + Add Sub Task
    </button>
  </div>
);

export default withCondition(SubTodoSegment);
