var fs = require('fs');
var path = require('path');
var assert = require('assert');

var uglify_js = require('uglify-js');
var uglify = uglify_js.uglify;
var parser = uglify_js.parser;

function minifyCode(pretty_code) {
  var ast = parser.parse(pretty_code);
  ast = uglify.ast_squeeze(uglify.ast_mangle(ast));
  return uglify.gen_code(ast);
}

function minifyPath(pretty_path) {
  assert.equal(path.extname(pretty_path), '.js');
  var pretty_code = fs.readFileSync(pretty_path).toString();
  console.log("Minfiying \"" + pretty_path + "\". . .");
  var ugly_code = minifyCode(pretty_code);
  var ugly_path = pretty_path.slice(0, -3) + '.min.js';
  console.log("Creating minified version \"" + ugly_path + "\". . .");
  fs.writeFileSync(ugly_path, ugly_code);
  console.log("Done.");
}

desc('The default task');
task('default', ['js/jQuery.tree.js'], function (params) {});

desc('Minify the javascript plugin.');
file('js/jQuery.tree.js', ['requirements'], function (params) {
  minifyPath('js/jQuery.tree.js');
});

desc('Minify the javascript plugin.');
task('requirements', [], function (params) {
});
