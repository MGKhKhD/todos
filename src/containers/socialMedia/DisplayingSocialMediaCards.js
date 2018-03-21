import React, { Component } from "react";
import { connect } from "react-redux";

import RedditSortOptions from "../../components/RedditSortOptions";

import { getNewsTitleOfPosts } from "../../reducers/socialPagesReducers";
import { paginateOptions } from "../../types";
import Dropdown from "../../components/Dropdown";

const RedditPaginateOptions = ({ paginate, choosePaginate }) => (
  <Dropdown
    options={paginateOptions}
    name={paginate}
    onClick={option => choosePaginate(option)}
    mainButtonClassName="btn-primary"
  />
);

class DisplayingSocialMediaCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedReddits: [],
      redditSort: { sort: "", title: "", postsPerPage: 5 }
    };
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
            <div className="card-footer bg-transparent border-success">
              <p>
                {this.state.redditSort.sort !== "" && (
                  <span>
                    Posts per page:{" "}
                    <RedditPaginateOptions
                      paginate={this.state.redditSort.postsPerPage}
                      choosePaginate={paginate =>
                        this.setState({
                          redditSort: {
                            ...this.state.redditSort,
                            postsPerPage: paginate
                          }
                        })
                      }
                    />
                  </span>
                )}
                <span>
                  <button
                    className="btn btn-danger btn-sm mr-1 ml-1"
                    onClick={() => this.handleRedditClick(title)}
                  >
                    Sort
                  </button>
                </span>
                <span>
                  {clickedReddits.length > 0 &&
                    clickedReddits.indexOf(title) > -1 && (
                      <RedditSortOptions
                        chooseSort={sort =>
                          this.setState({
                            redditSort: {
                              ...this.state.redditSort,
                              sort: sort,
                              title: title
                            }
                          })
                        }
                      />
                    )}
                </span>
              </p>
            </div>
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
