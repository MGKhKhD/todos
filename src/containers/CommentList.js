import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setCommentModify,
  deleteComment,
  moveComment
} from "../actions/todoActions";
import { getTodos } from "../selectors/todoSelectors";

import FooterComment from "../components/FooterComment";
import BasicComponents from "../components/BasicComponents";

const LocalSpan = ({ comment, underModification, changingComment }) => (
  <span
    style={{
      color: underModification === comment.id ? "blue" : "black"
    }}
  >
    {underModification === comment.id ? changingComment : comment.comment}
  </span>
);

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedComment: -1,
      underModification: -1,
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

  liClick(id) {
    const { clickedComment, movingComment } = this.state;
    if (clickedComment !== id) {
      this.setState({ clickedComment: id });
    } else if (clickedComment === id) {
      this.setState({ clickedComment: -1 });
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
    this.props.dispatch(
      moveComment(this.state.movingComment.from, destinations[idx].id)
    );
  };

  handleSetCommentState = obj => {
    this.setState({
      ...this.state,
      movingComment: {
        ...this.state.movingComment,
        status: obj.status,
        from: obj.from
      }
    });
  };

  handleSetUnderModification = id => {
    this.setState({ ...this.state, underModification: id });
  };

  render() {
    const {
      comments,
      todos,
      commentManagement,
      changingComment,
      dispatch
    } = this.props;

    const boundedActions = bindActionCreators(
      { deleteComment, setCommentModify },
      dispatch
    );

    const destinations = this.setOptions(todos, commentManagement);
    const options = destinations.map(dest =>
      dest.todo.substring(0, 20).concat("...")
    );

    const rows = [];
    comments.forEach(comment => {
      rows.push(
        <li key={comment.id} className="list-group-item">
          <LocalSpan
            changingcomment={changingComment}
            comment={comment}
            underModification={this.state.underModification}
          />
          <div className="row">
            <span onClick={() => this.liClick(comment.id)}>
              {this.state.clickedComment === comment.id ? ">>>>" : "<<<<"}
            </span>
            {this.state.clickedComment === comment.id &&
              this.props.restricted && (
                <React.Fragment>
                  <br />
                  <FooterComment
                    {...boundedActions}
                    id={comment.id}
                    setCommentState={this.handleSetCommentState}
                    movingComment={this.state.movingComment}
                    setUnderModification={this.handleSetUnderModification}
                  />
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
        <ul className="list-group mt-1 mb-1">{rows}</ul>
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

export default connect(mapStateToProps)(CommentList);
