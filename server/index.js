const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("*", cors({ origin: "http://localhost:3000" }));

app.use("/api/goodread", (req, res) => {
  res.json({ message: "success" });
});

app.use("/*", (req, res) => {
  res.send("Hello");
});

const PORT = 4300;
app.listen(PORT, () => console.log("server is running on port", PORT));
