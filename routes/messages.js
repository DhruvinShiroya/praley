var express = require("express");
var router = express.Router();

// import user model
var User = require("../model/user");

// passport for login handle
var passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("messages", { title: "Send messages", user: req.user });
});

module.exports = router;
