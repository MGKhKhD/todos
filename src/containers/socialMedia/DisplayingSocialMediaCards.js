import React, { Component } from "react";
import { connect } from "react-redux";

import { redditSortOptions } from "../../types";

import { getNewsTitleOfPosts } from "../../reducers/socialPagesReducers";

const RedditOptions = ({ chooseSort }) => {
  const classes = ["primary", "secondary", "danger", "success"];
  let elm = [];
  redditSortOptions.forEach((sort, index) =>
    elm.push(
      <span
        className={`badge badge-pill badge-${classes[index]}`}
        key={index}
        onClick={() => chooseSort(sort)}
      >
        {sort}
      </span>
    )
  );

  return elm;
};

class DisplayingSocialMediaCards extends Component {
  constructor(props) {
    super(props);
    this.state = { clickedReddits: [], redditSort: { sort: "", title: "" } };
  }

  handleRedditClick = title => {
    const { clickedReddits } = this.state;
    if (clickedReddits.indexOf(title) > -1) {
      let index = clickedReddits.indexOf(title);
      this.setState({
        clickedReddits: [
          ...this.state.clickedReddits.slice(0, index),
          ...this.state.clickedReddits.slice(index + 1)
        ]
      });
    } else {
      this.setState({
        clickedReddits: [...this.state.clickedReddits, title]
      });
    }
  };

  render() {
    const { newsTitles } = this.props;
    const rows = [];
    const { clickedReddits } = this.state;

    newsTitles.forEach(title =>
      rows.push(
        <div className="card w-5" key={title}>
          <div className="card-body">
            <p className="card-text">{title}</p>
            <button
              className="btn btn-danger btn-sm mr-1 ml-1"
              onClick={() => this.handleRedditClick(title)}
            >
              Reddit
            </button>
            {clickedReddits.length > 0 &&
              clickedReddits.indexOf(title) > -1 && (
                <RedditOptions
                  chooseSort={sort =>
                    this.setState({ redditSort: { sort: sort, title: title } })
                  }
                />
              )}
          </div>
        </div>
      )
    );
    return (
      <div>
        {rows}
        {this.props.render(this.state.redditSort)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newsTitles: getNewsTitleOfPosts(state.externalState.socialPagesReducers)
  };
}

export default connect(mapStateToProps)(DisplayingSocialMediaCards);
