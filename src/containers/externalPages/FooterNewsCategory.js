import React from "react";
import { connect } from "react-redux";

import BasicComponents from "../../components/BasicComponents";
import { setNewsCategory } from "../../actions/newsPagesActions";
import { categoryOptions } from "../../types";

const FooterNewsCategory = ({ setNewsCategory, category }) => {
  return (
    <BasicComponents.Dropdown
      options={categoryOptions}
      name={category !== "" ? category : "Category"}
      onClick={option => setNewsCategory(option)}
      mainButtonClassName="btn-sm btn-info"
      itemsClassName="btn-sm"
    />
  );
};

export default connect(
  state => ({
    category: state.externalState.newsSetting.category
  }),
  { setNewsCategory }
)(FooterNewsCategory);
