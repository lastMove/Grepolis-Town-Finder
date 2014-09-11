orm = require("orm");

module.exports = function(db, cb)
{
	  var Town = db.define('town', {
              x : Number,
              y : Number,
              townName : String,
              num : Number,
              points : Number,
             });
}