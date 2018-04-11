import React, { Component } from "react";
import { filters_constants } from "../types";

import ExternalPagesHeader from "../containers/externalPages/ExternalPagesHeader";
import Message from "./Message";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: "" };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.inputText = null;
    this.setInputRef = element => {
      this.inputText = element;
    };
    this.setFocus = () => {
      if (this.inputText) this.inputText.focus();
    };
  }

  componentDidMount() {
    this.setFocus();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commentStatus !== "" && nextProps.commentStatus === "") {
      this.setFocus();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let todo = this.state.todo.trim();
    this.props.addTodo(todo, "todosPage");
    e.target.value = "";
    this.setState({ todo: "" });
  }

  handleChange = e => {
    if (this.props.commentStatus !== "") {
      this.props.cancellCommentRequest();
    }
    if (this.props.filter === filters_constants.ARCHIVES) {
      this.props.setFilter(filters_constants.ALL);
    }
    this.setState({ ...this.state, [e.target.name]: e.target.value });
    if (this.props.errorMessage !== "") {
      this.props.cancelErrorTodo();
    }
  };

  handleClick = e => {
    if (this.props.errorMessage !== "") {
      this.props.cancelErrorTodo();
      this.props.setFilter(filters_constants.ALL);
    }
  };

  render() {
    return (
      <div>
        {this.props.errorMessage !== "" && (
          <Message
            alert="danger"
            message={this.props.errorMessage}
            tag="h4"
            onClick={this.handleClick}
          />
        )}
        <form className="form-inline " onSubmit={this.handleSubmit}>
          <input
            ref={this.setInputRef}
            className="form-control mb-2 mr-sm-2 mb-sm-0"
            type="text"
            placeholder="Add todo"
            name="todo"
            value={this.state.todo}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary mr-1">
            Add
          </button>
          <ExternalPagesHeader />
        </form>
      </div>
    );
  }
}

export default AddTodo;
