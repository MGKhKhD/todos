import React from "react";
import { connect } from "react-redux";
import { todoModifyRequest, todoModifyCancel } from "../../actions/todoActions";
import { withCondition } from "../../components/HOC";

const ModifyLink = ({ id, modify, todoModifyCancel, todoModifyRequest }) => {
  const click = () => {
    if (modify.status === "requested" && modify.id !== id) {
      todoModifyCancel(modify.id);
      todoModifyRequest(id);
    } else if (modify.status === "requested" && modify.id === id) {
      todoModifyCancel(id);
    } else if (modify.status === "canceled" || modify.status === "") {
      todoModifyRequest(id);
    }
  };
  return (
    <button
      type="button"
      className="btn btn-link float-right"
      onClick={() => click()}
    >
      modify
    </button>
  );
};

export default withCondition(
  connect(state => ({ modify: state.todoState.modify }), {
    todoModifyCancel,
    todoModifyRequest
  })(ModifyLink)
);
