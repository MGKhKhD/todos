import React, { Component } from "react";
import { connect } from "react-redux";

import {
  setCommentModify,
  deleteComment,
  moveComment
} from "../actions/todoActions";
import { getTodos } from "../selectors/todoSelectors";

import FotterItem from "../components/FotterItem";
import BasicComponents from "../components/BasicComponents";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedComment: -1,
      underModification: -1,
      numberComments: this.props.comments.length,
      movingComment: { from: -1, to: -1, status: false }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.commentManagement.status === "requested" &&
      this.props.commentManagement.status === "needModify"
    ) {
      this.setState({ underModification: -1 });
    }
  }

  footerClick(item, id) {
    if (item === "Delete") {
      this.props.deleteComment(id);
    } else if (item === "Modify") {
      this.props.setCommentModify(id);
      this.setState({ underModification: id });
    } else if (item === "Move to") {
      this.setDropDown(id);
    }
  }

  setDropDown = id => {
    if (!this.state.movingComment.status) {
      this.setState({
        movingComment: { status: true, from: id }
      });
    } else if (this.state.movingComment.status) {
      this.setState({
        movingComment: { status: false, from: -1 }
      });
    }
  };

  liClick(id) {
    if (this.state.clickedComment !== id) {
      this.setState({ clickedComment: id });
    } else if (
      this.state.clickedComment === id &&
      !this.state.movingComment.status
    ) {
      this.setState({ clickedComment: -1 });
    }
    if (
      this.state.clickedComment === id &&
      this.state.movingComment.status &&
      this.state.movingComment.from !== id
    ) {
      this.setState({ clickedComment: id });
      this.setState({
        movingComment: { status: false, from: -1 }
      });
    }
  }

  setOptions = (todos, commentManagement) => {
    let destinations = [];
    if (this.state.movingComment.status) {
      destinations = todos.filter(({ id }) => id !== commentManagement.id);
    }
    return destinations;
  };

  dropDownClick = (option, destinations) => {
    const options = destinations.map(dest =>
      dest.todo.substring(0, 20).concat("...")
    );
    const idx = options.indexOf(option);
    this.props.moveComment(this.state.movingComment.from, destinations[idx].id);
  };

  render() {
    const items = ["Delete", "Modify", "Move to"];
    const { comments, todos, commentManagement } = this.props;
    const destinations = this.setOptions(todos, commentManagement);
    const options = destinations.map(dest =>
      dest.todo.substring(0, 20).concat("...")
    );

    const rows = [];
    comments.forEach(comment => {
      const filterItems = [];
      items.forEach(item =>
        filterItems.push(
          <FotterItem
            key={item}
            text={item}
            color="red"
            onClick={() => this.footerClick(item, comment.id)}
          />
        )
      );
      rows.push(
        <li key={comment.id} className="list-group-item">
          <span
            style={{
              color:
                this.state.underModification === comment.id ? "blue" : "black"
            }}
          >
            {this.state.underModification === comment.id
              ? this.props.changingComment
              : comment.comment}
          </span>
          <div className="row">
            <span onClick={() => this.liClick(comment.id)}>
              {this.state.clickedComment === -1 ? ">>>>" : "<<<<"}
            </span>
            {this.state.clickedComment === comment.id &&
              this.props.restricted && (
                <React.Fragment>
                  <br />
                  {filterItems}
                  {this.state.movingComment.status && (
                    <BasicComponents.Dropdown
                      options={options}
                      name="destination"
                      onClick={option =>
                        this.dropDownClick(option, destinations)
                      }
                      mainButtonClassName="btn-secondary"
                    />
                  )}
                </React.Fragment>
              )}
          </div>
        </li>
      );
    });
    return (
      <React.Fragment>
        <ul className="list-group mt-1 mb-1">
          {rows.slice(0, this.state.numberComments)}
        </ul>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    commentManagement: state.todoState.commentManagement,
    todos: getTodos(state)
  };
}

export default connect(mapStateToProps, {
  setCommentModify,
  deleteComment,
  moveComment
})(CommentList);
