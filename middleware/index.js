// all middlewares
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        req.flash("error", "Campground Not Found");
        res.redirect("back");
      } else {
        //does user own this cmpgrnds
        //   if(foundCampground.author.id=== req.user._id) this line wont work as one of them is string and other is mongooose object
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You dont have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be Logged in to do that");
    res.redirect("back");
  }
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect("back");
      } else {
        //does user own this cmpgrnds
        //   if(foundCampground.author.id=== req.user._id) this line wont work as one of them is string and other is mongooose object
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You dont have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You Need to be Logged in");
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be Logged in to do that!!!");
  res.redirect("/login");
};

module.exports = middlewareObj;
