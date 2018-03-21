import React from "react";

import { redditSortOptions } from "../types";

const RedditSortOptions = ({ chooseSort }) => {
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

export default RedditSortOptions;
