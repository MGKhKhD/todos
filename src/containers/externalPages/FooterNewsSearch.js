import React, { Component } from "react";
import { connect } from "react-redux";

import { requestNewsFeed, fetchArticles } from "../../actions/newsPagesActions";

class FooterNewsSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.readyForRequest) {
      const data = {
        country: nextProps.country,
        category: nextProps.category,
        query: nextProps.query
      };
      this.props.fetchArticles(data);
    }
    this.setState({ query: "" });
  }

  submit(e) {
    e.preventDefault();
    const data = {
      country: this.props.country,
      category: this.props.category,
      query: this.state.query.trim()
    };
    this.props.requestNewsFeed(data);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.submit.bind(this)}>
        <input
          type="text"
          placeholder="search for keyword..."
          name="query"
          value={this.state.query}
          onChange={e =>
            this.setState({ ...this.state, [e.target.name]: e.target.value })
          }
        />
        <button
          type="submit"
          className="btn btn-danger btn-sm ml-1 mr-1"
          disabled={
            this.props.country !== "" &&
            this.props.category !== "" &&
            this.state.query !== ""
              ? false
              : true
          }
        >
          Send
        </button>
      </form>
    );
  }
}

function mapStateToProps(initState) {
  const state = initState.externalState.newsSetting;
  const { country, category, readyForRequest, query } = state;

  return {
    country,
    category,
    readyForRequest,
    query
  };
}

export default connect(mapStateToProps, { requestNewsFeed, fetchArticles })(
  FooterNewsSearch
);
