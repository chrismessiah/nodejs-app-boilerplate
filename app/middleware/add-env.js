'use strict';

let fs = require('fs');

module.exports = function(app) {
  // add enviroment variables
  if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'production' && fs.existsSync("./.env")) {
    require('dotenv').load();
  }

  // add live-reload for development
  if (process.env.NODE_ENV === 'development') {
    app.use(require('connect-livereload')());
  }
};
