import React, { Component } from "react";

import FooterNewsCountry from "./FooterNewsCountry";
import FooterNewsCategory from "./FooterNewsCategory";
import FooterNewsSearch from "./FooterNewsSearch";

class FooterNewsPage extends Component {
  render() {
    return (
      <div className="row ml-1 mt-1">
        <FooterNewsCountry />
        <FooterNewsCategory />
        <FooterNewsSearch />
      </div>
    );
  }
}

export default FooterNewsPage;
