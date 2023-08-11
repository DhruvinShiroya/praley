var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
// add global config file
var config = require("./config/global");
var mongoose = require("mongoose");

// https://www.passportjs.org/concepts/authentication/sessions/
//import passport and session module
var passport = require("passport");
var session = require("express-session");

// routes for the express application
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var messagesRouter = require("./routes/messages");
var contactRouter = require("./routes/contacts");

var app = express();

// provide wrapper around app
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// import user model
var User = require("./model/user");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//configure session  , specify secrest value for hashing , two option
app.use(
  session({
    secret: process.env.SESSION_SECRET, // encryption / protecting cookie
    resave: false,
    saveUninitialized: false,
  })
);

// configure passport initialization
app.use(passport.initialize());
app.use(passport.session());
// implement local strategy

passport.use(User.createStrategy()); // get it from plm module
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/message", messagesRouter);
app.use("/contacts", contactRouter);
//connect to mongo db
mongoose
  .connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((message) => {
    console.log("connected successfully to the database");
  })
  .catch((err) => {
    console.log("Error while connecting! " + err);
  }); // do something after connecting

// connect

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
