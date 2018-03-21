import React from "react";

import ExternalPagesHeader from "../containers/externalPages/ExternalPagesHeader";
import Pages from "./Pages";

const DataHeader = ({ onClick }) => (
  <div>
    <div className="card-header">
      <div className="row">
        <button className="btn btn-primary mr-1 ml-1" onClick={onClick}>
          Back to Todos
        </button>
        <ExternalPagesHeader />
      </div>
    </div>
    <div className="card-block">
      <Pages />
    </div>
  </div>
);

export default DataHeader;
