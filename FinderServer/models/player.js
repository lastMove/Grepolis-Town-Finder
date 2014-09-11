orm = require("orm");

module.exports = function(db, cb)
{
	  var Player = db.define('player', {
              points : Number,
              townsNumber : String,
              name : Number,
              rank : Number
             });
}