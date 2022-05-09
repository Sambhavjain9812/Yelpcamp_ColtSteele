var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// COMMENT ROUTES
router.get("/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", {
        campground: campground,
        currentUser: req.user,
      });
    }
  });
});

router.post("/", middleware.isLoggedIn, function (req, res) {
  // looking for campground by id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //creating the comment
      var newComment = req.body.comment;
      Comment.create(newComment, function (err, comment) {
        if (err) {
          req.flash("error", "Something Went Wrong");
          console.log(err);
        } else {
          //add username id to comments
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          req.flash("success", "Successfully Added comment");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//Comment Edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment,
      });
    }
  });
});

// commentnt UPdate

router.put("/:comment_id",middleware.checkCommentOwnership,  function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/campgrounds/"+ req.params.id);
    }
  })
});

// Destroy Comment Route

router.delete("/:comment_id",middleware.checkCommentOwnership,  function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    }else{
      req.flash("success", "Comment Deleted");
    res.redirect("/campgrounds/"+ req.params.id);
    }
  });

});



module.exports = router;
