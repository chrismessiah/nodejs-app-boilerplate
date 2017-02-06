'use strict';

module.exports = function(req, res) {
  res.rendr(`${__dirname}/test.hbs`, {
    key: 'value',
    file: __filename
  });
};
