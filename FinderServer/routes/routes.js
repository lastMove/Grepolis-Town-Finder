

exports.getFindPage = function(req, res)
{
	console.log(req.query);

	req.db.driver.execQuery(getQueryString("town.x = town.x"),[], function(err, data)
		{
			if (!err)
			{
				res.render('basicForm', {"data":null});
			}
			else
				res.send(err);
		});

	//res.render('basicForm');
}

getQueryString = function(whereString)
{
	console.log("getQueryStringAlerts");
	var firstPart = "Select town.townName, town.x as townx, town.y as townY, town.points as townPoints, player.name as playerName,  player.points as playerPoints, alliance.name AS allianceName, alliance.points as alliancePoints from Town Left Join Player ON town.player_id = player.id LEFT JOIN alliance on player.alliance_id = alliance.id "
	var secondPart = " group by alert.id";
	//console.log(firstPart + secondPart);
	return firstPart + " WHERE " + whereString;
}

defaultCB = function(res)
{ 
	return (function(err, data)
	{
		if (!err)
		{
			console.log("toto");
			res.send(data);
		}
		else
		res.send(err);
	});
}



exports.readAll = function(req, res)
{
	console.log(constructInClause(["toto", "tata", "haha"]));
	 req.db.driver.execQuery(getQueryString("town.x = town.x"),[], defaultCB(res));
	//req.db.models.player.find(defaultCB(res));
}

exports.findVictim = function(req, res)
{
	var x = req.body.x;
	var y = req.body.y;
	var radius = req.body.radius;

}

constructInClause = function(stringTab)
{
	var str = "(";
	var first = true;
	for (i in stringTab)
	{
		if (!first)
			str += ",";
		str += stringTab[i];
		first = false;
	}
	return str + ")";
}

exports.findVictim = function(req, res)
{
	var x = +req.query.x;
	var y = +req.query.y;
	var radius = +req.query.range;
	console.log("toto");
	console.log(x + " " + y + " " + radius );
	var searchType = req.query.searchType;
	var baseString =	getQueryString("SQRT(POW(ABS(town.x - ?), 2) + POW(ABS(town.y - ?), 2)) < ?", x, y, radius);
	var townPoints = req.query.points;
	var request = "";
	var paramsTab = [];
	if (searchType == "circle")
		{
			request	= getQueryString("SQRT(POW(ABS(town.x - ?), 2) + POW(ABS(town.y - ?), 2)) < ?");
			paramsTab.push(x, y, radius);
		}
	else
	{
		request = getQueryString("town.x > ?  AND town.x < ? AND town.y > ?  AND town.y < ? ");
		paramsTab.push(x - radius, x + radius, y - radius, y + radius);
	}
	if (townPoints)
	{
		request += "AND town.points <= townPoints";
	}
	req.db.driver.execQuery(request, paramsTab, function(err, data)
	{
		res.render('basicForm2', {data:data, error:err});
		console.log("err" + x);
	});
	

}


// select town.townName, player.name,x, y,  sqrt(POW(abs(x - 471), 2) + POW(abs(y - 476), 2)) AS distance from Town LEFT JOIN PLAYER ON town.player_id = player.id Where sqrt(POW(abs(x - 471), 2) + POW(abs(y - 476), 2)) < 142

// select town.townName, player.name,x, y, alliance.name from TOWN LEFT JOIN PLAYER on town.player_id = player.id LEFT JOIN alliance on player.alliance_id = alliance.id LIMIT 10;

