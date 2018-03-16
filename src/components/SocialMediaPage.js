import React from "react";

import DisplayingSocialMediaCards from "../containers/socialMedia/DisplayingSocialMediaCards";
import DisplayingSocialMediaPosts from "../containers/socialMedia/DisplayingSocialMediaPosts";

const SocialMediaPage = () => (
  <DisplayingSocialMediaCards
    render={content => {
      if (content.redditSort !== "") {
        return <DisplayingSocialMediaPosts content={content} />;
      } else {
        return null;
      }
    }}
  />
);

export default SocialMediaPage;
