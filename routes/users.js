var express = require("express");
var router = express.Router();

// local storage to store otp for the user
const createdOTP = new Map();

// import mailslurp-client
const MailSlurp = require("mailslurp-client").default;
// OR import { MailSlurp } from "mailslurp-client"

// create a client
// const apiKey = process.env.MAILSLURP_API ?? "your-api-key";
// const mailslurp = new MailSlurp({ apiKey });

// import user model
const User = require("../model/user");

// passport for login handle
const passport = require("passport");

const { create } = require("hbs");
const { CreateDomainOptionsDomainTypeEnum } = require("mailslurp-client");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET handler for the  user/login page
router.get("/login", function (req, res, next) {
  // retrive the message
  let message = req.session.message || [];
  // clear the session messages
  req.session.message = [];

  res.render("users/login", {
    title: "Login to Your account",
    messages: message,
  });
});

// POST handler for the login
router.post(
  "/login", // name of strategy
  passport.authenticate("local", {
    successRedirect: "/users/otp",
    failureMessage: "Invalid Credentails",
    failureRedirect: "/users/login", // if login fails
  })
  // (req, res) => {
  //   res.redirect("otp/" + req.user.username);
  // }
);

// GET handler for the one time password
router.get("/otp", async (req, res, next) => {
  console.log(req.user);
  const otp = createOTP();
  createdOTP.set(req.user.username, otp);
  console.log(createdOTP);
  // const inbox = await mailslurp.createInbox();
  // const options = {
  //   to: [req.params._username],
  //   subject: "One Time password ",
  //   body: `Your one time password is ${otp}`,
  // };
  // const sent = await mailslurp.sendEmail(inbox.id, options);
  res.render("users/otp", {
    title: "One time password check your email",
    username: req.user.username,
  });
});

//POST handler for the otp page
router.post("/otp", (req, res, next) => {
  if (createdOTP.has(req.user.username)) {
    const userOtp = createdOTP.get(req.user.username);
    console.log(userOtp);
    if (req.body.otp == userOtp) {
      console.log(req.body.otp);
      console.log(userOtp);
      res.redirect("/message");
    }
  } else {
    console.log("otp is not working");
    res.redirect("users/login");
  }
});

// GET handler for the register page
router.get("/register", function (req, res, next) {
  res.render("users/register", { title: "Create a new Account" });
});

// POST handler for the register page
// get the email id password , re-type passowrd
router.post("/register", (req, res, next) => {
  User.register(
    {
      username: req.body.username,
    },
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect("/users/register");
      } else {
        req.login(newUser, (err) => {
          res.redirect("/");
        });
      }
    }
  );
});
module.exports = router;

// this function
function createOTP() {
  return Math.floor(Math.random() * (999999 - 100000) + 100000);
}

// GET handler for the /github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

// GET handler for the /github/callback

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/users/login",
    failureMessage: "Git hub login failed",
  }),
  (req, res, next) => {
    res.redirect("/message");
  }
);
