import React, { Component } from "react";
import { connect } from "react-redux";

import { getFailedReason } from "../../reducers/externalPagesReducers";
import { cancelNewsFeed, fetchArticles } from "../../actions/newsPagesActions";

class NewsSearchAlarms extends Component {
  render() {
    if (this.props.reason === "relax") {
      return (
        <div className="alert alert-warning mt-1 ml-1 mr-1" role="alert">
          <p>
            Unsuccessful Search! Try one of these relaxed options or cancel the
            query
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              this.props.fetchArticles({
                country: this.props.country,
                category: this.props.category,
                reason: this.props.reason
              });
            }}
          >
            Country: <strong>{this.props.country}</strong>
            {"          "}Category: <strong>{this.props.category}</strong>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-lg btn-block"
            onClick={() =>
              this.props.fetchArticles({
                query: this.props.query,
                reason: this.props.reason
              })
            }
          >
            Keywaord: <strong>{this.props.query}</strong>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg btn-block"
            onClick={() => this.props.cancelNewsFeed()}
          >
            Cancel Search
          </button>
        </div>
      );
    }
    if (this.props.reason === "failur") {
      return (
        <div className="alert alert-danger mt-1 ml-1 mr-1" role="alert">
          <p>Unsuccessful query!</p>
        </div>
      );
    }
    if (this.props.reason === "") {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    reason: getFailedReason(state.externalState),
    country: state.externalState.newsSetting.country,
    category: state.externalState.newsSetting.category,
    query: state.externalState.newsSetting.query,
    readyForRequest: state.externalState.newsSetting.readyForRequest
  };
}

export default connect(mapStateToProps, { cancelNewsFeed, fetchArticles })(
  NewsSearchAlarms
);
