var express = require("express");
var router = express.Router();

// import user model
var User = require("../model/user");

// passport for login handle
var passport = require("passport");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Chat application" });
});

// logout and clear the session
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("users/login");
  });
});
module.exports = router;
