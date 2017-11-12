var viewScript = require('./load-viewscript');
var $ = require('jquery');
var onReady = require('./on-ready');

$(document).ready(function() {
  viewScript();
  onReady();
});
