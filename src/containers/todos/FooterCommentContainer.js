import React from "react";
import { connect } from "react-redux";

import { setCommentModify, deleteComment } from "../../actions/todoActions";

import FooterComment from "../../components/todoComponents/FooterComment";

const FooterCommentContainer = props => {
  const footerClick = (item, id) => {
    if (item === "Delete") {
      props.deleteComment(id);
    } else if (item === "Modify") {
      props.setCommentModify(id);
      props.setUnderModification(id);
    } else if (item === "Move to") {
      setDropDown(id);
    }
  };

  const setDropDown = id => {
    if (!props.movingComment.status) {
      props.setCommentState({ status: true, from: id });
    } else if (props.movingComment.status) {
      props.setCommentState({ status: false, from: -1 });
    }
  };

  return <FooterComment onClick={item => footerClick(item, props.id)} />;
};

export default connect(null, { deleteComment, setCommentModify })(
  FooterCommentContainer
);
