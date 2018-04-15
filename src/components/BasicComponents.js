import React from "react";

const BasicComponents = {
  Repeat: function Repeat({ numItems, children }) {
    let rows = [];
    for (let idx = 0; idx < numItems; idx++) {
      rows.push(children(idx));
    }
    return <React.Fragment>{rows}</React.Fragment>;
  },

  List: function List({ numItems, children }) {
    let rows = [];
    for (let idx = 0; idx < numItems; idx++) {
      rows.push(children(idx));
    }
    return <ul className="list-group mt-1 mb-1">{rows}</ul>;
  },

  ListGroup: function ListGroup(props) {
    return (
      <BasicComponents.List numItems={props.items.length}>
        {idx => (
          <li className="list-group-item" key={idx}>
            {props.children(idx, props)}
          </li>
        )}
      </BasicComponents.List>
    );
  },

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

  DropdownElements: function DropdownElements(props) {
    return (
      <BasicComponents.Repeat numItems={props.options.length}>
        {idx => (
          <button
            key={props.options[idx]}
            className={`dropdown-item ${props.itemsClassName}`}
            type="button"
            onClick={() => props.onClick(props.options[idx])}
          >
            {props.options[idx]}
          </button>
        )}
      </BasicComponents.Repeat>
    );
  },

  Dropdown: function Dropdown(props) {
    const { mainButtonClassName, name, ...rest } = props;
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
          <BasicComponents.DropdownElements {...rest} />
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
