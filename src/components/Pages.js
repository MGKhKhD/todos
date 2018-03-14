import React, { Component } from "react";

import SelectingPage from "../containers/externalPages/SelectingPage";
import NewsMainPage from "./NewsMainPage";
import BooksMainPage from "./BooksMainPage";
import YoutubeMainPage from "./YoutubeMainPage";
import StockMainPage from "./StockMainPage";
import SocialMediaPage from "./SocialMediaPage";

import { options } from "../types";

export class Pages extends Component {
  render() {
    return (
      <SelectingPage>
        {link => {
          switch (link) {
            case options[0]:
              return <NewsMainPage />;
            case options[1]:
              return <BooksMainPage />;
            case options[3]:
              return <YoutubeMainPage />;
            case options[2]:
              return <StockMainPage />;
            case options[4]:
              return <SocialMediaPage />;
            default:
              return <NewsMainPage />;
          }
        }}
      </SelectingPage>
    );
  }
}

export default Pages;
