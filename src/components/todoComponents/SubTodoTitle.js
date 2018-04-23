import React, { Component } from "react";

class SubTodoTitle extends Component {
  constructor(props) {
    super(props);
    this.state = { inputTag: false, subTask: this.props.title };

    this.input = null;
    this.setInputRef = element => {
      this.input = element;
    };
    this.setFocus = () => {
      if (this.input) this.input.focus();
    };
  }

  componentDidMount() {
    if (this.state.inputTag) this.setFocus();
  }

  titleClick = () => {
    this.props.handleTitleClick();
    this.setState({ inputTag: true });
  };

  render() {
    if (!this.state.inputTag) {
      return (
        <h5 className="card-title" onClick={this.titleClick}>
          {this.state.subTask}
        </h5>
      );
    } else {
      return (
        <input
          type="text"
          name="subTask"
          value={this.state.subTask}
          ref={this.setInputRef}
          onChange={e =>
            this.setState({ ...this.state, [e.target.name]: e.target.value })
          }
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.setState({ subTask: "" });
            }
          }}
        />
      );
    }
  }
}

export default SubTodoTitle;
