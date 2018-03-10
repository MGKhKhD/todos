import React from "react";
import { connect } from "react-redux";
import { getIdOfActiveSearch } from "../../reducers/externalPagesReducers";

const LoadingNewsPage = ({ requested }) => {
  if (!requested) {
    return null;
  }

  return (
    <div className="alert alert-dark mt-1 ml-1 mr-1" role="alert">
      <h3>Loding....</h3>
    </div>
  );
};

function mapStateToProps(state) {
  const id = getIdOfActiveSearch(state.externalState);
  console.log(id);
  return {
    requested:
      id > -1 ? state.externalState.queries[id].articles.requested : false
  };
}

export default connect(mapStateToProps)(LoadingNewsPage);
