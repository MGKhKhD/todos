import React from "react";
import { connect } from "react-redux";

import BasicComponents from "../../components/BasicComponents";
import { setNewsCountry } from "../../actions/newsPagesActions";
import { countryOptions } from "../../types";

const FooterNewsCountry = ({ setNewsCountry, country }) => {
  return (
    <BasicComponents.Dropdown
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
