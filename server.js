// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp", (req, res) => {
  const date = new Date();

  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const dateString = req.params.date_string;

  // Convert to Date object (if not parsed, returns "invalid date")
  // unix timestamp urls may become integers! deal with that
  const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);
  console.log(date);

  if (date.toString() === "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString(),
    });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 5500, function () {
  console.log("Your app is listening on port: " + listener.address().port);
});
