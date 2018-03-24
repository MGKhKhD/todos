import React from "react";

const Message = ({ message, alert, tag }) =>
  tag ? (
    <div className={`alert alert-${alert} text-center`} role="alert">
      <tag>
        <strong>{message}</strong>
      </tag>
    </div>
  ) : (
    <div className={`alert alert-${alert} text-center`} role="alert">
      <h2>
        <strong>{message}</strong>
      </h2>
    </div>
  );

export default Message;
