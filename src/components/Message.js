import React from "react";

const Message = ({ message, alert, tag, onClick }) =>
  tag === "h4" ? (
    <div className={`alert alert-${alert} text-center`} role="alert">
      <h4>
        <strong>{message}</strong>
        <a
          className="float-right"
          href=""
          onClick={e => {
            e.preventDefault();
            onClick();
          }}
        >
          X
        </a>
      </h4>
    </div>
  ) : (
    <div className={`alert alert-${alert} text-center`} role="alert">
      <h2>
        <strong>{message}</strong>
      </h2>
    </div>
  );

export default Message;
