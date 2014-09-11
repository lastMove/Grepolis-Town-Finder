
 var express = require('express');
 var app = express();
 var orm = require('orm');
 var fs = require('fs');
 var opts = JSON.parse(fs.readFileSync('./config/db-config.json'));

 function page404(req, res, next)
 {
  res.status(404).render('404');
}

function initConf()
{
    orm.settings.set("connection.debug", true);
    orm.settings.set("instance.cache", false); 
    path = require('path');
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('dbProtocol', opts.protocol);
    app.use(express.favicon());
    app.use(express.logger("dev"));
    app.use(function(req, res, next)
    {
      //  console.log(req);
      next();
  });
    app.use(express.compress());
    app.use(express.methodOverride());
    app.use(express.json());
    app.use(express.urlencoded());

    app.use(orm.express(opts, {
        define: function (db, models, next) {
            console.log(db.settings.get("instance"));
            db.load("./models/models", function (err2)
            {
             if (err2)	
                 throw err2;
             db.sync();
         });
            next();
        }
    }));    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(page404);


}

exports.app = app;
exports.initConf = initConf;
