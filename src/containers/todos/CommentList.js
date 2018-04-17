import React, { Component } from "react";
import { connect } from "react-redux";

import { moveComment } from "../../actions/todoActions";
import { getTodos } from "../../selectors/todoSelectors";
import { withCondition } from "../../components/HOC";

import FooterCommentContainer from "./FooterCommentContainer";
import BasicComponents from "../../components/BasicComponents";
import FilteredCommentDropdown from "../../components/todoComponents/FilteredCommentDropdown";

const LocalSpan = ({ comment, underModification, changingComment }) => (
  <span
    style={{
      color: underModification === comment.id ? "blue" : "black"
    }}
  >
    {underModification === comment.id ? changingComment : comment.comment}
  </span>
);

const ConditionalFragment = withCondition(React.Fragment);

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
    const { clickedComment } = this.state;
    if (clickedComment !== id) {
      this.setState({ clickedComment: id });
    } else if (clickedComment === id) {
      this.setState({ clickedComment: -1 });
    }
  }

  setOptions = (todos, commentManagement) => {
    return todos.filter(({ id }) => id !== commentManagement.id);
  };

  dropDownClick = (option, destinations) => {
    const options = destinations.map(dest =>
      dest.todo.substring(0, 20).concat("...")
    );
    const idx = options.indexOf(option);
    this.props.moveComment(this.state.movingComment.from, destinations[idx].id);
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
    const { comments, commentManagement, changingComment, todos } = this.props;

    const destinations = this.setOptions(todos, commentManagement);

    return (
      <BasicComponents.ListGroup items={comments}>
        {(idx, { items }) => {
          const comment = items[idx];
          return (
            <React.Fragment>
              <LocalSpan
                changingcomment={changingComment}
                comment={comment}
                underModification={this.state.underModification}
              />
              <div className="row">
                <span onClick={() => this.liClick(comment.id)}>
                  {this.state.clickedComment === comment.id ? ">>>>" : "<<<<"}
                </span>
                <ConditionalFragment
                  condition={
                    this.state.clickedComment === comment.id &&
                    this.props.restricted
                  }
                >
                  <br />
                  <FooterCommentContainer
                    id={comment.id}
                    setCommentState={this.handleSetCommentState}
                    movingComment={this.state.movingComment}
                    setUnderModification={this.handleSetUnderModification}
                  />
                  <FilteredCommentDropdown
                    condition={this.state.movingComment.status}
                    filteredCondition={commentManagement.id}
                    items={todos}
                    name="destination"
                    onClick={option => this.dropDownClick(option, destinations)}
                    mainButtonClassName="btn-secondary"
                  />
                </ConditionalFragment>
              </div>
            </React.Fragment>
          );
        }}
      </BasicComponents.ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    commentManagement: state.todoState.commentManagement,
    todos: getTodos(state)
  };
}

export default connect(mapStateToProps, { moveComment })(CommentList);
