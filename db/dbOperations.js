var MongoClient = require('mongodb').MongoClient,
	Db = require('mongodb').Db,
	Server = require('mongodb').Server,
	assert = require('assert');
 //var dbname = "pwdb"; 

function DBOperations() {
    if(false === (this instanceof DBOperations)) {
        return new DBOperations();
    }
};
 
 //Check if exist a client using its domain.
DBOperations.prototype.existClient = function(data, callback)
{
	console.log("Client exist: " + data);
	var dbserver = 'mongodb://' + global.dbhostname + ":" + global.dbport + "/" + global.dbname;
	console.log("DB Host: " + dbserver);
	
	MongoClient.connect(dbserver, function(err, db) 
	{
		db.collection('clients').findOne({ "host": data }, function(err, doc) {
			db.close();
			if(doc != null)
			{
				console.log("Doc is: " + JSON.stringify(doc));
				callback(null, true);
			}
			else
			{
				console.log("Doc is null");
				callback(null, false);
			}
		});
	});
};

DBOperations.prototype.getClientByDomain = function(data, callback)
{
	var response = {};
	response.valid = false;
	console.log("getClientByDomain: " + data);
	var dbserver = 'mongodb://' + global.dbhostname + ":" + global.dbport + "/" + global.dbname;
	console.log("DB Host: " + dbserver);
	
	MongoClient.connect(dbserver, function(err, db) 
	{
		db.collection('clients').findOne({ "host": data }, function(err, doc) {
			db.close();
			if(doc != null){response.valid = true}
			console.log("Doc is: " + JSON.stringify(doc));
			response.document = doc;
			callback(null, response);
		});
	});
};

DBOperations.prototype.getAdaptations = function(names, callback)
{
	var response = {};
	response.valid = false;
	var dbserver = 'mongodb://' + global.dbhostname + ":" + global.dbport + "/" + global.dbname;
	console.log("dbOperations - getAdaptations - DB Host: " + dbserver);
	
	var data = [];
	for(var i = 0; i < names.length; i++)
	{
		data.push({"name": names[i]});
	}
	console.log("names: " + JSON.stringify(data));
	
	MongoClient.connect(dbserver, function(err, db) 
	{		
		console.log("Entra en connect");
		db.collection('adaptations').find({ "$or": data }).toArray(function(err, docs){
			db.close();
			if(docs != null){response.valid = true}
			response.documents = docs;
			callback(null, response);
		});
	});
};

module.exports = DBOperations;