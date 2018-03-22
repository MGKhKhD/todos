import React, { Component } from "react";
import { connect } from "react-redux";

import RedditSortOptions from "../../components/RedditSortOptions";

import { getNewsTitleOfPosts } from "../../reducers/socialPagesReducers";
import { paginateOptions } from "../../types";
import Dropdown from "../../components/Dropdown";

const RedditPaginateOptions = ({ paginate, choosePaginate }) => (
  <Dropdown
    options={paginateOptions}
    name={`PPP: ${paginate}`}
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
              <ul className="nav">
                <li className="nav-item">
                  Page {this.props.page.current} of {this.props.page.total}
                </li>
                {this.state.redditSort.sort !== "" && (
                  <li className="nav-item dropdown">
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
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm mr-1 ml-1"
                    onClick={() => this.handleRedditClick(title)}
                  >
                    Sort
                  </button>
                </li>
                <li className="nav-item">
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
                </li>
              </ul>
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
    newsTitles: getNewsTitleOfPosts(state.externalState.socialPagesReducers),
    page: state.externalState.socialPagesReducers.page
  };
}

export default connect(mapStateToProps)(DisplayingSocialMediaCards);
