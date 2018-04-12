import React from "react";
import { connect } from "react-redux";

import BasicComponents from "../../components/BasicComponents";
import { setExternalPageOption } from "../../actions/externalPagesActions";
import { options } from "../../types";

const ExternalPagesHeader = ({ setExternalPageOption, link }) => {
  return (
    <BasicComponents.Dropdown
      options={options}
      name={link !== "" ? link : "External Links"}
      onClick={option => setExternalPageOption(option)}
      mainButtonClassName="btn-secondary"
    />
  );
};

export default connect(
  state => ({
    link: state.externalState.links
  }),
  { setExternalPageOption }
)(ExternalPagesHeader);
