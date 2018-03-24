import React from "react";

const Card = props => (
  <div
    className="card mt-1"
    onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}
  >
    <img className="card-img-top" src={props.imageUrl} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title" onMouseUp={props.onMouseUp}>
        {props.title}
      </h5>
      <p className="card-text">{props.description}</p>
      {props.children}
    </div>
  </div>
);

export default Card;
