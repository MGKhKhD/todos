import React, { Component } from "react";
import FotterItem from "./FotterItem";
import BasicComponents from "./BasicComponents";

import { comment_items } from "../types";

class FooterComment extends Component {
  footerClick = (item, id) => {
    if (item === "Delete") {
      this.props.deleteComment(id);
    } else if (item === "Modify") {
      this.props.setCommentModify(id);
      this.props.setUnderModification(id);
    } else if (item === "Move to") {
      this.setDropDown(id);
    }
  };

  setDropDown = id => {
    if (!this.props.movingComment.status) {
      this.props.setCommentState({ status: true, from: id });
    } else if (this.props.movingComment.status) {
      this.props.setCommentState({ status: false, from: -1 });
    }
  };

  render() {
    return (
      <BasicComponents.Repeat numItems={comment_items.length}>
        {idx => (
          <FotterItem
            key={idx}
            text={comment_items[idx]}
            color="red"
            onClick={() => this.footerClick(comment_items[idx], this.props.id)}
          />
        )}
      </BasicComponents.Repeat>
    );
  }
}

export default FooterComment;
