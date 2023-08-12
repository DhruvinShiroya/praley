var express = require("express");
var router = express.Router();

// import user model
var User = require("../model/user");
const Contact = require("../model/contact");
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
  const query = Contact.find({ userId: req.user.username });
  const result = await query.exec();

  if (!result) {
    console.log(`Error: there is not contact please check add one `);
    res.render("contacts", { title: "Contacts", user: req.user });
  } else {
    if (result.length === 0) {
      console.log("there is not contact");
      res.render("contacts", { title: "Contacts", user: req.user });
    } else {
      res.render("contacts", {
        title: "Contact",
        user: req.user,
        result: result,
      });
    }
  }
});

// POST handler for /delete/username
router.get("/delete/:_contact", isAuthorized, async (req, res, next) => {
  // find and remove the contact
  const query = Contact.findOne({
    userId: req.user.username,
    name: req.params._contact,
  });
  const result = await query.exec();

  if (!result) {
    console.log("there is not contact with this username");
    res.redirect("/contacts");
  } else {
    const query = Contact.deleteOne({
      userId: req.user.username,
      name: req.params._contact,
    });

    let result = await query.exec();

    if (!result) {
      console.log("could not delete the contact");
    }

    res.redirect("/contacts");
  }
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

//create get handler for edit
router.get("/edit/:_contact", isAuthorized, async (req, res, next) => {
  const query = Contact.findOne({
    userId: req.user.username,
    name: req.params._contact,
  });
  const result = await query.exec();

  if (result) {
    res.render("editContact", { user: req.user, data: result });
  } else {
    redirect("/users/login");
  }
});

//create post handler for edit
router.post("/edit/:_contact", isAuthorized, async (req, res, next) => {
  console.log(req.body.name);
  const query = await Contact.updateOne(
    {
      name: req.params._contact,
    },
    { name: req.body.name }
  );

  if (query) {
    res.redirect("/contacts");
  } else {
    res.redirect("/users/login");
  }
});

module.exports = router;
