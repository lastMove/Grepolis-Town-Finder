var init = require('./init_express');
var player = require('./routes/routes');
var http = require('http');

init.initConf();
var app = init.app;
  app.locals.pretty = true;

function main()
{
    app.get('/players', player.readAll);
    app.get('/:world/find', player.findVictim);
}

http.createServer(app).listen(app.get('port'), function()
	{
		console.log("Express server listening on port " + app.get('port'));
    });

main();