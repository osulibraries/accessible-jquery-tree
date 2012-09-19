var fs = require('fs');
var path = require('path');
var assert = require('assert');

var uglify_js = require('uglify-js');

// Setup aliases to uglify_js components.
var uglify = uglify_js.uglify;
var parser = uglify_js.parser;

// Minifies the given string of Javascript code using uglify-js and return the
// result.
function minifyCode(pretty_code) {
  var ast = parser.parse(pretty_code);
  ast = uglify.ast_squeeze(uglify.ast_mangle(ast));
  return uglify.gen_code(ast);
}

// Minifies the Javascript code at the given path. The path most end in '.js'.
// The minified code is written to the '*.min.js' where '*' is the path without
// the extension.
function minifyPath(pretty_path) {
  // Ensure that the given path is to a Js file.
  assert.equal(path.extname(pretty_path), '.js');
  // Read in the code from the file as a string.
  var pretty_code = fs.readFileSync(pretty_path).toString();
  console.log("Minfiying \"" + pretty_path + "\". . .");

  // Minify the code.
  var ugly_code = minifyCode(pretty_code);
  // Create a path to write the minified code to.
  var ugly_path = pretty_path.slice(0, -3) + '.min.js';
  console.log("Creating minified version \"" + ugly_path + "\". . .");

  // Write it and finish.
  fs.writeFileSync(ugly_path, ugly_code);
  console.log("Done.");
}

// The default task simply calls the Minify task.
desc('The default task');
task('default', ['js/jQuery.tree.js'], function (params) {});

// Minify 'js/jQuery.tree.js'.
desc('Minify the javascript plugin.');
file('js/jQuery.tree.js', [], function (params) {
  minifyPath('js/jQuery.tree.js');
});
