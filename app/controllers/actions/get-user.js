'use strict';

module.exports = function(req, res) {
  res.json({message: `Hello ${__filename}!`, file: __filename});
};
