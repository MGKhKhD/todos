import React, { Component } from "react";
import { countryOptions, categoryOptions } from "../../types";

import Dropdown from "../../components/Dropdown";
import FooterNewsCountry from "./FooterNewsCountry";
import FooterNewsCategory from "./FooterNewsCategory";

class FooterNewsSearch extends Component {
  render() {
    return <input type="text" placeholder="search for keyword..." />;
  }
}

class FooterNewsPage extends Component {
  render() {
    return (
      <div className="row ml-1 mt-1">
        <FooterNewsCountry />
        <FooterNewsCategory />
        <FooterNewsSearch />
        <button className="btn btn-danger btn-sm ml-1 mr-1">Send</button>
      </div>
    );
  }
}

export default FooterNewsPage;
