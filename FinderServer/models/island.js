orm = require("orm");

module.exports = function(db, cb)
{
	  var Town = db.define('island', {
              x : Number,
              y : Number,
              townNumber : String,
              emptyPlaces : Number,
              maxRes : Number,
              minRes : Number
             });
}