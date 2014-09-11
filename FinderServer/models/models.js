
checkError = function(cb, err)
{
    if (err)
        return cb(err);
    return cb();
}

module.exports = function(db, cb)
{
    db.load("./alliance.js", function (err) {checkError(cb, err)});
    db.load("./island.js", function (err) {checkError(cb, err)});
    db.load("./town.js", function (err) {checkError(cb, err)});
    db.load("./player.js", function (err) {checkError(cb, err)});
  
    var Alliance = db.models.alliance;
    var Island = db.models.island;
    var Town = db.models.town;
    var Player = db.models.player;
  
    Player.hasOne("alliance", Alliance, {reverse : "players"});
    Town.hasOne("player", Player, {reverse: "towns"} );
    db.sync();
}   