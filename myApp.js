require("dotenv").config();
let express = require("express");
let app = express();

//* MiddleWare
function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.use(logger);

//* Routes

app.use("/public", express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/json", (req, res) => {
  console.log("Process", process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "HELLO JSON",
    });
  } else {
    res.json({
      message: "Hello json",
    });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({
    echo: word,
  });
});

function getHandler(req, res) {
  const { first: firstname, last: lastname } = req.query;
  res.json({
    name: `${firstname} ${lastname}`,
  });
}
function postHandler(req, res) {
  res.json({
    status: "success",
  });
}

app.route("/name").get(getHandler).post(postHandler);

module.exports = app;
