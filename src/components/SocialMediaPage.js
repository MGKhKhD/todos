import React, { Component } from "react";

import DisplayingSocialMediaCards from "../containers/socialMedia/DisplayingSocialMediaCards";
import DisplayingSocialMediaPosts from "../containers/socialMedia/DisplayingSocialMediaPosts";

class SocialMediaPage extends Component {
  constructor(props) {
    super(props);
    this.state = { resetPaginate: false };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.render.redditSort.sort !== this.props.render.redditSort.sort
    ) {
      this.setState({ resetPaginate: true });
    } else {
      this.setState({ resetPaginate: false });
    }
  }

  render() {
    return (
      <DisplayingSocialMediaCards
        render={content => {
          if (content.redditSort !== "") {
            return (
              <DisplayingSocialMediaPosts
                content={content}
                resetPaginate={this.state.resetPaginate}
              />
            );
          } else {
            return null;
          }
        }}
      />
    );
  }
}

export default SocialMediaPage;
