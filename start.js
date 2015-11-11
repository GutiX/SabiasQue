var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	path = require('path')
	fs = require('fs');
	
var port = 3000;
global.port = port;
global.hostname = "localhost";

initialize();
//loadDatabase();
	
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

//var appDir = path.dirname(require.main.filename);
//app.use("/styles", express.static(appDir + '/css'));
//app.use("/resources", express.static(appDir + '/cpresources'));
//app.use("/resources/cp/styles", express.static(appDir + '/cpresources/sections/css'));

var router = express.Router();

router.get('/', function(req, res){
	console.log("Hello world");
	res.send("Hello world");
});	

app.use(router);

app.listen(global.port, function(){
	console.log("Node server running on http://localhost:" + global.port);
});

//CONTROLADORES
/*var sqintefaceCtrl = require('./routes/sqinterface');

var sqinteface = express.Router();

sqinteface.route('/controlPanel').get(sqintefaceCtrl.getControlPanel);
	
app.use('/api', sqinteface);*/
//FIN CONTROLADORES

// INICIALIZACIÓN DE SERVIDOR

function initialize()
{
	var host = "http://" + global.hostname + ":" + global.port;
	console.log(host);
	
}

// FIN INICIALIZACIÓN DE SERVIDOR

// LOAD DATABASE

/*function loadDatabase()
{
	var appDir = path.dirname(require.main.filename);
	var configPath = appDir + "\\db\\db_config.json";
	
	fs.readFile(configPath, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		var dbconfig = JSON.parse(data);
		global.dbhostname = dbconfig.dbserver.host;
		global.dbport = parseInt(dbconfig.dbserver.port);
		global.dbname = dbconfig.dbserver.databaseName;
		
		var dbInitialLoad = require('./db/initialLoad.js');

		dbInitialLoad.initialLoad(dbconfig.dbpayload);
		
		dbInitialLoad = null;
	});
}*/

//END LOAD DATABASE
