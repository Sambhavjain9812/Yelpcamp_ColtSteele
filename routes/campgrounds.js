var express = require("express");
const campground = require("../models/campground");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
// INDEX ROUTE- DISPLAY
router.get("/", function (req, res) {
  // all cmpgrnds from dbs
  Campground.find({}, function (err, allcampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allcampgrounds,
        currentUser: req.user,
      });
    }
  });
});

// NEW ROUTE-  DISPLAYS THE FORM TO MAKE A NEW CAMPROUND
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// CREATE - ADD A NEW TO DB
router.post("/", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    price: price,
    image: image,
    description: desc,
    author: author,
  };
  // create a new campground and save it to db
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// SHOW -SHOWS MORE INFOR ABOUT ONE CAMPGROUND
router.get("/:id", function (req, res) {
  // find the campground with the provided id
  // req.params.id
  // Campground.findById(id,callback)
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        // console.log(foundCampground);
        res.render("campgrounds/show", {
          campground: foundCampground,
          currentUser: req.user,
        });
      }
    });
});

//EDIT ROUTE
router.get(
  "/:id/edit",
  middleware.checkCampgroundOwnership,
  function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      res.render("campgrounds/edit", { campground: foundCampground });
    });
  }
);

//if not redirect

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    function (err, updatedCampground) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    }
  );
});
//delete /destroy route

router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

//middle ware

module.exports = router;
