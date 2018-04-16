import React from "react";
import { withCondition } from "../../components/HOC";

const TodoBlockingButtons = ({ onBlockingClick, onBlockedByClick, id }) => (
  <React.Fragment>
    <button
      type="button"
      className="btn btn-link float-right"
      onClick={() => onBlockingClick(id)}
    >
      Blocks
    </button>
    <button
      type="button"
      className="btn btn-link float-right"
      onClick={() => onBlockedByClick(id)}
    >
      Blocked-by
    </button>
  </React.Fragment>
);

export default withCondition(TodoBlockingButtons);
