var fs = require('fs')
  , path = require('path')
  , util = require('util');

var dissectors = {};

var files = fs.readdirSync(path.join(__dirname, 'dissectors'));

function exec(dissector) {
  var regex = dissector.regex
    , map = dissector.map
    , type = dissector.type;

  return function(string) {
    var matches = string.match(regex)
      , ret = {};

    if (!matches) return null;
    for (var k in map) {
      var v = map[k];
      ret[v] = matches[k];
    }

    ret.type = type;
    return ret;
  }
}

for (var i = 0; i < files.length; i++) {
  var module = require(path.join(__dirname, 'dissectors', files[i]));
  if (!module || !module.regex || !module.map || !module.type) continue;
  module.dissect = exec(module);
  dissectors[module['type']] = module;
}

exports.dissectors = dissectors;
