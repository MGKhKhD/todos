import React from "react";
import { connect } from "react-redux";
import { todoModifyRequest, todoModifyCancel } from "../actions/index";

const ModifyLink = ({ id, modify, todoModifyCancel, todoModifyRequest }) => {
  return (
    <button
      type="button"
      className="btn btn-link float-right"
      onClick={() => {
        if (modify.status === "requested" && modify.id !== id) {
          todoModifyCancel(modify.id);
          todoModifyRequest(id);
        } else if (modify.status === "requested" && modify.id === id) {
          todoModifyCancel(id);
        } else if (modify.status === "canceled" || modify.status === "") {
          todoModifyRequest(id);
        }
      }}
    >
      modify
    </button>
  );
};

export default connect(state => ({ modify: state.modify }), {
  todoModifyCancel,
  todoModifyRequest
})(ModifyLink);
