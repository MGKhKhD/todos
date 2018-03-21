import React, { Component } from "react";
import { filters_constants } from "../types";
import { connect } from "react-redux";
import { setFilter } from "../actions/todoActions";
import { getTotalTodosByFilter } from "../reducers/todoReducers";

import FotterItem from "../components/FotterItem";

const colors = {
  ALL: "black",
  ACTIVE: "red",
  COMPLETED: "green"
};

class Footer extends Component {
  render() {
    const items = [];

    for (let item in filters_constants) {
      items.push(
        <FotterItem
          key={colors[item]}
          onClick={() => this.props.setFilter(filters_constants[item])}
          color={colors[item]}
          text={filters_constants[item]}
        />
      );
    }

    return (
      <p>
        {items}
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
