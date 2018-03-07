import React, { Component } from "react";
import { connect } from "react-redux";

import { setExternalPageOption } from "../../actions/externalPagesActions";

class ExternalPages extends Component {
  render() {
    const options = [
      "Read Articles",
      "Checkout Books",
      "Serf Youtube",
      "Weather Forcast"
    ];
    const dropdowns = [];
    options.forEach(option =>
      dropdowns.push(
        <button
          key={option}
          className="dropdown-item"
          type="button"
          onClick={() => this.props.setExternalPageOption(option)}
        >
          {option}
        </button>
      )
    );
    return (
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {this.props.link !== "" ? this.props.link : "External Links"}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          {dropdowns}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    link: state.externalState.links
  }),
  { setExternalPageOption }
)(ExternalPages);
