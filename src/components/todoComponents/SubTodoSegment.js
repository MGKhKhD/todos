import React from "react";
import { withCondition } from "../HOC";

import SubTodoAddButton from "../../containers/todos/SubTodoAddButton";
import SubTodoList from "../../containers/todos/SubTodoList";

const SubTodoSegment = ({ todoBoard }) => (
  <div>
    <hr />
    <SubTodoAddButton todoBoard={todoBoard} />
    <br />
    <SubTodoList todoBoard={todoBoard} />
  </div>
);

export default withCondition(SubTodoSegment);
