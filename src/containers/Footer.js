import React, { Component } from "react";
import { filters_constants } from "../types";
import { connect } from "react-redux";
import { setFilter } from "../actions/todoActions";
import { getTotalTodosByFilter } from "../reducers/todoReducers";

class Footer extends Component {
  render() {
    return (
      <p>
        <span
          style={{ color: "black" }}
          onClick={() => this.props.setFilter(filters_constants.ALL)}
        >
          All{" "}
        </span>
        {", "}
        <span
          style={{ color: "green" }}
          onClick={() => this.props.setFilter(filters_constants.COMPLETED)}
        >
          Completed{" "}
        </span>{" "}
        {", "}
        <span
          style={{ color: "red" }}
          onClick={() => this.props.setFilter(filters_constants.ACTIVE)}
        >
          Active
        </span>
        <span className="float-right mr-4">{this.props.totalTodos}</span>
      </p>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalTodos: getTotalTodosByFilter(state.todoState)
  };
}

export default connect(mapStateToProps, { setFilter })(Footer);
