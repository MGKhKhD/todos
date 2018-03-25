import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "../../actions/booksActions";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [], query: "" };
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleKeyPress = e => {
    if (this.state.query === "") return;

    if (e.charCode === 32) {
      fetch(`http://localhost:4200/api/goodread?q=${this.state.query}`)
        .then(response => response.json())
        .then(books => {
          let options = [];
          books.books.forEach(book =>
            options.push({
              title: book.title,
              author: book.author,
              smallImage: book.smallCover
            })
          );
          this.setState({ options });
        });
    }

    if (e.charCode === 13) {
      this.props.fetchBooks(this.state.query);
      e.target.value = "";
    }
  };

  render() {
    const rows = [];
    const { options } = this.state;
    options.forEach(option =>
      rows.push(
        <li key={option.smallImage}>
          <p>
            Title: {option.title}
            {",  Author: "}
            {option.author.name}
          </p>
          <img src={option.smallImage} />
        </li>
      )
    );
    return (
      <div className="row">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <ul>{rows}</ul>
      </div>
    );
  }
}

export default connect(null, { fetchBooks })(SearchBooks);
