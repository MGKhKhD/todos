import React, { Component } from "react";

let classOptions = ["primary", "secondary", "success", "info"];

class InlineDisplayOfRelatedArticles extends Component {
  constructor(props) {
    super(props);
    this.state = { start: 0, len: 4 };
  }

  render() {
    const rows = [];
    const { articles } = this.props;
    const { start, len } = this.state;

    const showingArtciles = articles.slice(start, start + len);
    showingArtciles.forEach((article, index) =>
      rows.push(
        <div
          className={`card border-${classOptions[index % len]}`}
          key={article.url}
        >
          <div className={`card-body text-${classOptions[index % len]}`}>
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">
              {article.description !== null
                ? article.description.substring(0, 30)
                : article.source.name}
            </p>
            <p className="card-text">
              <small className="text-muted">{article.author}</small>
            </p>
          </div>
        </div>
      )
    );

    return (
      <div className="row">
        <div className="card-group">{rows}</div>
        {this.state.start <= articles.length / len * (len - 1) && (
          <button
            className="btn btn-dark btn-sm mr-1 ml-1 mt-1 mb-1"
            onClick={() =>
              this.setState(prevState => ({
                start:
                  prevState.start + prevState.len < articles.length + 1
                    ? prevState.start + prevState.len
                    : 0
              }))
            }
          >
            Load more
          </button>
        )}
        {this.state.start !== 0 && (
          <button
            className="btn btn-danger btn-sm mr-1 ml-1 mt-1 mb-1"
            onClick={() =>
              this.setState(prevState => ({
                start:
                  prevState.start - prevState.len > -1
                    ? prevState.start - prevState.len
                    : 0
              }))
            }
          >
            Go Back
          </button>
        )}
      </div>
    );
  }
}

export default InlineDisplayOfRelatedArticles;
