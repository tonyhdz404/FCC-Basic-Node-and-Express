let express = require("express");
let app = express();
console.log("Hello Worldz");

app.get("/", (req, res) => {
  res.send("Hello Express");
});
module.exports = app;
