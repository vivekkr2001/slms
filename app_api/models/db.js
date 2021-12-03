var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/slms';

// const multer = require("multer");
// const {GridFsStorage} = require("multer-gridfs-storage");


mongoose.connect(dbURI);
//let gfs;
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
    // gfs = new mongoose.mongo.GridFSBucket(dbURI, {
    //     bucketName: "uploads"
    // });
    
    
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);

});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});
//  connection.once("open", () => {
//     // init stream
//     gfs = new mongoose.mongo.GridFSBucket(db, {
//       bucketName: "uploads"
//     });
// //   });
// const storage = new GridFsStorage({
//     url: dbURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString("hex") + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: "uploads"
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
  
//  module.exports.upload = function(){multer({
//     storage
//   });}
// conn.once("open", () => {
//   // init stream
//   gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "uploads"
//   });
// });
//const storage = new GridFsStorage({ url : mongoURI})

gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});


require('./contents');
require('./users');