var mongoose = require('mongoose');
var Cor = mongoose.model('Course');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.courseList = function (req, res) {
  let result = Cor.find({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data sent is : " + result);
      res.json(result);
    }
  });
};

module.exports.coursesReadOne = function (req, res) {
  let result = Cor.findById((req.params.courseid), (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
};

module.exports.coursesCreate = function (req, res) {
  console.log(req.body);
  Cor.create({
    name: req.body.name,
    description: req.body.description,
    learning: req.body.learning.split(",")
  }, function (err, course) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(course);
      sendJSONresponse(res, 201, course);
    }
  });
};

module.exports.coursesUpdateOne = function (req, res) {
  if (!req.params.courseid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, courseid is required"
    });
    return;
  }
  Cor
    .findById(req.params.courseid)
    .exec(
      function (err, course) {
        if (!course) {
          sendJSONresponse(res, 404, {
            "message": "courseid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        course.name = req.body.name;
        course.description = req.body.description;
        course.learning = req.body.learning.split(",");

        course.save(function (err, course) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, course);
          }
        });
      }
    );
};

module.exports.coursesDeleteOne = function (req, res) {
  var courseid = req.params.courseid;
  if (courseid) {
    Cor
      .findByIdAndRemove(courseid)
      .exec(
        function (err, course) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Course id: " + courseid + " deleted");
          sendJSONresponse(res, 204, null);
        }
      );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No courseid"
    });
  }
};
