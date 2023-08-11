var express = require("express");
var router = express.Router();

// import user model
var User = require("../model/user");
const Contact = require("../model/contact");
// protect the routes so no one can have authorization except user
function isAuthorized(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/login");
}

/* GET home page. */
router.get("/", isAuthorized, function (req, res, next) {
  Contact.find(
    {
      userId: req.user.username,
    },
    (err, result) => {
      if (err) {
        console.log(`Error: ` + err);
      } else {
        if (docs.length === 0) {
          console.log("message");
        } else {
          res.render("/contacts", {
            title: "Contact",
            user: req.user,
            result: result,
          });
        }
      }
    }
  );
  res.render("/contacts", { title: "Contacts", user: req.user });
});

// GET handler from /contact/add to add username for the contact
router.get("/add/:_contactName", isAuthorized, (req, res, next) => {
  let username = req.params._contactName;
  res.render("addContact", {
    username: username,
    user: req.user,
    title: "Create new contact",
  });
});

//Post for /contacts/add create a new contact
// find if the contact exist in the database
router.post("/add/:_contactName", isAuthorized, (req, res, next) => {
  var array = [
    {
      name: req.body.name,
      contactEmail: req.params._contactName,
      userId: req.user.username,
      date: Date.now(),
    },
  ];
  Contact.create(array).then((docs) => {
    res.redirect("/message");
  });
});

module.exports = router;
