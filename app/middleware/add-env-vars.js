'use strict';

let fs = require('fs');

if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'production' && fs.existsSync("./.env")) {
  require('dotenv').load();
}
