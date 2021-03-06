const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");

const book = require("./routes/book");
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/book", book);

mongoose
  .connect("mongodb://localhost/mern-crud", {
    useMongoClient: true,
    promiseLibrary: require("bluebird")
  })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));
//catch 404 and forward to error handling

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
