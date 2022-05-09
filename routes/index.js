var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport"),
  User = require("../models/user");
router.get("/", function (req, res) {
  res.render("landing");
});
//  Auth routesss

// show the register form
router.get("/register", function (req, res) {
  res.render("register");
});
//handle the sign up logic

router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("register");
    } else {
      passport.authenticate("local")(req, res, function () {
        req.flash("success", "Welcome To YelpCamp" + user.username);
        res.redirect("/campgrounds");
      });
    }
  });
});

//login form
router.get("/login", function (req, res) {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
});

module.exports = router;
