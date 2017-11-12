'use strict';

// diffrent utils need to be binded to either req or res. Did not find a way to
// separate them seamlessly, keep code commented for now
//
// let path = `${__dirname}/../utils/`;
// let files = fs.readdirSync(path);
//
// module.exports = function(req, res, next) {
//   files.forEach((file) => {
//     req.sql = require('../utils/relative-render').bind(this, req);
//   });
//   next();
// }

let sql = require('../utils/connect-to-db');
let rendr = require('../utils/proper-render');

module.exports = (req, res, next) => {
  // Requests
  req.sql = sql;

  // Responses
  res.rendr = rendr.bind(this, res);

  next();
}
