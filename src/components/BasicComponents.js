import React from "react";

const BasicComponents = {
  Card: function Card(props) {
    return (
      <div
        className="card mt-1"
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
      >
        <img className="card-img-top" src={props.imageUrl} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title" onMouseUp={props.onMouseUp}>
            {props.title}
          </h5>
          <p className="card-text">{props.description}</p>
          {props.children}
        </div>
      </div>
    );
  },

  Dropdown: function Dropdown(props) {
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
  },

  Message: function Message({ message, alert, tag, children }) {
    const Tag = tag || "h2";
    return (
      <div className={`alert alert-${alert} text-center`} role="alert">
        <Tag>
          <strong>{message}</strong>
          {children}
        </Tag>
      </div>
    );
  }
};

export default BasicComponents;
