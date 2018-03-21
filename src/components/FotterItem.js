import React from "react";

const FotterItem = ({ onClick, color, text }) => (
  <span style={{ color: color }} onClick={onClick}>
    {text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase()}
    {"     "}
  </span>
);

export default FotterItem;
