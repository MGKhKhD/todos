import React, { Component } from "react";

const Dropdown = props => {
  const dropdowns = [];
  props.options.forEach(option =>
    dropdowns.push(
      <button
        key={option}
        className={`dropdown-item ${props.itemsClassName}`}
        type="button"
        onClick={() => props.onClick(option)}
      >
        {option}
      </button>
    )
  );
  return (
    <div className="dropdown mr-1 ml-1">
      <button
        className={`btn dropdown-toggle ${props.mainButtonClassName}`}
        type="button"
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.name}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
        {dropdowns}
      </div>
    </div>
  );
};

export default Dropdown;
