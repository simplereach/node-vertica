(function() {
  exports.escape = function(val) {
    return val.toString().replace(/'/g, "''");
  };
  exports.quote = function(val) {
    var v;
    if (!(val != null)) {
      return 'NULL';
    } else if (typeof val.sqlQuoted === 'function') {
      return val.sqlQuoted();
    } else if (val === true) {
      return 'TRUE';
    } else if (val === false) {
      return 'FALSE';
    } else if (typeof val === 'number') {
      return val.toString();
    } else if (typeof val === 'string') {
      return "'" + (exports.escape(val)) + "'";
    } else if (val instanceof Array) {
      return ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = val.length; _i < _len; _i++) {
          v = val[_i];
          _results.push(exports.quote(v));
        }
        return _results;
      })()).join(', ');
    } else if (val instanceof Date) {
      return "'" + (val.toISOString().replace(/T/, ' ').replace(/\.\d+Z$/, '')) + "'::timestamp";
    } else {
      return "'" + (exports.escape(val)) + "'";
    }
  };
  exports.quoteIdentifier = function(val) {
    return '"' + val.toString().replace(/"/g, '""') + '"';
  };
}).call(this);