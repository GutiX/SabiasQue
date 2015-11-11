var MongoClient = require('mongodb').MongoClient,
	Db = require('mongodb').Db,
	Server = require('mongodb').Server,
	assert = require('assert');
 //var dbname = "pwdb"; 

module.exports.initialLoad = function(data)
{
	console.log("DB Host: " + global.dbhostname + ":" + global.dbport);
	var dbserver = 'mongodb://' + global.dbhostname + ":" + global.dbport;
	//var db = new Db(dbname, new Server(global.dbhostname, global.dbport));
	
	MongoClient.connect(dbserver, function(err, db) {

		// Use the admin database for the operation
		var adminDb = db.admin();

		// List all the available databases
		adminDb.listDatabases(function(err, dbs) {
			assert.equal(null, err);
			assert.ok(dbs.databases.length > 0);
			var existDb = false;
			var i = 0;
			while(i < dbs.databases.length && !existDb)
			{
				console.log("DB " +  i + ": " + dbs.databases[i].name);
				if(dbs.databases[i].name == global.dbname) existDb = true;
				i++;
			}

			if(!existDb)
			{
				loadAdaptations(data);
				loadClients();
			}

			db.close();
		});
	});
	
};

function loadAdaptations(data)
{
	console.log("No exist db: " + global.dbname);
	var newdb = new Db(global.dbname, new Server(global.dbhostname, global.dbport));
	
	newdb.open(function(p_err, p_db) {
		assert.equal(null, p_err);
		p_db.collection('adaptations').insertMany(data.adaptations);
		p_db.close();
	});
}

function loadClients()
{
	console.log("No exist db: " + global.dbname);
	var newdb = new Db(global.dbname, new Server(global.dbhostname, global.dbport));
	
	newdb.open(function(p_err, p_db) {
		assert.equal(null, p_err);
		p_db.collection('clients').insertOne(
			{"nombre": "ilunion1", "host": "ilunionidi.e-fti.com", "sections": ["text", "zoom", "colorCombination", "cursorSize", "synonyms"]}
		);
		p_db.collection('clients').insertOne(
			{"nombre": "ilunion2", "host": "ilunionidi.e-fti.es", "sections": ["zoom", "text", "cursorSize"]}
		);
		p_db.close();
	});
}