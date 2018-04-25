import React from "react";
import { mapProps, compose, withHandlers } from "recompose";
import _ from "lodash";

const enhance = compose(
  mapProps(props =>
    _.pick(props, ["handleTitleClick", "title", "toggleSubTask"])
  ),
  withHandlers({
    titleClick: props => () => {
      if (props.title === "+ add new sub task") {
        props.handleTitleClick();
      } else {
        props.toggleSubTask();
      }
    }
  })
);

const SubTodoTitleH = enhance(props => (
  <h5 className="card-title" onClick={props.titleClick}>
    {props.title}
  </h5>
));

export default SubTodoTitleH;
