var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
  {
    name: "Salmon Creek",
    image:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "kedarnath",
    image:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description: "lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "hawai",
    image:
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNhbXBpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    description: "lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];
function seedDB() {
  //remove all the campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed Campgrounds");
      //   add a few campgrounds
      // data.forEach(function (seed) {
      //   Campground.create(seed, function (err, campground) {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log("added a campground");
      //       //create a comment
      //       Comment.create(
      //         {
      //           text: "hello from the comment 1",
      //           author: "your first one",
      //         },
      //         function (err, comment) {
      //           if (err) {
      //             console.log(err);
      //           } else {
      //             console.log("new commment");
      //             campground.comments.push(comment);
      //             campground.save();
      //           }
      //         }
      //       );
      //     }
      //   });
      // });
    }
  });
}
module.exports = seedDB;
