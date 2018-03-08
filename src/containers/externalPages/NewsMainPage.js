import React, { Component } from "react";
import keys from "../../configs";

import FooterNewsPage from "./FooterNewsPage";

class NewsMainPage extends Component {
  componentWillMount() {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${
      keys.GoogleNewsKey
    }
       `);
  }

  render() {
    return (
      <div>
        <FooterNewsPage />
        News
      </div>
    );
  }
}

export default NewsMainPage;
