import React, { Component } from "react";
import { connect } from "react-redux";

import Dropdown from "../../components/Dropdown";
import { setNewsCountry } from "../../actions/newsPagesActions";
import { countryOptions } from "../../types";

const FooterNewsCountry = ({ setNewsCountry, country }) => {
  return (
    <Dropdown
      options={countryOptions}
      name={country !== "" ? country : "Country"}
      onClick={option => setNewsCountry(option)}
      mainButtonClassName="btn-sm btn-info"
      itemsClassName="btn-sm"
    />
  );
};

export default connect(
  state => ({
    country: state.externalState.newsSetting.country
  }),
  { setNewsCountry }
)(FooterNewsCountry);
