var mongoose = require('mongoose');
var cor = mongoose.model('Course');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.contentsCreate = function (req, res) {

  if (req.params.courseid) {
    cor
      .findById(req.params.courseid)
      .select('content')
      .exec(
        function (err, course) {
          if (err) {
            sendJSONresponse(res, 400, err);
          } else {
            doAddContent(req, res, course);
          }
        }
      );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, courseid required"
    });
  }
};


var doAddContent = function (req, res, course) {
  if (!course) {
    sendJSONresponse(res, 404, "courseid not found");
  } else {
    course.content.push({
      name: req.body.name,
      link: req.body.link,
      details: req.body.details
    });
    course.save().then(item => {
      res.send("Item saved to database.");
    })
      .catch(err => {
        sendJSONresponse(res, 400, err);
      });
  }
};

module.exports.contentsUpdateOne = function (req, res) {
  if (!req.params.courseid || !req.params.contentid) {
    sendJSONresponse(res, 404, {
      "message": "Not found."
    });
    return;
  }
  cor
    .findById(req.params.courseid)
    .select('content')
    .exec(
      function (err, course) {
        var thisReview;
        if (!course) {
          sendJSONresponse(res, 404, {
            "message": "courseid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (course.content) {
          thisContent = course.content.id(req.params.contentid);
          if (!thisContent) {
            sendJSONresponse(res, 404, {
              "message": "contentid not found"
            });
          } else {
            thisContent.name = req.body.name;
            thisContent.link = req.body.link;
            thisContent.details = req.body.details;
            course.save(function (err, course) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, thisContent);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No Content to update"
          });
        }
      }
    );
};

module.exports.contentsReadOne = function (req, res) {
  if (req.params && req.params.courseid && req.params.contentid) {
    cor
      .findById(req.params.courseid)
      .select('content')
      .exec(
        function (err, course) {
          var response, content;
          content = course.content.id(req.params.contentid);
          response = {
            course: {
              name: course.name,
              id: req.params.courseid
            },
            content: content
          };
          sendJSONresponse(res, 200, response);

        }
      );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, courseid and contentid are both required"
    });
  }
};

module.exports.contentsDeleteOne = function (req, res) {
  if (!req.params.courseid || !req.params.contentid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, courseid and contentid are both required"
    });
    return;
  }
  cor
    .findById(req.params.courseid)
    .select('content')
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
        if (!course.content.id(req.params.contentid)) {
          sendJSONresponse(res, 404, {
            "message": "contentid not found"
          });
        } else {
          course.content.id(req.params.contentid).remove();
          course.save(function (err) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              sendJSONresponse(res, 204, null);
            }
          });
        }

      }
    );
};
