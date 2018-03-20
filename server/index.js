const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { parseString } = require("xml2js");

const { GoodReadsKey } = require("./config");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("*", cors({ origin: "http://localhost:3000" }));

app.use("/api/goodread", (req, res) => {
  axios
    .get(
      `https://www.goodreads.com/search/index.xml?key=${GoodReadsKey}&q=${
        req.query.q
      }`
    )
    .then(response =>
      parseString(response.data, (err, goodreadData) =>
        res.json({
          books: goodreadData.GoodreadsResponse.search[0].results[0].work.map(
            work => ({
              id: work.best_book[0].id[0]._,
              title: work.best_book[0].title[0],
              author: {
                name: work.best_book[0].author[0].name[0],
                id: work.best_book[0].author[0].id[0]._
              },
              cover: work.best_book[0].image_url[0],
              smallCover: work.best_book[0].small_image_url[0]
            })
          )
        })
      )
    )
    .catch(err => res.status(500).json({ error: err.data }));
});

app.use("/*", (req, res) => {
  res.send("Hello");
});

const PORT = 4200;
app.listen(PORT, () => console.log("server is running on port", PORT));
