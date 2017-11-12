var index = require('./index');
var about = require('./about');
// add more routes here

module.exports = function() {
  var view;
  if (window.location.pathname == '/') {
    index();
  } else {
    var temp = window.location.pathname.split('/');
    view = temp[temp.length-1]; // will not work with routes with parameters!
    if (view === 'about') {
      about()
    } else if (false) {
      // add more routes here
    }
    else {
      console.log('No scriptview loaded');
      console.log(temp);
    }
  }
}
