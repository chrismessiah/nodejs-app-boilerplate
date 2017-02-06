'use strict';

module.exports = function(req, res) {
  res.rendr(`${__dirname}/test.hbs`, {
    file: 'this is file'
  });
}
