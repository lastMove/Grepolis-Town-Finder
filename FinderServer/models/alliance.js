orm = require("orm");

module.exports = function(db, cb)
{
	  var Town = db.define('alliance', {
              points : Number,
              towns : Number,
              name : String,
              rank : Number,
              membersNumbers : Number,
             });
}