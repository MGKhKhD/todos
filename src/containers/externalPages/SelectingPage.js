import React, { Component } from "react";
import { connect } from "react-redux";

class SelectingPage extends Component {
  render() {
    return <div>{this.props.children(this.props.link)}</div>;
  }
}

export default connect(state => ({
  link: state.externalState.links
}))(SelectingPage);
