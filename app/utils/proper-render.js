'use strict';

let path = require('path');
let hbs = require('hbs');
let fs = require('fs');

const masterHBS = `${path.dirname(require.main.filename)}/assets/views/master.hbs`;

// the {{body}} variable has to be set in order for this to work properly
module.exports = function(res, partialPath, templateVars) {
  let partial = fs.readFileSync(partialPath, 'utf8');
  let template = hbs.handlebars.compile(partial)
  let html = template(templateVars);
  templateVars.body = html;
  res.render(masterHBS, templateVars)
};
