var express = require("express");
var router = express.Router();

// import user model
var User = require("../model/user");
var Contact = require("../model/contact");
// passport for login handle
var passport = require("passport");
const user = require("../model/user");
const message = require("../model/message");
const async = require("hbs/lib/async");

// protect the routes so no one can have authorization except user
function isAuthorized(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

/* GET home page. */
router.get("/", isAuthorized, async function (req, res, next) {
  const doc = await Contact.find({
    userId: req.user.username,
  });
  if (doc) {
    console.log(doc);
    res.render("messages", {
      title: "Send messages",
      user: req.user,
      dataset: doc,
    });
  } else {
    res.render("messages", {
      title: "Send messages",
      user: req.user,
    });
  }
});

//Post for /message
// find if the contact exist in the database
router.post("/", isAuthorized, (req, res, next) => {
  console.log(req.body.searchError);
  let searchError = "check the username again";
  let searchParam = req.body.username;

  if (!searchParam) {
    res.render("messages");
  }

  User.findOne(
    {
      username: searchParam,
    },
    { username: 1, password: 1 }
  ).then((doc) => {
    if (!doc) {
      console.log("can not find the username you are looking for");
      res.render("messages", { searchError: searchError });
    } else {
      console.log("we have found the user");
      console.log(doc.username);
      res.render("results", {
        title: "Search Results",
        results: doc,
        user: req.user,
      });
    }
  });

  // res.render("/results", { title: "Search Results", results: userList });
});

module.exports = router;
