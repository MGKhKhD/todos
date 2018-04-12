import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getIdOfActiveSearch,
  getArticles
} from "../../reducers/externalPagesReducers";
import {
  getNewsTitleOfPosts,
  checkIfARequestMade
} from "../../reducers/socialPagesReducers";

import ExtraOptionsForArticle from "../../components/ExtraOptionsForArticle";
import DisplayingRelatedArticles from "./DisplayingRelatedArticles";
import BasicComponents from "../../components/BasicComponents";

class DiplayingNewsArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      showingMessage: true,
      showingFooter: ""
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.articles.length === 0) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.messageTime = setInterval(
      () => this.setState({ showingMessage: false }),
      50000
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isTextGrabbed) {
      clearInterval(this.messageTime);
      this.setState({ showingMessage: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.messageTime);
  }

  selectText = title => {
    let text = "";
    if (window.getSelection) {
      text = window.getSelection();
    } else if (document.getSelection) {
      text = document.getSelection();
    } else if (document.selection) {
      text = document.selection.createRange().text;
    }

    this.setState({ text, title });
  };

  handleMouseOver = title => {
    const { newsTitles } = this.props;
    if (newsTitles.length > 0 && newsTitles.indexOf(title) > -1) {
      this.setState({ showingFooter: title });
    } else {
      return;
    }
  };

  handleMouseLeave = title => {
    const { newsTitles } = this.props;
    if (
      newsTitles.length > 0 &&
      newsTitles.indexOf(title) > -1 &&
      this.state.showingFooter === title
    ) {
      this.setState({ showingFooter: "" });
    } else {
      return;
    }
  };

  render() {
    const { articles, clickedArticleForRelatedArticles } = this.props;

    const rows = [];
    articles.forEach(article => {
      if (article.type === "main") {
        const isActiveForRelatedArticle =
          clickedArticleForRelatedArticles.indexOf(article.title) > -1;
        rows.push(
          <BasicComponents.Card
            key={article.url}
            imageUrl={article.urlToImage}
            title={article.title}
            description={article.description}
            onMouseOver={() => this.handleMouseOver(article.title)}
            onMouseLeave={() => this.handleMouseLeave(article.title)}
            onMouseUp={() => this.selectText(article.title)}
          >
            <ExtraOptionsForArticle article={article} extraInfo={this.state} />
            {isActiveForRelatedArticle && (
              <DisplayingRelatedArticles article={article} />
            )}
            {this.state.showingFooter === article.title && (
              <div className="card-footer bg-transparent border-success">
                <BasicComponents.Message
                  message="Realted posts are added to Social Media Page"
                  alert="success"
                  tag="p"
                />
              </div>
            )}
          </BasicComponents.Card>
        );
      } else if (article.type === "added") {
        rows.push(
          <BasicComponents.Card
            key={article.url}
            imageUrl={article.urlToImage}
            title={article.title}
            description={article.description}
          />
        );
      }
    });

    if (articles.length === 0) {
      return null;
    }

    return (
      <div className="ml-1 mr-1 mt-1 mb-1">
        {this.state.showingMessage && (
          <BasicComponents.Message
            message="Grab text from title for further queries."
            alert="danger"
          />
        )}
        {rows}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const id = getIdOfActiveSearch(state.externalState);
  const success =
    id > -1 ? state.externalState.queries[id].articles.succeed : false;
  return {
    articles: success ? getArticles(state.externalState, id) : [],
    clickedArticleForRelatedArticles:
      state.externalState.clickedArticleForExtraOptions.relatedArticles,
    newsTitles: getNewsTitleOfPosts(state.externalState.socialPagesReducers),
    isTextGrabbed: checkIfARequestMade(state.externalState.socialPagesReducers)
  };
}

export default connect(mapStateToProps)(DiplayingNewsArticles);
